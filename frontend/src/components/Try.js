
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
  const [acceptOfferReceivedLocal, setAcceptOfferReceivedLocal] = useState(null);
  const [workCompletedReceivedLocal, setWorkCompletedReceivedLocal] = useState(null);
  const [paymentSentReceivedLocal, setPaymentSentReceivedLocal] = useState(null);
  const [paymentReceivedLocal, setPaymentReceivedLocal] = useState(null);
  const [newRatingReceivedLocal, setNewRatingReceivedLocal] = useState(null);


  const { selectedChat, setSelectedChat, notification, setNotification, fetchNotificationAgain, setFetchNotificationAgain } = ChatState();



  const alert = useAlert();
  const dispatch = useDispatch();



  const { loading, services, error, servicesCount, resPerPage, filteredServicesCount } = useSelector(state => state.services);


  const [currentPage, setCurrentPage] = useState(1)
  let { keyword } = useParams();


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

    socket.on('accept_offer received', (acceptOfferReceived) => {
      setAcceptOfferReceivedLocal(acceptOfferReceived);
    });

    socket.on('work_completed received', (workCompletedReceived) => {
      setWorkCompletedReceivedLocal(workCompletedReceived);

    });

    socket.on('payment_sent received', (paymentSentReceived) => {
      setPaymentSentReceivedLocal(paymentSentReceived);

    });

    socket.on('payment_received received', (paymentReceived) => {
      setPaymentReceivedLocal(paymentReceived);

    });

    socket.on('rating received', (newRatingReceived) => {
      setNewRatingReceivedLocal(newRatingReceived);

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

      // Reset the newMessageReceived state
      setFetchNotificationAgain(!fetchNotificationAgain);
      setNewInquiryReceivedLocal(null);
    }
  }, [newInquiryReceivedLocal]);

  useEffect(() => {
    if (newOfferReceivedLocal && newOfferReceivedLocal !== null) {
      // Execute your code when a new offer is received
      console.log('New offer received:', newOfferReceivedLocal);

      // Reset the newOfferReceived state
      setFetchNotificationAgain(!fetchNotificationAgain);
      setNewOfferReceivedLocal(null);
    }
  }, [newOfferReceivedLocal]);

  useEffect(() => {
    if (acceptOfferReceivedLocal && acceptOfferReceivedLocal !== null) {
      // Execute your code when a new message is received
      console.log('accept offer received:', acceptOfferReceivedLocal);

      // Reset the newMessageReceived state
      setFetchNotificationAgain(!fetchNotificationAgain);
      setAcceptOfferReceivedLocal(null);
    }
  }, [acceptOfferReceivedLocal]);

  useEffect(() => {
    if (workCompletedReceivedLocal && workCompletedReceivedLocal !== null) {
      // Execute your code when a new offer is received
      console.log('Freelancer Done working notification received:', workCompletedReceivedLocal);

      // Reset the newOfferReceived state
      setFetchNotificationAgain(!fetchNotificationAgain);
      setWorkCompletedReceivedLocal(null);
    }
  }, [workCompletedReceivedLocal]);

  useEffect(() => {
    if (paymentSentReceivedLocal && paymentSentReceivedLocal !== null) {
      // Execute your code when a new offer is received
      console.log('payment sent notification received:', paymentSentReceivedLocal);

      // Reset the newOfferReceived state
      setFetchNotificationAgain(!fetchNotificationAgain);
      setPaymentSentReceivedLocal(null);
    }
  }, [paymentSentReceivedLocal]);

  useEffect(() => {
    if (paymentReceivedLocal && paymentReceivedLocal !== null) {
      // Execute your code 
      console.log('payment received notification received:', paymentReceivedLocal);

      // Reset the state
      setFetchNotificationAgain(!fetchNotificationAgain);
      setPaymentReceivedLocal(null);
    }
  }, [paymentReceivedLocal]);

  useEffect(() => {
    if (newRatingReceivedLocal && newRatingReceivedLocal !== null) {
      // Execute your code when a new offer is received
      console.log(newRatingReceivedLocal.offer_id)
      console.log('rating notification received:', newRatingReceivedLocal);

      // Reset the newOfferReceived state
      setFetchNotificationAgain(!fetchNotificationAgain);
      setNewRatingReceivedLocal(null);
    }
  }, [newRatingReceivedLocal]);

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
