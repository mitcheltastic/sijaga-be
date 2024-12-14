const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const http = require("http"); // Required for integrating Socket.IO

// Import Socket.IO setup
const { initSocket } = require("./socket");

// Initialize background jobs
require("./jobs/lockedStatusCleanup");

// Sijaga routes
const userRoutes = require("./routes/userAuthRoute");
const sendIdCardRoutes = require("./routes/sendCardIdRoute");
const userNeeds = require("./routes/userRoute");
const usageHistory = require("./routes/usageHistoryRoutes");

const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = initSocket(server); // Initialize and store Socket.IO instance

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Socket.IO events
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.emit("welcome", "Welcome to the real-time server!");

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  // Example: Listen for a 'status_update' event and broadcast it to all clients
  socket.on("status_update", (data) => {
    io.emit("status_update", data);
  });
});

// API Routes
app.use("/user", userRoutes);
app.use("/card-id", sendIdCardRoutes);
app.use("/user-ess", userNeeds);
app.use("/history", usageHistory);

app.get("/", (req, res) => {
  res.send("Hello, World!");
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

// Export the app and server for reuse
module.exports = { app, server };
