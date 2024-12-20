const { Server } = require("socket.io");

let io; // Variable to hold the Socket.IO instance

/**
 * Initialize the Socket.IO instance
 * @param {http.Server} server - The HTTP server
 */
const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Allow all origins for testing; customize as needed
    },
  });

  console.log("Socket.IO initialized");

  // Handle client connections
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Handle client disconnection
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });

    // Additional event listeners can be added here if needed
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
