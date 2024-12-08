const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Register user with hashed password
const registerUser = async (name, email, cardId, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await prisma.user.create({
    data: {
      name,
      email,
      card_id: cardId,
      password: hashedPassword,  // Store the hashed password
    },
  });

  return result;
};

// Get user by email for login
const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    console.log("User found by email:", user); // Debugging line
    return user;
  } catch (error) {
    console.log("Error finding user by email:", error); // Debugging line
    return null;
  }
};

// Check if the cardId exists in card_id_dumps
const isCardIdInDumps = async (cardId) => {
  try {
    const card = await prisma.card_id_dumps.findUnique({
      where: { card_id: cardId },
    });
    console.log("Card found in dumps:", card); // Debugging line
    return card !== null;
  } catch (error) {
    console.log("Error finding card in dumps:", error); // Debugging line
    return false;
  }
};

// Blacklist the token when logging out
const blacklistToken = async (token) => {
  try {
    console.log("Blacklisting token:", token);  // Log the token to ensure it's correct

    const result = await prisma.lockedStatus.create({
      data: {
        status: "locked",
        token: token,  // Ensure token is being passed properly
      },
    });

    console.log("Token blacklisted successfully:", result);  // Log the result
    return result;
  } catch (error) {
    console.error("Error blacklisting token:", error);  // Log the error
    throw new Error("Error blacklisting token");
  }
};

module.exports = {
  registerUser,
  getUserByEmail,
  isCardIdInDumps,
  blacklistToken,
};
