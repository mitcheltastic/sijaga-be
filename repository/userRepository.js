const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

const updateUserById = async (id, data) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const findAllUsers = async () => {
  return await prisma.user.findMany();
};

module.exports = {
  getUserById,
  updateUserById,
  getUserByEmail,
  findAllUsers,
};
