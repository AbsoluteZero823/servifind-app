import axios from "axios";
import socket from "../../../Context/socket";

//Freelancer


//INQUIRY RECEIVED ---------------------------------------------------------------->
useEffect(() => {
    socket.on('inquiry received', (newInquiryReceived) => {
      setNewInquiryReceivedLocal(newInquiryReceived);
    });
}, []);

useEffect(() => {
    if (newInquiryReceivedLocal && newInquiryReceivedLocal !== null) {
      // Execute your code when a new message is received
      console.log('New inquiry received:', newInquiryReceivedLocal);

  
          addInquiryNotif()
  

      // Reset the newMessageReceived state
      setFetchNotificationAgain(!fetchNotificationAgain);
      setNewInquiryReceivedLocal(null);
    }
  }, [newInquiryReceivedLocal]);


  const addInquiryNotif = async () => {
    console.log("awot")
   
 
    const userid = newInquiryReceivedLocal.freelancer.user_id
   
   
       // event.preventDefault();
   
       try {
         const config = {
           headers: {
             "Content-type": "application/json",
             // Authorization: `Bearer ${user.token}`,
           },
         };
        
         const { data } = await axios.post(
           "/api/v1/notification/new",
           {
             type: "inquiry",
             message: `New Inquiry from ${newInquiryReceivedLocal.customer.name}`,
             type_id: newInquiryReceivedLocal._id,
             user_id: userid
           },
           config
         );
         console.log(data);
         // socket.emit("new message", data.message);
         // setMessages([...messages, data.message]);
   
         // setFetchAgain(!fetchAgain);
       } catch (error) {
         console.log(error);
       }
   
   };
//INQUIRY RECEIVED <---------------------------------------------------------------->

//End Freelancer


//Client

//MESSAGE RECEIVED ----------------------------------------------------------------------------->
useEffect(() => {
    socket.on('message received', (newMessageReceived) => {
      setNewMessageReceivedLocal(newMessageReceived);
    });

}, []);


useEffect(() => {
    if (newMessageReceivedLocal && newMessageReceivedLocal !== null) {
      // Execute your code when a new message is received
      console.log('New message received:', newMessageReceivedLocal);

      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageReceivedLocal.chat._id
      ) {
          addMessageNotif()
      } else {
        // setFetchAgain(!fetchAgain);
        // setMessages([...messages, newMessageReceived]);
        console.log("over")
      }

      // Reset the newMessageReceived state
      setFetchNotificationAgain(!fetchNotificationAgain);
      setNewMessageReceivedLocal(null);
    }
  }, [newMessageReceivedLocal]);

  const addMessageNotif = async () => {
    console.log("awot")
   
   let userid = ""
    
     if(newMessageReceivedLocal.sender._id === newMessageReceivedLocal.chat.users[0]._id){
       userid = newMessageReceivedLocal.chat.users[1]._id
     }
     else {
      userid = newMessageReceivedLocal.chat.users[0]._id
     }
   
       // event.preventDefault();
   
       try {
         const config = {
           headers: {
             "Content-type": "application/json",
             // Authorization: `Bearer ${user.token}`,
           },
         };
        
         const { data } = await axios.post(
           "/api/v1/notification/new",
           {
             type: "message",
             message: `New message from ${newMessageReceivedLocal.sender.name}`,
             type_id: newMessageReceivedLocal._id,
             user_id: userid
           },
           config
         );
         console.log(data);
         // socket.emit("new message", data.message);
         // setMessages([...messages, data.message]);
   
         // setFetchAgain(!fetchAgain);
       } catch (error) {
         console.log(error);
       }
   
   };


//MESSAGE RECEIVED <----------------------------------------------------------------------------->

//OFFER RECEIVED ----------------------------------------------------------------------------->

useEffect(() => {
    socket.on('offer received', (newOfferReceived) => {
      setNewOfferReceivedLocal(newOfferReceived);
    });
}, []);

useEffect(() => {
    if (newOfferReceivedLocal && newOfferReceivedLocal !== null) {
      // Execute your code when a new offer is received
      console.log('New offer received:', newOfferReceivedLocal);

  
          addOfferNotif()
  

      // Reset the newOfferReceived state
      setFetchNotificationAgain(!fetchNotificationAgain);
      setNewOfferReceivedLocal(null);
    }
  }, [newOfferReceivedLocal]);


  const addOfferNotif = async () => {
   
    const userid = newOfferReceivedLocal.inquiry_id.customer
   
   
       // event.preventDefault();
   
       try {
         const config = {
           headers: {
             "Content-type": "application/json",
             // Authorization: `Bearer ${user.token}`,
           },
         };
        
         const { data } = await axios.post(
           "/api/v1/notification/new",
           {
             type: "offer",
             message: `New Offer from ${newOfferReceivedLocal.offered_by.name}`,
             type_id: newOfferReceivedLocal._id,
             user_id: userid
           },
           config
         );
         console.log(data);
         // socket.emit("new message", data.message);
         // setMessages([...messages, data.message]);
   
         // setFetchAgain(!fetchAgain);
       } catch (error) {
         console.log(error);
       }
   
   };



//OFFER RECEIVED <----------------------------------------------------------------------------->

//End Client




//Admin

//End Admin