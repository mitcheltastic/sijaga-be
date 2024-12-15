const app = require("./app"); // Import your app instance
const http = require("http"); // Required for creating the HTTP server
const { initSocket } = require("./socket"); // Socket.IO initialization

const PORT = process.env.PORT || 3000;

// Create HTTP server and integrate app
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server); // Pass server instance to Socket.IO

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
