const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = 3000;

app.use(express.static('public'));

io.on('connection', socket => {
  console.log('New client connected');

  socket.on('locationUpdate', data => {
    io.emit('locationUpdate', data); // Broadcast to all including sender
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
