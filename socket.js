const { Server } = require("socket.io");

let io; // Variable to hold the Socket.IO instance

/**
 * Initialize the Socket.IO instance
 * @param {http.Server} server - The HTTP server
 */
const initSocket = (server) => {
  // Initialize Socket.IO with the provided server
  io = new Server(server, {
    cors: {
      origin: "*", // Allow all origins for testing; customize this for production
      methods: ["GET", "POST"], // Allow specific HTTP methods for better security
    },
  });

  console.log("Socket.IO initialized");

  // Handle client connections
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Send a welcome message to the connected client
    socket.emit("message", "Welcome to the real-time server!");

    // Handle client disconnection
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });

    // Additional event listeners can be added here
    // Example: Listen for a custom event
    socket.on("custom_event", (data) => {
      console.log(`Received custom_event from ${socket.id}:`, data);
      // You can broadcast or emit events here
      socket.broadcast.emit("custom_event_response", {
        message: "This is a response from the server.",
        data,
      });
    });
  });

  return io;
};

/**
 * Get the Socket.IO instance
 * @returns {Server} - The Socket.IO instance
 */
const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized!");
  }
  return io;
};

module.exports = { initSocket, getIO };
