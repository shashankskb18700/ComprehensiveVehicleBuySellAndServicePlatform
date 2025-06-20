const ServiceProviderModel = require("../model/serviceProvider.model");

const handleAddServiceProvider = async (req, res) => {
  try {
    const { name, garageName, location, experience, services, contact } =
      req.body;

    if (
      !name ||
      !garageName ||
      !location ||
      !experience ||
      !services ||
      !contact
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const newProvider = await ServiceProviderModel.create({
      name,
      garageName,
      location,
      experience,
      services,
      contact,
    });

    res.status(201).json({
      msg: "Service provider registered successfully",
      provider: newProvider,
    });
  } catch (error) {
    console.error("Error adding service provider:", error);
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const handleSearchServiceProviders = async (req, res) => {
  const { location = "", service = "" } = req.body;

  try {
    const providers = await ServiceProviderModel.find({
      location: { $regex: location, $options: "i" },
      services: { $regex: service, $options: "i" },
    });

    res.status(200).json({ providers });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  handleAddServiceProvider,
  handleSearchServiceProviders,
};
