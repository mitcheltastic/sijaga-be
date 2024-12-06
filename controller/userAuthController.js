// controllers/UserController.js
const UserService = require('../service/userAuthService');

class UserController {
  static async register(req, res) {
    try {
      const { UID, name, email } = req.body;
      const user = await UserService.registerUser({ UID, name, email });
      return res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UserController;
