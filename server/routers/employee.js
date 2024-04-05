const express = require("express");
const sendMail = require("../utils/sendMail");

const authorization = require("../middlewares/authorization");
const employeeModel = require("../database/models/employee");
const otpModel = require("../database/models/otp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const employeeRouter = express.Router();

const createExpiry = () => {
  var expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 10);
  return expiryDate;
};

function generateOtp(employeeId) {
  let otp =
    "" +
    Math.floor(Math.random() * 10) +
    Math.floor(Math.random() * 10) +
    Math.floor(Math.random() * 10) +
    Math.floor(Math.random() * 10);
  bcrypt.hash(otp, 10).then((hashedOtp) => {
    otpModel
      .updateOne(
        { employeeId: employeeId },
        {
          employeeId: employeeId,
          otp: hashedOtp,
          expireAt: createExpiry(),
        },
        { upsert: true }
      )
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  return otp;
}

function deleteOtpFromDatabase(employeeId) {
  otpModel.deleteMany({ employeeId: employeeId }).then(function (del) {
    console.log("OTP deleted");
  });
}

function makeEmployeeVerified(employeeId) {
  employeeModel
    .updateOne({ _id: employeeId }, { isVerified: true })
    .then(function (res) {
      console.log("Employee Verified");
    });
}

employeeRouter.get("/authenticate", authorization, function (req, res) {
  const obj = {
    employeeId: req.employeeId,
    email: req.email,
    employeeType:req.employeeType
  };

  res.status(200).json(obj);
});

employeeRouter.put("/updateProfile/:employeeId", async (req, res) => {
  const { employeeId } = req.params;
  const employeeDetails = req.body;
  const employee = await employeeModel.findByIdAndUpdate(
    employeeId,
    employeeDetails
  );
  if (!employee) res.status(400).end();
  res.status(200).json({message:"Profile Updated Successfully"});
});

employeeRouter.post("/register", async function (req, res) {
  const {
    full_name,
    email,
    phone_no,
    password,
    department,
    role,
    employeeType,
  } = req.body;

  // Validate full_name (no numbers)
  const fullNameRegex = /^[A-Za-z]+(?: [A-Za-z]+)?$/;
  if (!fullNameRegex.test(full_name)) {
    return res.status(400).json({ message: "Invalid Full name." });
  }

  // Validate email (no spaces, valid format)
  const emailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Email should not contain spaces and must be in a valid format.",
    });
  }

  // Validate phone_no (only digits)
  const phoneNoRegex = /^[6-9]\d{9}$/;
  if (!phoneNoRegex.test(phone_no)) {
    return res.status(400).json({
      message: "Invalid Phone Number.",
    });
  }

  // Validate password (at least one special character, one number, length <= 8)
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must contain at least one special character, one number, and be 8 characters or less.",
    });
  }

  const baseCharacters = "PCG";
  let counter = 1;
  const uniqueNumbers = counter.toString().padStart(4, "0");
  const empId = baseCharacters + uniqueNumbers;

  const employee = await employeeModel.findOne({ email: email });

  if (employee) {
    return res
      .status(400)
      .json({ message: "Employee already registered with this email." });
  } else {
    bcrypt.hash(password, 10).then((hashedPassword) => {
      employeeModel
        .create({
          full_name: full_name,
          email: email,
          password: hashedPassword,
          phone_no: phone_no,
          department: department,
          role: role,
          employeeType: employeeType,
          empId: empId,
          isVerified: false,
        })
        .then((employee) => {
          sendMail(
            employee.email,
            employee.full_name,
            "Welcome to Perfex | Verify email",
            generateOtp(employee._id),
            "verify email",
            function (err) {
              if (err) {
                res.status(500).end();
              } else {
                res
                  .status(200)
                  .end(
                    JSON.stringify({
                      employeeId: employee._id,
                      email: employee.email,
                    })
                  );
              }
            }
          );
        })
        .catch((err) => {
          console.log(err);
          res.status(500).end();
        });
    });
  }
});

  employeeRouter.post("/verify", function (req, res) {
    var employeeId = req.body.employeeId;
    var otp = req.body.otp;

    if (!employeeId || !otp) {
      return res.status(400).json({
        message:
          "employeeId and should not contain spaces and must be in a valid format.",
      });
    }

    otpModel
      .findOne({ employeeId: employeeId })
      .then(function (value) {
        var currentDate = new Date();
        if (value.expireAt.getTime() > currentDate.getTime()) {
          bcrypt
            .compare(otp, value.otp)
            .then(function (flag) {
              if (flag) {
                deleteOtpFromDatabase(employeeId);
                makeEmployeeVerified(employeeId);
                res.status(200).json({
                  message: "Employee Verified",
                });
              } else {
                return res.status(401).json({
                  message: "Incorrect OTP",
                });
              }
            })
            .catch(function (err) {
              res.status(401).end();
            });
        } else {
          res.status(404).json({
            message: "Employee Already Verified",
          });
        }
      })
      .catch(function (err) {
        res.status(404).end();
      });
  });


  employeeRouter.post("/resendOtp", function (req, res) {
    employeeModel.findOne({ _id: req.body.employeeId }).then(function (employee) {
      sendMail(
        employee.email,
        employee.full_name,
        "Welcome to Perfex | Verify email",
        generateOtp(employee._id),
        "verify email",
        function (err) {
          if (err) {
            res.status(500).end();
          } else {
            res.status(201).json({message:"OTP sent"});
          }
        }
      );
    });
  });


  employeeRouter.post("/login", function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
  
    // Validate email (no spaces, valid format)
    const emailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Email should not contain spaces and must be in a valid format.",
      });
    }
  
    // Validate password (at least one special character, one number, length <= 8)
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least one special character, one number, and be 8 characters or greater.",
      });
    }
  
    employeeModel
      .findOne({ email: email })
      .then((employee) => {
        if (employee.isVerified) {
          bcrypt
            .compare(password, employee.password)
            .then((flag) => {
              if (flag) {
                var token = jwt.sign(
                  {
                    employeeId: employee._id,
                    email: email,
                    employeeType:employee.employeeType,
                  },
                  process.env.TOKEN_SECRET
                );
                res.cookie("token", token, { maxAge: 9000000, httpOnly: true });
                res.status(200).send({ token: token });
              } else {
                // Send a response indicating an incorrect password
                res.status(401).json({ message: "Incorrect password." });
              }
            })
            .catch((err) => {
              // Handle any errors that occur during the bcrypt.compare operation
              console.error(err);
              res.status(401).json({
                message: "An error occurred while verifying the password.",
              });
            });
        } else {
          sendMail(
            employee.email,
            employee.full_name,
            "Welcome to Perfex | Verify email",
            generateOtp(employee._id),
            "verify email",
            function (err) {
              if (err) {
                res.status(500).end();
              } else {
                res.status(401).json({
                  message: "Employee Not Verified",
                });
              }
            }
          );
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({ message: "Employee not Registered." });
      });
  });

  employeeRouter.get("/logout", function (req, res) {
    res.clearCookie("token");
    res.status(200).end();
  });

  employeeRouter.get("/:employeeId", async (req, res) => {
    const { employeeId } = req.params;
    const employee = await employeeModel.findById(employeeId);
    if (!employee) res.status(400).end();
    res.status(200).send(employee);
  });


  employeeRouter.post("/forgotPassword", function (req, res) {
    let email = req.body.email;
  
    employeeModel.findOne({ email: email }, function (err, employee) {
      if (err || !employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      const token = jwt.sign({ id: employee._id }, process.env.TOKEN_SECRET, {
        expiresIn: "1h",
      });
  
      sendMail(
        employee.email,
        employee.full_name,
        "Reset your password",
        `http://localhost:1234/employee/resetPassword?token=${token}`,
        "reset password",
        function (err) {
          if (err) {
            return res.status(500).json({ message: "Error sending email" });
          }
          res.status(200).json({ message: "Password reset email sent" });
        }
      );
    });
  });
  

  employeeRouter.post("/resetPassword", async (req, res) => {
    try {
      const { password, confirmPassword, token } = req.body;
  
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  
      if (!password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
  
      const employee = await employeeModel.findByIdAndUpdate(
        decoded.id,
        { password: hashedPassword },
        { new: true }
      );
  
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server error" });
    }
  });
  

module.exports = employeeRouter;
