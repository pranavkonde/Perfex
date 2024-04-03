const dotenv = require("dotenv");
dotenv.config();

module.exports.init = function () {
    const mongoose = require("mongoose");
    mongoose
      .connect(
        process.env.MONGODB_URI
      )
      .then(function () {
        console.log("db is live");
      })
      .catch(function () {
        console.log("failed to connect with db");
      });
  };