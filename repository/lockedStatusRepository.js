const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Delete locked_status entries older than 7 days
const deleteOldLockedStatuses = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return await prisma.lockedStatus.deleteMany({
    where: {
      Timestamp: {
        lt: sevenDaysAgo, // Less than 7 days ago
      },
    },
  });
};

module.exports = {
  deleteOldLockedStatuses,
};
