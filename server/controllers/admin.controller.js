const User = require("../model/user.model.js");
const { setUser } = require("../services/auth.js");

const handleAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email, password });

    if (userExist && userExist.role === "ADMIN") {
      const token = setUser(userExist);

      res.cookie("token", token);
      return res.status(201).json({ msg: "Admin Loged  in ", cookie: token });
    }

    return res
      .status(400)
      .json({ msg: "either user is not admin or user doesn't exit " });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  handleAdminLogin,
};
