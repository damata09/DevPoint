// backend/src/services/socketService.js
const socketio = require('socket.io');

const initSocket = (httpServer) => {
  const io = socketio(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  return io;
};

module.exports = initSocket; // Exporta diretamente a função