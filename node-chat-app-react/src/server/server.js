const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../build');

// setup express
const port = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

const CONNECTION = 'connection';
const DISCONNECT = 'disconnect';
const CREATE_MESSAGE = 'createMessage';
const NEW_MESSAGE = 'newMessage';
const CREATE_LOCATION_MESSAGE = 'createLocationMessage';
const NEW_LOCATION_MESSAGE = 'newLocationMessage';
const JOIN_ROOM = 'join';


io.on(CONNECTION, (socket) => {
    console.log('new user connected', socket.id);

    socket.on(JOIN_ROOM, (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and Room are required');
        }

        const room = params.room.toUpperCase();
        const user = users.getUserByName(params.name);
        if(user && user.room === room) {
            return callback('Name is already taken');
        }

        // join socket.io room
        socket.join(room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, room);

        // io.emit -> io.to(room).emit
        // socket.broadcast.emit -> socket.broadcast.to(room).emit
        // socket.emit

        // send an updated user list to all user in this room
        io.to(room).emit('updateUserList', users.getUserList(room));

        socket.emit(NEW_MESSAGE, generateMessage('Admin', 'Welcome to the chat app'));

        socket.broadcast.to(room).emit(NEW_MESSAGE, generateMessage('Admin', `${params.name} joined`));

        callback(null, room);
    });

    socket.on(CREATE_MESSAGE, (message, callback) => {
        const user = users.getUser(socket.id);

        if(user && isRealString(message.text)) {
            io.to(user.room).emit(NEW_MESSAGE, generateMessage(user.name, message.text));
        }
        
        if(callback) {
            callback('This is from the server');
        }
    });

    socket.on(CREATE_LOCATION_MESSAGE, (coords) => {
        const user = users.getUser(socket.id);
        if(user) {
            io.to(user.room).emit(NEW_LOCATION_MESSAGE, generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on(DISCONNECT, () => {
        console.log('client disconnected', socket.id);
        var user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit(generateMessage('Admin', `${user.name} has left`));
        }
    })
});

/**
 *
 * Middleware
 *
 */

// add middleware to serve any file in the public folder
app.use( express.static(publicPath) );

 /**
 *
 * Start server and listen for requests on {port}
 *
 */
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
