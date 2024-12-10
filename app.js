const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const userRoutes = require("./routes/userAuthRoute"); // Sijaga routes
const sendIdCardRoutes = require("./routes/sendCardIdRoute");
const userNeeds = require("./routes/userRoute")
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// API Routes
app.use("/user", userRoutes);
app.use("/card-id",sendIdCardRoutes);
app.use("/user-ess",userNeeds);
// 404 Error Handling
app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: "Resource not found",
  });
});

// Global Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: false,
    message: "Internal server error",
  });
});

module.exports = app;
