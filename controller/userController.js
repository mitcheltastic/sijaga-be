const userService = require("../service/userService");

const changePasswordController = async (req, res) => {
  try {
    const { id } = req.user;
    const { oldPassword, newPassword } = req.body;

    const updatedUser = await userService.changePassword(id, oldPassword, newPassword);
    res.status(200).json({ message: "Password updated successfully", data: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logoutController = async (req, res) => {
  try {
    const { token } = req.headers.authorization.split(" ")[1];
    await userService.blacklistToken(token);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const whoamiController = async (req, res) => {
  try {
    const user = await userService.whoamiService(req.user.id);
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  changePasswordController,
  logoutController,
  whoamiController,
};
