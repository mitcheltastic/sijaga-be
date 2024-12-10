const { deleteOldLockedStatuses } = require("../repository/lockedStatusRepository");

// Service to clean up old locked_status records
const lockedStatusCleanupService = async () => {
  try {
    const result = await deleteOldLockedStatuses();
    console.log(`${result.count} old locked statuses deleted.`);
    return result;
  } catch (error) {
    console.error("Error during locked status cleanup:", error.message);
    throw error;
  }
};

module.exports = {
  lockedStatusCleanupService,
};
