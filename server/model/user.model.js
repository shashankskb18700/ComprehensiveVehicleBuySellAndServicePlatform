const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      default: "NORMAL",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);
mongoose.model("User", userSchema);

module.exports = UserModel;
