import io from 'socket.io-client';

const socket = io(process.env.API); // Replace with your server URL
// const socket = io("https://servifind-app.onrender.com") //website
export default socket;


