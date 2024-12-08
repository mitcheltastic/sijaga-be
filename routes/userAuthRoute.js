const express = require("express");
const router = express.Router();
const { createUserController, deleteUserController } = require("../controller/userAuthController");

// Route to create a user
router.post("/create-user", createUserController);

// Route to delete a user
router.delete("/delete-user/:userId", deleteUserController);

module.exports = router;
