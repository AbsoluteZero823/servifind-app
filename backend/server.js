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
        origin: "http://localhost:3000", //localhost
        // origin: "https://servifind-app.onrender.com" //website
    },
});

io.on("connection", (socket) => {
    console.log('connected to socket.io');

    socket.on('setup', (userData) => {
        console.log("Setup na")
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
        console.log("bagong message1")
        var chat = newMessageReceived.chat;

        if (!chat.users) return console.log('chat.users not defined');

        chat.users.forEach(user => {
            if (user._id === newMessageReceived.sender._id) return;

            socket.in(user._id).emit("message received", newMessageReceived);
            console.log("bagong message2")
        });
    });

    socket.on('new inquiry', (newInquiryReceived) => {
        socket.broadcast.emit("inquiry received", newInquiryReceived);
        // console.log("bagong message1")
        var inquiry = newInquiryReceived;

        if (!inquiry.freelancer) return console.log('inquiry.freelancer not defined');
        socket.in(inquiry.freelancer.user_id).emit("inquiry received", newInquiryReceived);

    });

    socket.on('new offer', (newOfferReceived) => {
        socket.broadcast.emit("offer received", newOfferReceived);
        // console.log("bagong message1")
        var offer = newOfferReceived;

        if (!offer.freelancer) return console.log('offer.freelancer not defined');
        socket.in(offer.inquiry_id.customer).emit("offer received", newOfferReceived);

    });
    // NEED TO DO ----------------------------------------------------------
    //Notification for accept offer
    //Notification for reject offer
    //Notification for refuse offer
    //Notification for work completed
    //Notification for payment sent
    //Notification for payment received
    //Notification for rating
    //Notification for pag may nag offer sa request
    //Notification for pag inaccept ang offer
    // NEED TO DO ----------------------------------------------------------
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