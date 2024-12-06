const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function to create a user
const createUser = async (name, email, cardId) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        card_id: cardId,  // Ensure the card_id is provided
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

// Function to create a Sijaga record after creating a user
const createSijagaForUser = async (name, email, status, cardId) => {
  try {
    // Create the user
    const user = await createUser(name, email, cardId);

    // Create the Sijaga record linked to this user
    const sijaga = await prisma.sijaga.create({
      data: {
        name: name,
        status: status,
        card_id: cardId,  // Link Sijaga with the user's card_id
      },
    });

    return sijaga;
  } catch (error) {
    throw new Error("Error creating Sijaga record: " + error.message);
  }
};

module.exports = { createSijagaForUser };
