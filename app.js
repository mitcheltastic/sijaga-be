const express = require("express");
const cors = require("cors");

const app = express();

let corsOptions = {
  origin: true, // Allows requests from all origins
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Add a GET route for testing
app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app; // Export the app
