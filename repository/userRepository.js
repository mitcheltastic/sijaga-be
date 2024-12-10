const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get user by ID
const getUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};

// Update user profile
const updateUserProfile = async (userId, name, email, cardId) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      email,
      card_id: cardId,
    },
  });
};

// Change user password
const changeUserPassword = async (userId, newPassword) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      password: newPassword, // Store the hashed password
    },
  });
};

module.exports = {
  getUserById,
  updateUserProfile,
  changeUserPassword,
};
