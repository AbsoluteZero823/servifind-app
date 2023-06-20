// import { useEffect } from 'react';
// import socket from './socket';

// const RealTime = (onNotificationReceived) => {
//   useEffect(() => {
//     // Event listener for receiving notifications
//     socket.on('message received', (newMessageReceived) => {
//         setNewMessageReceivedLocal(newMessageReceived);
//       });
  
//       // Cleanup function
//       return () => {
//         socket.off('message received');
//       };
// //   }, [onNotificationReceived]);
// }, []);

//   const emitNotification = (notification) => {
//     socket.emit('newNotification', notification);
//   };

//   return emitNotification;
// };

// export default RealTime;
