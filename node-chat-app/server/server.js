const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const routes = require('./routes');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');

// setup express
const port = process.env.PORT || 3000;
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

        // join socket.io room
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        // io.emit -> io.to(room).emit
        // socket.broadcast.emit -> socket.broadcast.to(room).emit
        // socket.emit

        // send an updated user list to all user in this room
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit(NEW_MESSAGE, generateMessage('Admin', 'Welcome to the chat app'));

        socket.broadcast.to(params.room).emit(NEW_MESSAGE, generateMessage('Admin', `${params.name} joined`));

        callback();
    })

    socket.on(CREATE_MESSAGE, (message, callback) => {
        console.log(CREATE_MESSAGE, message);
        io.emit(NEW_MESSAGE, generateMessage(message.from, message.text));

        if(callback) {
            callback('This is from the server');
        }
    });

    socket.on(CREATE_LOCATION_MESSAGE, (coords) => {
        io.emit(NEW_LOCATION_MESSAGE, generateLocationMessage('Admin', coords.latitude, coords.longitude));
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
 * Setup routes
 *
 */
routes(app);

 /**
 *
 * Start server and listen for requests on {port}
 *
 */
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
