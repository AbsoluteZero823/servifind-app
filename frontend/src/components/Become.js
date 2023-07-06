
import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination';
import { Link, useParams } from "react-router-dom";
import MetaData from './layout/MetaData'

import Loader from './layout/Loader'
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';

import { getFreelancers } from '../actions/freelancerActions';
import { newNotification } from '../actions/notificationActions';

import axios from "axios";
import { ChatState } from '../Context/ChatProvider';
import socket from '../Context/socket';

var selectedChatCompare;
const Become = () => {


  const { selectedChat, setSelectedChat, notification, setNotification, fetchNotificationAgain, setFetchNotificationAgain } = ChatState();
  const [newMessageReceivedLocal, setNewMessageReceivedLocal] = useState(null);
  const [newOfferReceivedLocal, setNewOfferReceivedLocal] = useState(null);
  const [workCompletedReceivedLocal, setWorkCompletedReceivedLocal] = useState(null);



  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector(state => state.auth)
  const { freelancers, success } = useSelector(state => state.freelancers)
  const [isTupEmail, setIsTupEmail] = useState();
  const [isApplied, setIsApplied] = useState();


  useEffect(() => {
    socket.on('message received', (newMessageReceived) => {
      setNewMessageReceivedLocal(newMessageReceived);
    });

    socket.on('offer received', (newOfferReceived) => {
      setNewOfferReceivedLocal(newOfferReceived);
    });

    socket.on('work completed', (workCompletedReceived) => {
      setWorkCompletedReceivedLocal(workCompletedReceived);
    });

    return () => {
      // I-close ang socket connection kapag nag-unmount ang component
      socket.disconnect();
    };
  }, []);

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
    if (workCompletedReceivedLocal && workCompletedReceivedLocal !== null) {
      // Execute your code when a new offer is received
      console.log('Freelancer Done working notification received:', workCompletedReceivedLocal);


      // addOfferNotif()

      const formData = new FormData();
      formData.set("type", "work completed");
      formData.set("message", `${workCompletedReceivedLocal.offer_id.offered_by.name}'s work is done`);
      formData.set("type_id", workCompletedReceivedLocal._id);
      formData.set("user_id", (workCompletedReceivedLocal.offer_id.request_id) ? workCompletedReceivedLocal.offer_id.request_id.requested_by : workCompletedReceivedLocal.offer_id.inquiry_id.customer);
      dispatch(newNotification(formData));


      // Reset the newOfferReceived state
      setFetchNotificationAgain(!fetchNotificationAgain);
      setWorkCompletedReceivedLocal(null);
    }
  }, [workCompletedReceivedLocal]);



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

  // THIS FUNCTION VALIDATES IF EMAIL IS TUP EMAIL


  const validateEmail = () => {
    var regex = /^[^\s@]+@tup\.edu.ph$/;
    var result = regex.test(user && user.email);
    if (result == true) {
      //Proceed further
      console.log(result)
      setIsTupEmail(result)
    }
    else {
      console.log("Email address is not TUP email")
    }
  }

  const validateIfApplied = () => {
    freelancers.forEach((freelancer) => {
      if (user._id === freelancer.user_id) {
        setIsApplied(true)
      }
    });

  }

  useEffect(() => {
    dispatch(getFreelancers());

    if (success) {
      validateEmail();
      validateIfApplied();
    }


  }, [dispatch, success]);

  const NotTUPEmail = () => {
    Swal.fire(
      'Your Email is not TUP Email',
      'Only TUP students can apply for a freelancer',
      'warning'
    )
  }

  const AlreadyApplied = () => {
    Swal.fire(
      'You already sent an Application',
      'Please wait for a while, your application is on verification process',
      'info'
    )
  }

  return (
    <Fragment>
      <section id='cm-intro'>
        <MetaData title={'Become a Freelancer'} />
        <div className='intro'>
          <div className='welcome' style={{ padding: '0px 100px' }}>

            <h3 className='firstTitle'>Who are Eligible?</h3>

            <div className='infoBody' style={{ display: 'flex', }}>
              <div className='thirtyfive-percent'>
                <img src='../images/students-college.png' ></img>
              </div>
              <div style={{ width: '65%', paddingLeft: '110px', display: 'flex', flexDirection: 'column', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{ color: 'white', }}>
                  <h3 className='' style={{ paddingBottom: '10px' }}>To apply for freelancer, user must:</h3>

                  <h3 className=''>— Currently enrolled at Technological University of the Philippines Taguig Branch.</h3>
                  <h3 className=''>— Uses a verified TUP email account.</h3>
                  <h3 className=''>— Pass the requirements needed.</h3>

                  {/* <h3 className=''>Any student currently enrolled at Technological University of the Philippines Taguig Branch</h3> */}

                </div>

                <div style={{ paddingTop: '50px', display: 'flex', justifyContent: 'flex-start' }}>
                  {isTupEmail && !isApplied && (
                    <Link to='/application'><button className='nav-button'>Become a Freelancer</button></Link>
                  )}
                  {isTupEmail && isApplied && (
                    <button className='nav-button' onClick={AlreadyApplied}>Become a Freelancer</button>
                  )}
                  {/* <Link to='/application'><button className='nav-button'>Become a Freelancer</button></Link> */}
                  {!isTupEmail && (
                    <button className='nav-button' onClick={NotTUPEmail}>Become a Freelancer</button>
                  )}
                </div>
              </div>
            </div>
            {/* <h4 className='firstTitle' style={{ fontSize: "80px" }}>Want to Become a Freelancer?</h4> */}

            {/* <p>WHERE YOU CAN FIND THE BEST SERVICE IN THE RIGHT TIME ON THE RIGHT PERSON
            </p> */}



          </div>
          <img id='home' className='bg-pic' src='../images/TUPT.jpg'></img>

        </div>

      </section>


    </Fragment >
  );
}
export default Become
