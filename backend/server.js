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
        // origin: "http://localhost:3000", //localhost
        origin: "https://servifind-app.onrender.com" //website
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

        if (!offer.inquiry_id && !offer.request_id) return console.log('offer not defined');
        socket.in((offer.request_id) ? offer.request_id.requested_by : offer.inquiry_id.customer).emit("offer received", newOfferReceived);

    });

    //Notification for accept offer
    socket.on('accept offer', (acceptOfferReceived) => {
        socket.broadcast.emit("accept_offer received", acceptOfferReceived);
        var offer = acceptOfferReceived;

        if (!offer.offered_by) return console.log('offer.offered_by not defined');
        socket.in(offer.offered_by).emit("accept_offer received", acceptOfferReceived);

    });




    // NEED TO DO ----------------------------------------------------------

    //Notification for reject offer
    socket.on('reject offer', (rejectOfferReceived) => {
        socket.broadcast.emit("reject_offer received", rejectOfferReceived);
        var offer = rejectOfferReceived;

        if (!offer.freelancer) return console.log('offer.freelancer not defined');
        socket.in(offer.inquiry_id.customer).emit("reject_offer received", rejectOfferReceived);

    });

    //Notification for refuse offer
    socket.on('refuse offer', (refuseOfferReceived) => {
        socket.broadcast.emit("refuse_offer received", refuseOfferReceived);
        var offer = refuseOfferReceived;

        if (!offer.freelancer) return console.log('offer.freelancer not defined');
        socket.in(offer.inquiry_id.customer).emit("refuse_offer received", refuseOfferReceived);

    });

    //Notification for work completed
    socket.on('work completed', (workCompletedReceived) => {
        socket.broadcast.emit("work_completed received", workCompletedReceived);
        var transaction = workCompletedReceived;
        // console.log(transaction.offer_id.request_id.requested_by, 'requested_by')
        // console.log(transaction.offer_id.inquiry_id.customer, 'customer')
        if (!transaction.offer_id) return console.log('transaction.freelancer not defined');
        socket.in((transaction.offer_id.request_id) ? transaction.offer_id.request_id.requested_by : transaction.offer_id.inquiry_id.customer).emit("work_completed received", workCompletedReceived);
    });

    //Notification for payment sent
    socket.on('payment sent', (paymentSentReceived) => {
        socket.broadcast.emit("payment_sent received", paymentSentReceived);
        var transaction = paymentSentReceived;

        if (!transaction.offer_id) return console.log('transaction.freelancer not defined');

        socket.in(transaction.offer_id.offered_by).emit("payment_sent received", paymentSentReceived);

    });

    //Notification for payment received
    socket.on('payment received', (paymentReceived) => {

        socket.broadcast.emit("payment_received received", paymentReceived);
        var transaction = paymentReceived;

        if (!transaction.offer_id) return console.log('transaction.freelancer not defined');
        socket.in((transaction.offer_id.request_id) ? transaction.offer_id.request_id.requested_by : transaction.offer_id.inquiry_id.customer).emit("payment_receieved received", paymentReceived);

    });

    //Notification for rating
    socket.on('new rating', (newRatingReceived) => {
        console.log("sa side ng nag pindot")
        socket.broadcast.emit("rating received", newRatingReceived);
        var transaction = newRatingReceived;

        if (!transaction.offer_id) return console.log('transaction.freelancer not defined');
        // socket.in(offer.inquiry_id.customer).emit("rating received", newRatingReceived);
        socket.in(transaction.offer_id.offered_by).emit("rating received", newRatingReceived);

    });







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