// services/UserService.js
const UserRepository = require('../repository/userAuthRepository');

class UserService {
  static async registerUser({ UID, name, email }) {
    // Check if email is already used
    const existingUser = await UserRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error('Email is already registered');
    }

    // Create the user
    const user = await UserRepository.createUser({ UID, name, email });
    return user;
  }
}

module.exports = UserService;
