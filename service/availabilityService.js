const availabilityRepository = require("../repository/availabilityRepository");

const addAvailability = async (status) => {
  if (!status) {
    throw new Error("Status is required");
  }
  return await availabilityRepository.createAvailability(status);
};

const fetchLatestAvailability = async () => {
  const latestAvailability = await availabilityRepository.getLatestAvailability();
  if (!latestAvailability) {
    throw new Error("No availability records found");
  }
  return latestAvailability;
};

module.exports = {
  addAvailability,
  fetchLatestAvailability,
};
