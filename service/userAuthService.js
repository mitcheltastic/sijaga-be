const { registerUser, getUserByEmail, isCardIdInDumps, blacklistToken } = require("../repository/userAuthRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register user
const registerUserService = async (name, email, cardId, password) => {
  // Check if the cardId exists in card_id_dumps
  const isCardInDumps = await isCardIdInDumps(cardId);
  if (isCardInDumps) {
    throw new Error("Card ID is already in the dumps.");
  }

  const user = await registerUser(name, email, cardId, password);
  return user;
};

// Login user
const loginUserService = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("User not found.");
  }

  // Compare the entered password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password.");
  }

  // Create JWT token
  const payload = { id: user.id, name: user.name, email: user.email, card_id: user.card_id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

  return { message: "Login successful", token };
};

// Logout user
const logoutUserService = async (token) => {
  console.log("Attempting to log out with token:", token);  // Log the token being passed

  try {
    const result = await blacklistToken(token);  // Call blacklistToken to handle the process
    console.log("Token blacklisted successfully:", result);  // Log successful result

    return {
      success: true,
      message: "Logout successful.",
    };
  } catch (error) {
    console.error("Error during logout:", error.message);  // Log the actual error message
    throw new Error("Error during logout process.");
  }
};



module.exports = { registerUserService, loginUserService, logoutUserService };
