const Order = require("../model/order.model");
const CartItem = require("../model/cart.model");

const createOrder = async (req, res) => {
  try {
    const { cartItemIds, shippingAddress, paymentMethod } = req.body;

    if (!cartItemIds || !shippingAddress || !paymentMethod) {
      return res
        .status(400)
        .json({ message: "Missing required order information." });
    }

    const itemsToOrder = await CartItem.find({
      _id: { $in: cartItemIds },
    }).populate("carId");

    if (itemsToOrder.length !== cartItemIds.length) {
      return res
        .status(404)
        .json({ message: "One or more items not found in cart." });
    }

    const totalAmount = itemsToOrder.reduce((total, item) => {
      if (item.carId && item.carId.price && item.quantity) {
        return total + item.carId.price * item.quantity;
      }
      return total;
    }, 0);

    const newOrder = new Order({
      user: req.user._id, // ✅ FIXED HERE
      shippingAddress,
      paymentMethod,
      totalAmount,
      items: itemsToOrder.map((item) => ({
        car: item.carId._id,
        price: item.carId.price,
        quantity: item.quantity,
      })),
    });

    const savedOrder = await newOrder.save();

    await CartItem.deleteMany({ _id: { $in: cartItemIds } });

    res
      .status(201)
      .json({ message: "Order placed successfully!", order: savedOrder });
  } catch (error) {
    console.error("ERROR CREATING ORDER:", error);
    res.status(500).json({ message: "Server error while creating order." });
  }
};

const getOrders = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const orders = await Order.find({ user: userId })
      .sort({ orderDate: -1 })
      .populate("items.car");

    res.json(orders);
  } catch (error) {
    console.error("ERROR FETCHING ORDERS:", error);
    res.status(500).json({ message: "Server error while fetching orders." });
  }
};

const getOrderById = async (req, res) => {
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

module.exports = { createOrder, getOrders, getOrderById };
