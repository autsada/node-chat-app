require('./config/config');
const http = require('http');
const path = require('path'); // path is a node build-in module
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const {Users} = require('./utils/users')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users()

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }

    socket.join(params.room);

    // before add them to a room, we need to make sure they leave previous room
    users.removeUser(socket.id)

    // add user to users array after they joined the room
    users.addUser(socket.id, params.name, params.room)

    // socket.leave('The Office Fans') -> leave the room

    // io.emit -> io.to('The Office Fans').emit -> send to everybody in the room
    io.to(params.room).emit('updateUserList', users.getUserList(params.room))

    // socket.broadcast.emit -> socket.broadcast.to('The Office Fans') -> send to everybody but sender
    // socket.emit -> send to specific user

    // Welcome message -> socket.emit -> emit event to single connection
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

    // socket.broadcast.emit -> socket.broadcast.to('The Office Fans') -> send message to everyone except creator
    socket.broadcast.to(params.room).emit(
      'newMessage',
      generateMessage('Admin', `${params.name} has joined.`)
    );

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);

    // io.emit -> emit event to all connections
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', coords => {
    console.log(coords);
    io.emit(
      'newLocationMessage',
      generateLocationMessage('Admin', coords.latitude, coords.longiture)
    );
  });

  socket.on('disconnect', () => {
    // remove user when they leave
    const user = users.removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room))
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
    }
  });
});

server.listen(port, () => {
  console.log(`Start up at port ${port}`);
});
