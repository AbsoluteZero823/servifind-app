import React, { Fragment, useState, useEffect } from 'react'
import {
    Link
    // , useNavigate 
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { newNotification } from '../../actions/notificationActions'

import axios from "axios";

import { ChatState } from '../../Context/ChatProvider'
import socket from '../../Context/socket'


var selectedChatCompare;

// import { getAdopt } from '../../actions/animalActions'
const Profile = () => {
    const { selectedChat, setSelectedChat, notification, setNotification, fetchNotificationAgain, setFetchNotificationAgain } = ChatState();
    const [newMessageReceivedLocal, setNewMessageReceivedLocal] = useState(null);
    const [newInquiryReceivedLocal, setNewInquiryReceivedLocal] = useState(null);
    const [newOfferReceivedLocal, setNewOfferReceivedLocal] = useState(null);
    const [acceptOfferReceivedLocal, setAcceptOfferReceivedLocal] = useState(null);
    const [workCompletedReceivedLocal, setWorkCompletedReceivedLocal] = useState(null);
    const [paymentSentReceivedLocal, setPaymentSentReceivedLocal] = useState(null);
    const [paymentReceivedLocal, setPaymentReceivedLocal] = useState(null);
    const [newRatingReceivedLocal, setNewRatingReceivedLocal] = useState(null);


    const { user, loading } = useSelector(state => state.auth)
    // let navigate = useNavigate();
    const dispatch = useDispatch();


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

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'My Profile'} />
                    <div style={{ height: "calc(100vh - 100px)", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="profile-card">
                            <h1 className="profile-header">Profile Information</h1>
                            <div className="profile-info__container">
                                <img src={user && user.avatar.url} alt="" />
                                <div className="profile-info">
                                    <div className="name">{user && user.name}</div>
                                    <div className="emailaddress">{user && user.email}</div>
                                    <div className="gender"><i className="fa-solid fa-user"></i>{user && user.gender}</div>
                                    {/* <div className="address"><i className="fa-solid fa-location-dot"></i> #24 Ilang-ilang Street Purok 6-C Lower
                                    Bicutan Taguig City</div> */}
                                    <div className="phonenum"><i className="fa-solid fa-phone"></i>{user && user.contact}</div>
                                    <div className="profile-button">
                                        <Link to="/me/update" id="edit_profile">
                                            Edit Profile
                                        </Link>
                                        <Link to="/password/update">
                                            Change Password
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <h2 className="mt-5 ml-5">My Profile</h2>
                    <div className="flex-container space-between">
                        <div className="col card" id='profile-div'>
                            <figure className='img-placeholder'>
                                <img className="rounded-circle img-fluid" src={user && user.avatar.url} alt={user.name} />
                            </figure>

                            <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                                Edit Profile
                            </Link>

                        </div>

                        <div className="fa-solid fa-user">
                            <div className="row">
                                <div className="col-3">
                                    <h4>Full Name</h4>
                                    <p>{user.name}</p>
                                </div>

                                <div className="col-3">
                                    <h4>Age</h4>
                                    <p>{user.age}</p>
                                </div>


                                <div className="col-5">
                                    <h4>Gender</h4>
                                    <p>{user.gender}</p>
                                </div>

                                <div className="col-4">
                                    <h4>Contact Number</h4>
                                    <p>{user.contact}</p>
                                </div>

                                <div className="fa-solid fa-paper-plane">
                                    <h4>Email Address</h4>
                                    <p>{user.email}</p>
                                </div>

                                <div className="col-13">
                                    <h4>Joined On</h4>
                                    <p>{String(user.createdAt).substring(0, 10)}</p>
                                </div>
                            </div>
                      

                            <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                                Change Password
                            </Link>
                        </div>
                    </div> */}
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile