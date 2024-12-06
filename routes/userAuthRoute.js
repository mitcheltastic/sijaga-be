const express = require("express");
const router = express.Router();
const { createSijagaController } = require("../controller/userAuthController");

// Route to create a new user and Sijaga record
router.post("/create-sijaga", createSijagaController);

module.exports = router;
