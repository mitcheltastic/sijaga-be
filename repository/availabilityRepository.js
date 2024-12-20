const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createAvailability = async (status) => {
  return await prisma.availability.create({
    data: {
      status,
    },
  });
};

const getLatestAvailability = async () => {
  return await prisma.availability.findFirst({
    orderBy: {
      Timestamp: "desc",
    },
  });
};

module.exports = {
  createAvailability,
  getLatestAvailability,
};
