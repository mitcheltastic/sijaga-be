const express = require("express");
const router = express.Router();
const { registerUserController, loginUserController, logoutUserController } = require("../controller/userAuthController");

// Register route
router.post("/register", registerUserController);

// Login route
router.post("/login", loginUserController);

// Logout route
router.post("/logout", logoutUserController);

module.exports = router;
