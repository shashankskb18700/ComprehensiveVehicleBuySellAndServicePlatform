const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  items: [
    {
      car: { type: Schema.Types.ObjectId, ref: "carlisting", required: true }, // changed from 'Car'
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },

  shippingAddress: {
    line1: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true },

  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("order", orderSchema);
module.exports = Order;
