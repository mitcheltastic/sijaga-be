const { createSijagaForUser } = require("../repository/userAuthRepository");

// Service function to create user and Sijaga
const createSijagaService = async (name, email, status, cardId) => {
  try {
    const sijaga = await createSijagaForUser(name, email, status, cardId);
    return sijaga;
  } catch (error) {
    throw new Error("Error in service: " + error.message);
  }
};

module.exports = { createSijagaService };
