const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const routes = require('./requests');
const { onConnection, playVideoEvent, pauseVideoEvent, disconnectEvent, setProgressEvent, setPlaybackRateEvent } = require('./requests');

// Express middleware
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Method', 'POST, GET, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());
app.use(routes);
// app.listen(process.env.PORT || 3030);

// Socket.io middleware
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ['X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'],
  }
});

io.on('connection', (socket) => {
  onConnection(socket);
  playVideoEvent(socket);
  pauseVideoEvent(socket);
  disconnectEvent(socket);
  setProgressEvent(socket);
  setPlaybackRateEvent(socket);
});

server.listen(process.env.PORT || 3030);