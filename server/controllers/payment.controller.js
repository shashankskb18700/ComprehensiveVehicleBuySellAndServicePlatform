require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CartItem = require("../model/cart.model");

const createPaymentIntent = async (req, res) => {
  try {
    const { cartItemIds } = req.body;

    const itemsToPurchase = await CartItem.find({
      _id: { $in: cartItemIds },
    }).populate("carId");

    if (itemsToPurchase.length !== cartItemIds.length) {
      return res
        .status(404)
        .json({ message: "One or more items for payment not found." });
    }

    const totalAmount = itemsToPurchase.reduce(
      (total, item) => total + item.carId.price * item.quantity,
      0
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
      totalAmount: totalAmount,
    });
  } catch (error) {
    console.error("Stripe Error:", error.message);
    res.status(500).json({ error: { message: error.message } });
  }
};

module.exports = { createPaymentIntent };
