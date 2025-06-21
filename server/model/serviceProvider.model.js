const mongoose = require("mongoose");

const serviceProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  garageName: { type: String, required: true },
  location: { type: String, required: true },
  experience: { type: Number, required: true },
  services: { type: String, required: true },
  contact: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ServiceProviderModel = mongoose.model(
  "serviceprovider",
  serviceProviderSchema
);
module.exports = ServiceProviderModel;
