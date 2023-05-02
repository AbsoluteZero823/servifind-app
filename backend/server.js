const app = require('./app');
const connectDatabase = require('./config/database');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');

const dotenv = require('dotenv');

dotenv.config({ path: 'backend/config/config.env' })

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})

const server = app.listen(process.env.PORT, () => {
    console.log(`server started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);

});



const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: ["http://localhost:3000", "https://servifind.onrender.com"],
    },
});

io.on("connection", (socket) => {
    console.log('connected to socket.io');

    socket.on('setup', (userData) => {
        socket.join(userData._id);
        // console.log(userData._id);
        socket.emit('connected');
    });

    // socket.on('join chat', (room) => {
    //     socket.join(room);
    //     console.log("User joined room: " + room);
    // });

    socket.on('join chat', (room) => {

        const ourroom = room;
        socket.join(ourroom);
        if (socket.rooms.has(ourroom)) {
            const roomClients = io.sockets.adapter.rooms.get(ourroom);
            if (roomClients) {
                console.log(`Clients in room ${ourroom}:`, roomClients);
            }
        } else {
            console.log(`Socket is not connected to room ${ourroom}`);
        }
    });

    socket.on('typing', (room) => socket.in(room).emit("typing"));
    socket.on('stop typing', (room) => socket.in(room).emit("stop typing"));

    socket.on('new message', (newMessageReceived) => {
        socket.broadcast.emit("message received", newMessageReceived);
        var chat = newMessageReceived.chat;

        if (!chat.users) return console.log('chat.users not defined');

        chat.users.forEach(user => {
            if (user._id === newMessageReceived.sender._id) return;

            socket.in(user._id).emit("message received", newMessageReceived);
        });
    });

    socket.off("setup", (userData) => {
        console.log("User Disconnected");
        socket.leave(userData._id);
    })
});

process.on('unhandledRejection', err => {
    console.log(`error:, ${err.stack}`);
    console.log((' shutting down this serve due to unhandled promise rejection'))
    server.close(() => {
        process.exit(1)
    })
})