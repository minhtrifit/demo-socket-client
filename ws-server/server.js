const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const bodyParser = require("body-parser");

const PORT = 5000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server }); // WebSocket server

app.use(bodyParser.json());

// Danh sách kết nối hiện tại
const clients = new Set();

let clientCounter = 1;

wss.on("connection", (ws) => {
  const clientId = `client-${clientCounter++}`;
  ws.clientId = clientId;
  clients.add(ws);

  console.log("🔌 A user connected:", clientId);

  // Gửi thông báo đến tất cả client
  broadcast({
    type: "client_connected",
    message: `${clientId} connected!`,
    timestamp: Date.now(),
  });

  ws.on("close", () => {
    console.log("❌ Client disconnected:", clientId);
    clients.delete(ws);
  });
});

// Hàm gửi tới tất cả client
const broadcast = (data) => {
  const msg = JSON.stringify(data);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
};

// Gửi sự kiện khi có người tham gia
app.post("/participant-join", (req, res) => {
  const { name } = req.body;

  broadcast({
    type: "participant_join",
    message: `${name} đã tham gia!`,
    timestamp: Date.now(),
  });

  res.json({ status: "sent" });
});

server.listen(PORT, () => {
  console.log(`🚀 WebSocket server is running on http://localhost:${PORT}`);
});
