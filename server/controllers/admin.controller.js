const User = require("../model/user.model.js");
const CarListing = require("../model/carListing.model");
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

const handleGetAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

const handleGetAllCarListings = async (req, res) => {
  try {
    const listings = await CarListing.find().populate("userId", "name email");
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching listings" });
  }
};

module.exports = {
  handleAdminLogin,
  handleGetAllUsers,
  handleGetAllCarListings,
};
