const AppointmentModel = require("../model/appointment.model");

const handleBookAppointment = async (req, res) => {
  try {
    const userId = req.user._id;
    const { preferredDate, preferredTime, issueDescription } = req.body;

    if (!preferredDate || !preferredTime || !issueDescription) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    const appointment = await AppointmentModel.create({
      userId,

      preferredDate,
      preferredTime,
      issueDescription,
    });

    res.status(201).json({
      msg: "Appointment booked successfully!",
      appointment,
    });
  } catch (err) {
    console.error("Error booking appointment:", err);
    res.status(500).json({ msg: "Something went wrong while booking." });
  }
};

module.exports = {
  handleBookAppointment,
};
