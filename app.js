const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Initialize background jobs
require("./jobs/lockedStatusCleanup");

// Sijaga routes
const userRoutes = require("./routes/userAuthRoute");
const sendIdCardRoutes = require("./routes/sendCardIdRoute");
const userNeeds = require("./routes/userRoute");
const usageHistory = require("./routes/usageHistoryRoutes");

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight OPTIONS requests

// Middleware
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// API Routes
app.use("/user", userRoutes);
app.use("/card-id", sendIdCardRoutes);
app.use("/user-ess", userNeeds);
app.use("/history", usageHistory);

app.get("/", (req, res) => {
  res.send("This is SiJaga API!");
});

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

module.exports = app; // Export app instance only
