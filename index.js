const app = require("./app"); // Import your app instance
const http = require("http"); // Required to create an HTTP server for Socket.IO
const server = http.createServer(app); // Create an HTTP server using the app

// Listen on a port (either from environment variable or 3000 by default)
server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
