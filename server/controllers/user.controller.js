const { v4: uuidv4 } = require("uuid");
const User = require("../model/user.model.js");
const { setUser } = require("../services/auth.js");

const handleUserSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "user already exist " });
    }

    await User.create({ name, email, password });

    res.status(201).json({ msg: "user signed up " });
  } catch (e) {
    console.log(error);
  }
};

const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email, password });

    if (userExist) {
      const token = setUser(userExist);

      res.cookie("token", token);
      return res.status(201).json({ msg: "User Loged  in ", cookie: token });
    }

    return res
      .status(400)
      .json({ msg: "Internal server error or user doesn't exit " });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
