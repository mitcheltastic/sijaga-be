const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new Sijaga record
const createSijaga = async (name, status, userId) => {
  return await prisma.sijaga.create({
    data: {
      name,
      status,
      user_id: userId,
    },
  });
};

// Fetch all Sijaga records for a user
const getSijagaByUserId = async (userId) => {
  return await prisma.sijaga.findMany({
    where: { user_id: userId },
    include: { user: true },
  });
};

// Update a Sijaga record's status
const updateSijagaStatus = async (id, status) => {
  return await prisma.sijaga.update({
    where: { id },
    data: { status },
  });
};

module.exports = { createSijaga, getSijagaByUserId, updateSijagaStatus };
