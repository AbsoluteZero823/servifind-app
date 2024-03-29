const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errors');
const fileUpload = require('express-fileupload')
const cors = require('cors')
const XLSX = require('xlsx');
const path = require('path')
const fs = require('fs');
const app = express();
// REQUIRED FOR UPLOADING LARGE IMAGE

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json());

app.use(cookieParser());


// app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());



app.use(
    cors({

        // origin: "https://servifind-app.onrender.com", //website
        origin: process.env.BASE_URL, //localhost
        methods: "GET,POST,PUT,DELETE",
        credentials: true,

    })
);


const service = require('./routes/service');
const auth = require('./routes/auth');
const inquiry = require('./routes/inquiry');
const transaction = require('./routes/transaction');
const freelancer = require('./routes/freelancer');
const rating = require('./routes/rating');
const report = require('./routes/report');
const request = require('./routes/request');
const category = require('./routes/category');
const offer = require('./routes/offer');
const chat = require('./routes/chat');
const message = require('./routes/message');
const notification = require('./routes/notification');
const pdfroute = require('./routes/pdfroute');

app.use('/api/v1', service);
app.use('/api/v1', auth);
app.use('/api/v1', inquiry);
app.use('/api/v1', transaction);
app.use('/api/v1', freelancer);
app.use('/api/v1', rating);
app.use('/api/v1', report);
app.use('/api/v1', request);
app.use('/api/v1', category);
app.use('/api/v1', offer);
app.use('/api/v1', chat);
app.use('/api/v1', message);
app.use('/api/v1', notification);
app.use('/api/v1', pdfroute);

app.use(errorMiddleware);


if (process.env.NODE_ENV === 'PRODUCTION') {

    const __dirname1 = path.resolve();
    //server Static Assets
    const joinedPath = path.join(__dirname1, '/frontend/build');
    app.use(express.static(joinedPath));



    //Return the main html page for all routess
    const joinedPathIndex = path.join(__dirname1, "frontend", "build", "index.html");
    app.get('*', (req, res) => {
        res.sendFile(joinedPathIndex)
    })

    // if (fs.existsSync(joinedPathIndex)) {
    //     console.log('The joined path exists.');
    // } else {
    //     console.log('The joined path does not exist.');
    // }

    console.log('prod nga ito')
} else {

    app.get("/", (req, res) => {
        res.send("API is Running Successfully");
        console.log('kaya pala')
    })
}


module.exports = app
