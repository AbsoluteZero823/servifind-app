
import React, { Fragment, useState, useEffect } from 'react'

import { Link, useParams } from "react-router-dom";
import MetaData from '../../layout/MetaData';

import Loader from '../../layout/Loader';
import Swal from 'sweetalert2';
import { MDBDataTable } from 'mdbreact'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getCategories, clearErrors, newCategory } from '../../../actions/categoryActions';
import { newRequest } from '../../../actions/requestActions';
import { useNavigate } from 'react-router-dom';
import { getRequests, clear } from '../../../actions/requestActions';
import { getOffers } from '../../../actions/offerActions';
import { newNotification } from '../../../actions/notificationActions';

import moment from 'moment/moment'

import axios from "axios";

import { ChatState } from '../../../Context/ChatProvider';
import socket from '../../../Context/socket';


var selectedChatCompare;



const ManageRequest = () => {
    const { selectedChat, setSelectedChat, notification, setNotification, fetchNotificationAgain, setFetchNotificationAgain } = ChatState();
    const [newMessageReceivedLocal, setNewMessageReceivedLocal] = useState(null);
    const [newInquiryReceivedLocal, setNewInquiryReceivedLocal] = useState(null);
    const [newOfferReceivedLocal, setNewOfferReceivedLocal] = useState(null);
    const [acceptOfferReceivedLocal, setAcceptOfferReceivedLocal] = useState(null);
    const [workCompletedReceivedLocal, setWorkCompletedReceivedLocal] = useState(null);
    const [paymentSentReceivedLocal, setPaymentSentReceivedLocal] = useState(null);
    const [paymentReceivedLocal, setPaymentReceivedLocal] = useState(null);
    const [newRatingReceivedLocal, setNewRatingReceivedLocal] = useState(null);



    const alert = useAlert();
    const dispatch = useDispatch();

    let navigate = useNavigate();


    // const { loading, error, categories } = useSelector(state => state.categories);
    const { user, isAuthenticated } = useSelector(state => state.auth)
    const { loading, error, requests } = useSelector(state => state.requests);
    const { offers } = useSelector(state => state.offers);
    // const { success } = useSelector(state => state.addRequest);



    useEffect(() => {

        dispatch(getRequests())
        dispatch(getOffers())
        // if (success) {
        //     navigate('/manage-request');
        //     // alert.success('Service created successfully');
        //     Swal.fire(
        //         'Request Successfully Created!',
        //         '',
        //         'success'
        //     )
        //     dispatch({ type: NEW_CATEGORY_RESET })
        // }

    }, [dispatch, alert, error, navigate])


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


    const getOffersHandler = (id) => {


        navigate(`/offers-request/${id}`);
        // const requestOffers = offers.filter(function (o) {
        //     return o.request_id === id;

        // });

        // if (requestOffers.length === 0) {
        //     console.log('no offers yet');
        // }
        // else {
        //     console.log(requestOffers);
        // }
        // return requestOffers;
    }


    const setOffers = () => {

        const data = {
            columns: [

                {
                    label: 'Date',
                    field: 'created_At'

                },

                {
                    label: 'Request/Description',
                    field: 'description',

                },
                {
                    label: 'Status',
                    field: 'request_status',


                },

                {
                    label: 'Offers',
                    field: 'offers',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        let MyRequests = requests.filter(function (myrequest) {
            return myrequest.requested_by._id === user._id;

        });
        MyRequests = MyRequests.sort((a, b) => {
            let fa = a.request_status.toLowerCase(),
                fb = b.request_status.toLowerCase();

            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0;
        });
        MyRequests.forEach(request => {
            const requestOffers = offers.filter(function (o) {
                return o.request_id === request._id;

            });

            const offersCount = requestOffers.length;
            // if (requestOffers.length === 0) {
            //     console.log('no offers yet');
            // }
            // else {
            //     console.log(requestOffers);
            // }
            data.rows.push({

                created_At: moment(request.created_At).format('MMM/DD/yy'),
                description: request.description,
                request_status: request.request_status,

                offers: <Fragment>
                    {offersCount === 0 && (
                        <div className='offers' onClick={() => Swal.fire('No offers yet',
                            'This request has empty offers',
                            'info'
                        )}>

                            <a href="#" className="notification">
                                <span style={{ color: 'white' }}>Offers</span>
                                {/* <span className="badge">{offersCount}</span> */}

                            </a>


                        </div>
                    )}
                    {offersCount > 0 && (
                        <div className='offers' onClick={() => getOffersHandler(request._id)}>
                            <a href="#" className="notification">
                                <span style={{ color: 'white' }}>Offers</span>
                                <span className="badge">{offersCount}</span>
                                {/* <i className="fa fa-pencil-alt"></i> */}
                            </a>
                        </div>
                    )}
                </Fragment>,

                actions: <Fragment>
                    <div className='action'>
                        <button className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil-alt"></i>
                        </button>
                        {/* <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(service._id)}> */}
                        <button className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </Fragment>

            })
        })

        return data;
    }



    return (

        <Fragment>
            <MetaData title={'Manage Requests'} />
            <div className='forTable'>
                <div className='container'>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '30px 0px' }}>
                        <div><h1 style={{ color: 'black' }}>Manage Requests</h1></div>
                        <div >
                            <Link to={'/post-request'}><button className='nav-button'>Post a Job</button></Link>
                        </div>
                    </div>
                </div>
                <Fragment>

                    {loading ? <Loader /> : (
                        <MDBDataTable
                            data={setOffers()}

                            bordered
                            striped
                            hover
                            // id='mdbtable'
                            scrollY
                            maxHeight='48vh'
                        // maxWidth='20vw'

                        />
                    )}

                </Fragment> </div>
        </Fragment>
    );
}
export default ManageRequest
