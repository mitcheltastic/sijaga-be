const bcrypt = require("bcrypt");
const userRepository = require("../repository/userRepository");

const changePassword = async (id, oldPassword, newPassword) => {
  const user = await userRepository.getUserById(id);
  if (!user) throw new Error("User not found");

  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatch) throw new Error("Incorrect old password");

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return await userRepository.updateUserById(id, { password: hashedPassword });
};

const resetPassword = async (email, newPassword) => {
  const user = await userRepository.getUserByEmail(email);
  if (!user) throw new Error("User not found");

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return await userRepository.updateUserById(user.id, { password: hashedPassword });
};

const whoami = async (id) => {
  const user = await userRepository.getUserById(id);
  if (!user) throw new Error("User not found");

  delete user.password;
  return user;
};

module.exports = {
  changePassword,
  resetPassword,
  whoami,
};
