const { deleteLockedStatusesOlderThanOneDay } = require("../repository/lockedStatusRepository");

const cleanUpOldLockedStatuses = async () => {
  try {
    await deleteLockedStatusesOlderThanOneDay();
  } catch (error) {
    console.error("Error in cleanup service:", error);
  }
};

module.exports = {
  cleanUpOldLockedStatuses,
};
