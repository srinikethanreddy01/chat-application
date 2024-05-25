const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users'); // Import user management functions

const PORT = process.env.PORT || 5000;
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "https://chat-application-kz5g.onrender.com",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors({
    origin: "https://chat-application-kz5g.onrender.com",
    methods: ["GET", "POST"],
    credentials: true
}));

io.on('connection', (socket) => {
    console.log('We have a new connection');

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined the room` });
        socket.join(user.room);
        io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)})


        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        if (user && user.room) {
            io.to(user.room).emit('message', { user: user.name, text: message });
            io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)})
            callback();
        } else {
            callback('Error: User not found or not in a room.');
        }
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left the room.` });
        }

        console.log("User disconnected");
    });
});

app.use(router);

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
