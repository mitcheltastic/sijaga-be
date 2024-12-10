const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repository/userRepository");

const changePassword = async (id, oldPassword, newPassword) => {
  const user = await userRepository.getUserById(id);
  if (!user) throw new Error("User not found");

  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatch) throw new Error("Incorrect old password");

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return await userRepository.updateUserById(id, { password: hashedPassword });
};

const resetPassword = async (email, password, confirmPassword) => {
  if (password !== confirmPassword) throw new Error("Passwords do not match");

  const hashedPassword = await bcrypt.hash(password, 10);
  return await userRepository.updateUserByEmail(email, { password: hashedPassword });
};

const whoamiService = async (id) => {
  const user = await userRepository.getUserById(id);
  if (!user) throw new Error("User not found");

  delete user.password;
  return user;
};

const blacklistToken = async (token) => {
  return await userRepository.blacklistToken(token);
};

module.exports = {
  changePassword,
  resetPassword,
  whoamiService,
  blacklistToken,
};
