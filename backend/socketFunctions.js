const playVideoEvent = (socket) => {
  socket.on('play-video', () => {
    console.log('play');
  });
}

const pauseVideoEvent = (socket) => {
  socket.on('pause-video', () => {
    console.log('pause');
  });
}

const disconnectEvent = (socket) => {
  socket.on('disconnect', () => {
    console.log('disconnected');
  });
}

module.exports = {
  playVideoEvent,
  pauseVideoEvent,
  disconnectEvent
}