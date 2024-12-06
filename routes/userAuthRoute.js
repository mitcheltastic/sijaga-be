const express = require("express");
const router = express.Router();
const {
  createSijagaController,
  getSijagaByUserIdController,
  updateSijagaStatusController,
} = require("../controller/userAuthController");

// Create a new Sijaga record
router.post("/sijaga", createSijagaController);

// Get all Sijaga records for a specific user
router.get("/sijaga/:userId", getSijagaByUserIdController);

// Update the status of a Sijaga record
router.patch("/sijaga/:id", updateSijagaStatusController);

module.exports = router;
