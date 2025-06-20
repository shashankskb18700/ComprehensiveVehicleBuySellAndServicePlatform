var mongoose = require("mongoose");

const CONNECT_TO_DB = () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/capstone");
    console.log("connected to db");
  } catch (e) {
    console.log(e);
  }
};

module.exports = CONNECT_TO_DB;
