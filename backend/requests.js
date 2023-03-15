const express = require('express');
const router = express.Router();
const Room = require('./Room');

const rooms = [];

router.get('/', (req, res, next) => {
  res.json({
    message: 'Hello World'
  });
});

router.post('/create-room', (req, res, next) => {
  const id = Math.ceil(Math.random() * 1000000);
  if (findRoom(id)) {
    res.status(500).send('Room already exists');
    return;
  }
  const link = req.body.link;
  const room = new Room(id, link);
  console.log('Created room', room);
  rooms.push(room);
  res.json({ 
    roomId: id
  });
});

router.get('/room/:roomId', (req, res, next) => {
  const roomId = req.params.roomId;
  const room = rooms.find(room => {
    return room.id == +roomId;
  });

  if(!room) {
    res.status(404).send('Room not found');
    return;
  }

  res.json({
    room: room,
  });
});


// socket.io requests
const findRoom = (id) => {
  return rooms.find(room => {
    return room.id == id;
  });
}

const sendToUsers = (socket, room, event, data) => {
  console.log('sendToUsers', event, data);
  room.users.forEach(user => {
    if (user.id != socket.id) {
      socket.to(user.id).emit(event, data);
    }
  });
}

const onConnection = (socket) => {
  const roomId = socket.handshake.query.roomId;
  const userName = socket.handshake.query.userName;
  const avatar = socket.handshake.query.avatar;
  console.log(`User connected. RoomId: ${roomId}, UserName: ${userName}, Avatar: ${avatar}`);

  const room = findRoom(roomId);

  if(room) {
    // search for user in room and add if not found
    const user = room.users.find(user => user.userName === userName);
    if (!user) {
      sendToUsers(socket, room, 'set-pause', {});
      if (!(room.users.some(user => user.userName === userName))) {
        room.users.push({
          id: socket.id,
          userName: userName,
          avatar: avatar
        });
        sendToUsers(socket, room, 'new-user-connected', {
          user: {
            id: socket.id,
            userName: userName,
            avatar: avatar
          }
        });
      }
      socket.emit("connected");
    } else {
      console.log('User already in room');
      socket.emit('user-already-in-room');
    }
  } else {
    console.log('Room not found');
    socket.emit('room-not-found');
  }
}

const playVideoEvent = (socket) => {
  socket.on('emit-play', (id) => {
    console.log(`Room ${id} - User ${socket.id} : PLAY video`);
    const room = findRoom(id);
    if (room) {
      sendToUsers(socket, room, 'set-play', {});
    }
  });
}

const pauseVideoEvent = (socket) => {
  socket.on('emit-pause', (id) => {
    console.log(`Room ${id} - User ${socket.id} : PAUSE video`);
    const room = findRoom(id);
    if (room) {
      sendToUsers(socket, room, 'set-pause', {});
    }
  });
}

const disconnectEvent = (socket) => {
  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
    // remove user from room
    const room = findRoom(socket.handshake.query.roomId);
    if (room) {
      const userIndex = room.users.findIndex(user => user.id === socket.id);
      if (userIndex > -1) {
        room.users.splice(userIndex, 1);
        sendToUsers(socket, room, 'user-disconnected', {
          id: socket.id
        });
      }
    }
  });
}

const setProgressEvent = (socket) => {
  socket.on('emit-progress', (data) => {
    console.log(`Room ${data.roomId} User ${socket.id} : SET progress to ${data.played}`);
    const room = findRoom(data.roomId);
    if (room) {
      room.played  = data.played;
      console.log(room);
      sendToUsers(socket, room, 'set-progress', {
        played: data.played
      });
    }
  });
}

const setPlaybackRateEvent = (socket) => {
  socket.on('emit-playback-rate', (data) => {
    console.log(`Room ${data.roomId} User ${socket.id} : SET playback rate to ${data.playbackRate}`);
    const room = findRoom(data.roomId);
    if (room) {
      room.playbackRate = data.playbackRate;
      console.log(room);
      sendToUsers(socket, room, 'set-playback-rate', {
        playbackRate: data.playbackRate
      });
    }
  });
}



module.exports = router;

module.exports.onConnection = onConnection;
module.exports.playVideoEvent = playVideoEvent;
module.exports.pauseVideoEvent = pauseVideoEvent;
module.exports.disconnectEvent = disconnectEvent;
module.exports.setProgressEvent = setProgressEvent;
module.exports.setPlaybackRateEvent = setPlaybackRateEvent;
