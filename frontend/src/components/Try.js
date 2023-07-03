
import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination';
import { useParams } from "react-router-dom";
import MetaData from './layout/MetaData'
import Service from './service/Service'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getServicesToDisplay } from '../actions/serviceActions'
import { newNotification } from '../actions/notificationActions';


import axios from "axios";
import socket from '../Context/socket';
import { ChatState } from '../Context/ChatProvider';


var selectedChatCompare;
const Try = () => {
  const [newMessageReceivedLocal, setNewMessageReceivedLocal] = useState(null);
  const [newInquiryReceivedLocal, setNewInquiryReceivedLocal] = useState(null);
  const [newOfferReceivedLocal, setNewOfferReceivedLocal] = useState(null);

  const { selectedChat, setSelectedChat, notification, setNotification, fetchNotificationAgain, setFetchNotificationAgain } = ChatState();



  const alert = useAlert();
  const dispatch = useDispatch();



  const { loading, services, error, servicesCount, resPerPage, filteredServicesCount } = useSelector(state => state.services);


  const [currentPage, setCurrentPage] = useState(1)
  let { keyword } = useParams();


  // useEffect(() => {
  //     socket.on('inquiry received', (newInquiryReceived) => {
  //       setNewInquiryReceivedLocal(newInquiryReceived);
  //     });
  // }, []);



  // useEffect(() => {
  //   socket.on('offer received', (newOfferReceived) => {
  //     setNewOfferReceivedLocal(newOfferReceived);
  //   });
  // }, []);

  // useEffect(() => {
  //     if (newInquiryReceivedLocal && newInquiryReceivedLocal !== null) {
  //       // Execute your code when a new message is received
  //       console.log('New inquiry received:', newInquiryReceivedLocal);


  //           addInquiryNotif()


  //       // Reset the newMessageReceived state
  //       setFetchNotificationAgain(!fetchNotificationAgain);
  //       setNewInquiryReceivedLocal(null);
  //     }
  //   }, [newInquiryReceivedLocal]);




  // useEffect(() => {
  //   if (newOfferReceivedLocal && newOfferReceivedLocal !== null) {
  //     // Execute your code when a new offer is received
  //     console.log('New offer received:', newOfferReceivedLocal);


  //     addOfferNotif()


  //     // Reset the newOfferReceived state
  //     setFetchNotificationAgain(!fetchNotificationAgain);
  //     setNewOfferReceivedLocal(null);
  //   }
  // }, [newOfferReceivedLocal]);

  useEffect(() => {
    if (error) {
      alert.success('success')
      return alert.error(error)
    }

    dispatch(getServicesToDisplay(keyword))


  }, [dispatch, alert, error, keyword]);

  useEffect(() => {
    socket.on('message received', (newMessageReceived) => {
      setNewMessageReceivedLocal(newMessageReceived);
    });

    socket.on('inquiry received', (newInquiryReceived) => {
      setNewInquiryReceivedLocal(newInquiryReceived);
      });
      socket.on('offer received', (newOfferReceived) => {
        setNewOfferReceivedLocal(newOfferReceived);
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

  useEffect(() => {
    if (newInquiryReceivedLocal && newInquiryReceivedLocal !== null) {
      // Execute your code when a new message is received
      console.log('New inquiry received:', newInquiryReceivedLocal);


      // addInquiryNotif()

      const formData = new FormData();
      formData.set("type", 'inquiry');
      formData.set("message", `New Inquiry from ${newInquiryReceivedLocal.customer.name}`);
      formData.set("type_id", newInquiryReceivedLocal._id);
      formData.set("user_id", newInquiryReceivedLocal.freelancer.user_id);

      dispatch(newNotification(formData));


      // Reset the newMessageReceived state
      setFetchNotificationAgain(!fetchNotificationAgain);
      setNewInquiryReceivedLocal(null);
    }
  }, [newInquiryReceivedLocal]);

  useEffect(() => {
    if (newOfferReceivedLocal && newOfferReceivedLocal !== null) {
      // Execute your code when a new offer is received
      console.log('New offer received:', newOfferReceivedLocal);


      // addOfferNotif()

      const formData = new FormData();
      formData.set("type", (newOfferReceivedLocal.request_id) ? "offer_request" : "offer_inquiry");
      formData.set("message", `New Offer from ${newOfferReceivedLocal.offered_by.name}`);
      formData.set("type_id", newOfferReceivedLocal._id);
      formData.set("user_id", (newOfferReceivedLocal.request_id) ? newOfferReceivedLocal.request_id.requested_by : newOfferReceivedLocal.inquiry_id.customer);
      dispatch(newNotification(formData));
      // type: (newOfferReceivedLocal.request_id) ? "offer_request" : "offer_inquiry",
      //   message: `New Offer from ${newOfferReceivedLocal.offered_by.name}`,
      //     type_id: newOfferReceivedLocal._id,
      //       user_id: userid

      // Reset the newOfferReceived state
      setFetchNotificationAgain(!fetchNotificationAgain);
      setNewOfferReceivedLocal(null);
    }
  }, [newOfferReceivedLocal]);

  const addMessageNotif = async () => {


    let userid = ""

    if (newMessageReceivedLocal.sender._id === newMessageReceivedLocal.chat.users[0]._id) {
      userid = newMessageReceivedLocal.chat.users[1]._id
    }
    else {
      userid = newMessageReceivedLocal.chat.users[0]._id
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",

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

    } catch (error) {
      console.log(error);
    }

  };
 



  // const addOfferNotif = async () => {

  //   const userid = (newOfferReceivedLocal.request_id) ? newOfferReceivedLocal.request_id.requested_by : newOfferReceivedLocal.inquiry_id.customer;


  //   // event.preventDefault();

  //   try {
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //         // Authorization: `Bearer ${user.token}`,
  //       },
  //     };

  //     const { data } = await axios.post(
  //       "/api/v1/notification/new",
  //       {
  //         type: (newOfferReceivedLocal.request_id) ? "offer_request" : "offer_inquiry",
  //         message: `New Offer from ${newOfferReceivedLocal.offered_by.name}`,
  //         type_id: newOfferReceivedLocal._id,
  //         user_id: userid
  //       },
  //       config
  //     );
  //     console.log(data);
  //     // socket.emit("new message", data.message);
  //     // setMessages([...messages, data.message]);

  //     // setFetchAgain(!fetchAgain);
  //   } catch (error) {
  //     console.log(error);
  //   }

  // };



  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber)
  }
  let count = servicesCount;

  if (keyword) {
    count = filteredServicesCount
  }
  return (
    <Fragment>


      {loading ? <Loader /> : (
        <Fragment>
          <div className='containerz'>
            <MetaData title={'Services'} />

            {/* <h1 id="animals_heading">Services</h1> */}
            <section id="services" className="containerz mt-5">
              <div className="row" style={{ justifyContent: 'space-between' }}>
                {services && services.map(service => (

                  <Service key={service._id} service={service} />
                ))}
              </div>
            </section>
          </div>


        </Fragment>
      )
      }
    </Fragment >
  );
}
export default Try
