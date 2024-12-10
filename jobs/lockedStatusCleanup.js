const cron = require("node-cron");
const { lockedStatusCleanupService } = require("../service/lockedStatusCleanupService");

// Schedule the job to run every day at midnight
cron.schedule("0 0 * * *", async () => {
  console.log("Running locked status cleanup job...");
  try {
    await lockedStatusCleanupService();
  } catch (error) {
    console.error("Locked status cleanup job failed:", error.message);
  }
});
