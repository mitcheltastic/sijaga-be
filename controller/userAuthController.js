const { registerUserService, loginUserService, logoutUserService } = require("../service/userAuthService");

const registerUserController = async (req, res) => {
  const { name, email, cardId, password } = req.body;
  try {
    const user = await registerUserService(name, email, cardId, password);
    res.status(200).json({
      status: true,
      message: "User registered successfully.",
      payload: { id: user.id, name: user.name, email: user.email, card_id: user.card_id },
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await loginUserService(email, password);
    res.status(200).json({
      status: true,
      message: result.message,
      token: result.token,
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

// Controller code for logging out
const logoutUserController = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];  // Extract token from Bearer header

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Token is required for logout.",
    });
  }

  try {
    // Call the service to handle token blacklisting
    const response = await logoutUserService(token);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred during logout.",
    });
  }
};


module.exports = { registerUserController, loginUserController, logoutUserController };
