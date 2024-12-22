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
      origin: [
        "http://localhost:3000", // Local dummy frontend
      ],
      methods: ["GET", "POST"], // Allow specific HTTP methods
    },
    transports: ["polling", "websocket"], // Allow both polling and WebSocket
    path: "/socket.io/", // Explicitly set the path
  });

  console.log("Socket.IO initialized");

  // Handle client connections
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Send a welcome message to the connected client
    socket.emit("message", "Welcome to the real-time server!");

    // Handle client disconnection
    socket.on("disconnect", (reason) => {
      console.log(`Client disconnected: ${socket.id}, reason: ${reason}`);
    });

    // Custom event listeners
    socket.on("custom_event", (data) => {
      console.log(`Received custom_event from ${socket.id}:`, data);
      // Broadcast a response to all other clients
      socket.broadcast.emit("custom_event_response", {
        message: "This is a response from the server.",
        data,
      });
    });

    // Log any errors on the socket
    socket.on("error", (err) => {
      console.error(`Socket error from ${socket.id}:`, err);
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
