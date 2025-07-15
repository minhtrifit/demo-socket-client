const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");

const PORT = 5000;

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  // cors: {
  //   origin: "*",
  // },
});

app.use(bodyParser.json());

io.on("connection", (socket) => {
  console.log("🔌 A user connected:", socket.id);

  io.emit("client_connected", {
    message: `client ${socket.id} connected!`,
    timestamp: Date.now(),
  });
});

app.post("/participant-join", (req, res) => {
  const { name } = req.body;

  const postmanbody = {
    name: "Trí",
  };

  io.emit("participant_join", {
    message: `${name} đã tham gia!`,
    timestamp: Date.now(),
  });

  res.json({ status: "sent" });
});

server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
