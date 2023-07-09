import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../../layout/MetaData'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import Loader from '../../layout/Loader';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from "react-router-dom";

import { getFreelancerServices, deleteService } from '../../../actions/serviceActions';
import { DELETE_SERVICES_RESET } from '../../../constants/serviceConstants'
import { newNotification } from '../../../actions/notificationActions';
import axios from "axios";

import { ChatState } from '../../../Context/ChatProvider'
import socket from '../../../Context/socket'


var selectedChatCompare;

const MyServices = () => {
    const { selectedChat, setSelectedChat, notification, setNotification, fetchNotificationAgain, setFetchNotificationAgain } = ChatState();
    const [newMessageReceivedLocal, setNewMessageReceivedLocal] = useState(null);
    const [newInquiryReceivedLocal, setNewInquiryReceivedLocal] = useState(null);
    const [newOfferReceivedLocal, setNewOfferReceivedLocal] = useState(null);
    const [acceptOfferReceivedLocal, setAcceptOfferReceivedLocal] = useState(null);
    const [workCompletedReceivedLocal, setWorkCompletedReceivedLocal] = useState(null);
    const [paymentSentReceivedLocal, setPaymentSentReceivedLocal] = useState(null);
    const [paymentReceivedLocal, setPaymentReceivedLocal] = useState(null);
    const [newRatingReceivedLocal, setNewRatingReceivedLocal] = useState(null);


    const { notification: newNotif } = useSelector((state) => state.addNotification);

    const { user, isAuthenticated } = useSelector(state => state.auth)
    const { services, loading } = useSelector(state => state.freelancerServices)
    const { isDeleted } = useSelector(state => state.updelService)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {


        if (user) {
            dispatch(getFreelancerServices(user.freelancer_id._id))
        }

        if (isDeleted) {
            // alert.success('Service deleted successfully');
            // navigate('/services');
            dispatch({ type: DELETE_SERVICES_RESET })
        }
    }, [dispatch, isDeleted])


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

    const deleteServiceHandler = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this service? This action will delete your service permanently",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonColor: 'red',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteService(id))
                // navigate(`/premium`)
            }
        })
        // dispatch(deleteUser(id))
    }
    const isPremium = () => {
        // Swal.fire(
        //     'Information',
        //     'Basic Account are limited to one service only. Try to upgrade your account to premium',
        //     'info',

        // )
        Swal.fire({
            title: 'Go to Premium Application Page?',
            text: "Basic Account are limited to one service only. Try to upgrade your account to premium",
            icon: 'info',
            showCancelButton: true,
            cancelButtonText: "Later",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: 'gray',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/premium`)
            }
        })
    }
    const setTableData = () => {

        const data = {
            columns: [

                {
                    label: 'Image',
                    field: 'images'

                },
                {
                    label: 'Name',
                    field: 'name'

                },
                {
                    label: 'category',
                    field: 'category',
                    sort: 'asc'
                },

                {
                    label: 'Price Starts At',
                    field: 'priceStarts_At',
                    sort: 'asc'
                },
                // {
                //     label: 'Created At',
                //     field: 'created_At'

                // },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }


        services.forEach(service => {

            data.rows.push({


                images: <Fragment>

                    <img
                        className="anim"
                        src={service.images.url}
                    />

                </Fragment>,
                name: service.name,
                category: service.category.name,
                priceStarts_At:
                    <Fragment>
                        <p>₱{service.priceStarts_At}</p>
                    </Fragment>
                ,

                // created_At: moment(freelancer.user_id.created_At).format('MMM/DD/yy'),

                actions: <Fragment>

                    <div className='action'>
                        <Link to={`/service/details/${service._id}`} className="btn btn-success py-1 px-2">
                            <i className="fa fa-eye"></i>
                        </Link>
                        <Link to='' className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil-alt"></i>
                        </Link>
                        <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteServiceHandler(service._id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                        {/* <Link to={''} className="btn btn-success py-1 px-2" onClick={() => approveApplicationHandler(freelancer._id)}>
                            <div data-toggle="tooltip" title='Approve Application'>
                                <i className="fa fa-check" ></i>
                            </div>
                        </Link>
                        <Link to={''} className="btn btn-danger py-1 px-2" onClick={() => rejectApplicationHandler(freelancer._id)}>
                            <div data-toggle="tooltip" title='Reject Application'>
                                <i className="fa fa-times"></i>
                            </div>
                        </Link> */}



                    </div>

                </Fragment>
            })
        })

        return data;
    }
    return (
        <Fragment>

            <div className='forTable'>

                <div style={{ padding: '0', margin: '0', display: 'flex', justifyContent: 'space-between' }}>
                    <h1 style={{ padding: '0 !important', margin: '0 !important' }}>My Services</h1>
                    {user && user.freelancer_id.isPremium || !services[0] ? (
                        <h3 style={{ margin: 'auto 0px' }}>Add Service
                            <span> <Link to="/service/new" className="btn update-btn fa fa-plus">
                            </Link> </span>
                        </h3>
                    ) : (
                        <h3 style={{ margin: 'auto 0px' }}>Add Service
                            <span> <button className="btn update-btn fa fa-plus" onClick={() => isPremium()}>
                            </button> </span>
                        </h3>
                    )
                    }

                </div>

                <Fragment>
                    <MetaData title={'My Services'} />




                    {user && user.role === 'freelancer' && (
                        <Fragment>


                            {loading ? <Loader /> : (
                                <MDBDataTable
                                    data={setTableData()}
                                    className="px-3"
                                    bordered
                                    striped
                                    hover
                                    scrollY

                                    maxHeight='48vh'
                                />
                            )}

                        </Fragment>

                    )}








                </Fragment>




            </div >

        </Fragment>

    )
}

export default MyServices