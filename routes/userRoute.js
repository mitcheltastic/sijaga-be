const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const accessValidation = require("../middleware/authMiddleware"); // Middleware to validate JWT

router.patch("/change-password", accessValidation, userController.changePasswordController);
router.post("/reset-password", userController.resetPasswordController);
router.get("/whoami", accessValidation, userController.whoamiController);

module.exports = router;
