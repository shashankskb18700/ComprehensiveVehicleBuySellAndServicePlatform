const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

  preferredDate: { type: String, required: true }, // or Date if needed
  preferredTime: { type: String, required: true },
  issueDescription: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const AppointmentModel = mongoose.model("appointment", appointmentSchema);
module.exports = AppointmentModel;
