const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all users
const getAllUsers = async () => {
  return await prisma.user.findMany();
};

// Add a new usage history entry
const addUsageHistory = async (card_id, status) => {
  // Fetch the user name based on card_id
  const user = await prisma.user.findUnique({ where: { card_id } });
  if (!user) {
    throw new Error("User with this card_id does not exist.");
  }

  return await prisma.usageHistory.create({
    data: {
      Timestamp: new Date(),
      name: user.name,
      status: status,
      card_id: card_id,
    },
  });
};

// Get all usage history
const getAllUsageHistory = async () => {
  return await prisma.usageHistory.findMany({ orderBy: { Timestamp: "desc" } });
};

// Get the latest usage history entry
const getLatestUsageHistory = async () => {
  return await prisma.usageHistory.findFirst({ orderBy: { Timestamp: "desc" } });
};

// Get top 3 names from usage history
const getTop3NamesFromUsageHistory = async () => {
  return await prisma.usageHistory.findMany({
    select: { name: true },
    distinct: ["name"],
    take: 3,
    orderBy: { Timestamp: "desc" },
  });
};

// Get top 3 timestamps from usage history
const getTop3TimestampsFromUsageHistory = async () => {
  return await prisma.usageHistory.findMany({
    select: { Timestamp: true },
    take: 3,
    orderBy: { Timestamp: "desc" },
  });
};

// Post status to locked_status table
const createLockedStatus = async (status) => {
    return await prisma.lockedStatus.create({
      data: {
        status,
      },
    });
  };
  
  // Get the latest status from locked_status table
  const getLatestLockedStatus = async () => {
    return await prisma.lockedStatus.findFirst({
      orderBy: {
        Timestamp: "desc", // Sort by latest Timestamp
      },
    });
  };

module.exports = {
  getAllUsers,
  addUsageHistory,
  getAllUsageHistory,
  getLatestUsageHistory,
  getTop3NamesFromUsageHistory,
  getTop3TimestampsFromUsageHistory,
  createLockedStatus,
  getLatestLockedStatus
};
