const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // serve index.html from /public

// When ESP32 master POSTs an event here, rebroadcast it to all clients
app.post("/api/event", (req, res) => {
  const event = req.body;
  console.log("Received event:", event);
  io.emit("newEvent", event);
  res.sendStatus(200);
});

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
