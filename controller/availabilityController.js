const availabilityService = require("../service/availabilityService");

const postAvailability = async (req, res) => {
  try {
    const { status } = req.body;

    const availability = await availabilityService.addAvailability(status);
    return res.status(201).json({
      status: true,
      message: "Availability added successfully",
      data: availability,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const getLatestAvailability = async (req, res) => {
  try {
    const latestAvailability = await availabilityService.fetchLatestAvailability();
    return res.status(200).json({
      status: true,
      message: "Latest availability fetched successfully",
      data: latestAvailability,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  postAvailability,
  getLatestAvailability,
};
