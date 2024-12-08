const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function to check if a cardId exists in card_id_dumps
const checkCardIdExists = async (cardId) => {
  try {
    const cardIdDump = await prisma.cardIdDumps.findUnique({
      where: { card_id: cardId },
    });
    return cardIdDump !== null; // Returns true if exists, false otherwise
  } catch (error) {
    throw new Error("Error checking Card ID existence: " + error.message);
  }
};

// Function to create a user
const createUser = async (name, email, cardId) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        card_id: cardId,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

// Function to delete a user by ID
const deleteUser = async (userId) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });
    return deletedUser;
  } catch (error) {
    throw new Error("Error deleting user: " + error.message);
  }
};

module.exports = { checkCardIdExists, createUser, deleteUser };
