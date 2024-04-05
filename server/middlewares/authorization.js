const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const token = req.cookies.token;
  console.log(req.cookies.token);
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    req.employeeId = data.employeeId;
    req.email = data.email;
    req.employeeType = data.employeeType;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

module.exports = authorization;
