const CartItem = require("../model/cart.model");
const CarListingModel = require("../model/carListing.model");

const addToCart = async (req, res) => {
  try {
    const { carId, quantity } = req.body;

    const userId = req.user?._id; // ✅ Get user ID from auth middleware

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const carExists = await CarListingModel.findById(carId);
    if (!carExists) {
      return res.status(404).json({ message: "Car not found" });
    }

    // ✅ Check if this user already added this car to cart
    const existingCartItem = await CartItem.findOne({ userId, carId });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.status(200).json({
        message: "Cart quantity updated successfully",
        cartItem: existingCartItem,
      });
    }

    // ✅ Add new cart item
    const newCartItem = new CartItem({
      userId, // ✅ Required field
      carId,
      quantity,
    });

    await newCartItem.save();
    res.status(201).json({
      message: "Item added to cart successfully",
      cartItem: newCartItem,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getCartItems = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const items = await CartItem.find({ userId }).populate("carId");
    res.json(items);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user?._id;
    const cartItemId = req.params.id;

    const deletedItem = await CartItem.findOneAndDelete({
      _id: cartItemId,
      userId, // ✅ So user can delete only their own items
    });

    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Item removed from cart successfully" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  removeFromCart,
};
