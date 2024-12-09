const userService = require("../service/userService");

const changePasswordController = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id; // Assuming authentication middleware sets req.user

    const updatedUser = await userService.changePassword(userId, oldPassword, newPassword);
    res.status(200).json({
      status: true,
      message: "Password successfully updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    await userService.resetPassword(email, newPassword);
    res.status(200).json({
      status: true,
      message: "Password successfully reset",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const whoamiController = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userService.whoami(userId);
    res.status(200).json({
      status: true,
      data: user,
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  changePasswordController,
  resetPasswordController,
  whoamiController,
};
