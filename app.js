const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const http = require("http"); // Required for integrating Socket.IO

// Initialize background jobs
require("./jobs/lockedStatusCleanup");

// Sijaga routes
const userRoutes = require("./routes/userAuthRoute"); 
const sendIdCardRoutes = require("./routes/sendCardIdRoute");
const userNeeds = require("./routes/userRoute")
const usageHistory = require("./routes/usageHistoryRoutes")

const app = express();

// Create an HTTP server and integrate it with Socket.IO
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*", // Allow all domains (change in production for security)
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Socket.IO setup (server-side)
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for events from clients (you can listen for specific events like 'sendMessage')
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Example event to notify client
  socket.emit("welcome", "Welcome to the real-time server!");

  // Notify clients on any update to locked status or usage history (this is just an example)
  socket.on("status_update", (data) => {
    io.emit("status_update", data); // Emit to all connected clients
  });
});

// API Routes
app.use("/user", userRoutes);
app.use("/card-id",sendIdCardRoutes);
app.use("/user-ess",userNeeds);
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

module.exports = app;
