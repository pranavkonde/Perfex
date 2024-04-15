const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./database/index");
const employeeRouter = require("./routers/employee");
const goalRouter = require("./routers/goal");
const reviewRouter = require("./routers/review");
const AppraisalDecisionRouter = require("./routers/appraisal");
const myGoalRouter = require("./routers/myGoals");

var app = express();

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

db.init();

app.use("/employee", employeeRouter);
app.use("/goal", goalRouter);
app.use("/myGoals", myGoalRouter);
app.use("/review", reviewRouter);
app.use("/", AppraisalDecisionRouter);

app.listen(process.env.PORT, function () {
  console.log(`server is runing on port ${process.env.PORT}`);
});
