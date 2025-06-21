const User = require("../model/user.model.js");
const CarListing = require("../model/carListing.model");
const { setUser } = require("../services/auth.js");
const ServiceProviderModel = require("../model/serviceProvider.model.js");
const Order = require("../model/order.model");

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

const handleFetchServiceProvider = async (req, res) => {
  try {
    const providers = await ServiceProviderModel.find().sort({ createdAt: -1 });
    res.json(providers);
  } catch (error) {
    console.error("Error fetching service providers:", error);
    res.status(500).json({ message: "Failed to fetch service providers" });
  }
};

const handleFetchTransaction = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ orderDate: -1 })
      .populate("items.car");

    res.json(orders);
  } catch (error) {
    console.error("ERROR FETCHING ORDERS:", error);
    res.status(500).json({ message: "Server error while fetching orders." });
  }
};

const handleFetchTransactionById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.car");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error("ERROR FETCHING SINGLE ORDER:", error);
    res.status(500).json({ message: "Server error while fetching order." });
  }
};

module.exports = {
  handleAdminLogin,
  handleGetAllUsers,
  handleGetAllCarListings,
  handleFetchServiceProvider,
  handleFetchTransaction,
  handleFetchTransactionById,
};
