const { checkCardIdExists, createUser, deleteUser } = require("../repository/userAuthRepository");

// Service to create a user
const createUserService = async (name, email, cardId) => {
  if (!name || !email || !cardId) {
    throw new Error("Name, email, and card ID are required.");
  }

  // Check if the cardId exists in card_id_dumps
  const cardIdExists = await checkCardIdExists(cardId);
  if (!cardIdExists) {
    throw new Error("Card ID does not exist in the database.");
  }

  // Proceed to create the user
  return await createUser(name, email, cardId);
};

// Service to delete a user by ID
const deleteUserService = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required.");
  }

  return await deleteUser(userId);
};

module.exports = { createUserService, deleteUserService };
