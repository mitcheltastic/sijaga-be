const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.patch("/change-password", authMiddleware, userController.changePasswordController);
router.post("/logout", authMiddleware, userController.logoutController);
router.get("/whoami", authMiddleware, userController.whoamiController);

module.exports = router;
