import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../layout/Loader';

import Swal from 'sweetalert2';
import $ from 'jquery';

import { availPremium } from '../../../actions/freelancerActions';
import { newNotification } from '../../../actions/notificationActions';

import axios from "axios";

import { ChatState } from '../../../Context/ChatProvider';
import socket from '../../../Context/socket';

var selectedChatCompare;

const Premium = () => {

    const { selectedChat, setSelectedChat, notification, setNotification, fetchNotificationAgain, setFetchNotificationAgain } = ChatState();
    const [newMessageReceivedLocal, setNewMessageReceivedLocal] = useState(null);
    const [newInquiryReceivedLocal, setNewInquiryReceivedLocal] = useState(null);
    const [newOfferReceivedLocal, setNewOfferReceivedLocal] = useState(null);
    const [acceptOfferReceivedLocal, setAcceptOfferReceivedLocal] = useState(null);
    const [workCompletedReceivedLocal, setWorkCompletedReceivedLocal] = useState(null);
    const [paymentSentReceivedLocal, setPaymentSentReceivedLocal] = useState(null);
    const [paymentReceivedLocal, setPaymentReceivedLocal] = useState(null);
    const [newRatingReceivedLocal, setNewRatingReceivedLocal] = useState(null);


    const dispatch = useDispatch();

    const [receipt, setReceipt] = useState('')
    const [receiptName, setReceiptName] = useState('')

    const { freelancer, isUpdated } = useSelector(state => state.updateFreelancer)


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

    const OnChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {

                setReceipt(reader.result)
                setReceiptName(e.target.files[0].name)

            }
        }

        reader.readAsDataURL(e.target.files[0])

    }

    const submitHandler = (e) => {
        e.preventDefault();
        const freelancerData = new FormData();
        freelancerData.set('premiumReceipt', receipt);
        Swal.fire({
            title: 'is Payment Done?',
            text: "",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, payment is done'
        }).then((result) => {
            if (result.isConfirmed) {

                dispatch(availPremium(freelancerData));

                Swal.fire(
                    'Payment Sent!',
                    'Wait for the admin to verify your payment',
                    'success'
                )
                //closes the modal
                $('.close').click();

            }
        })


    }


    return (
        <Fragment>
            <div className="subscription__plan-container">
                <h1>Pricing</h1>
                <div className="subscription__wrapper-card">
                    <div className="subscription__card-basic">
                        <div className="subscription-header">
                            <h2>Basic</h2>
                            <h2>₱0
                                {/* <span>/ Month</span> */}
                            </h2>
                        </div>
                        <p>
                            <img src="../images/check.png" alt="" />
                            Create One service
                        </p>
                        <p>
                            <img src="../images/check.png" alt="" />
                            Chat
                        </p>
                        {/* <p>
                            <img src="../images/check.png" alt="" />
                            Accomodate 1 transaction
                        </p> */}
                        <p>
                            <img src="../images/check.png" alt="" />
                            Limited functions
                        </p>
                        <button disabled>Current Plan</button>
                    </div>
                    <div className="subscription__card-premium">
                        <div className="subscription-header">
                            <h2>Premium</h2>
                            <h2>₱50
                                {/* <span>/ Month</span> */}
                            </h2>
                        </div>
                        <p>
                            <img src="../images/check.png" alt="" />
                            Create many services
                        </p>
                        <p>
                            <img src="../images/check.png" alt="" />
                            Chat
                        </p>
                        <p>
                            <img src="../images/check.png" alt="" />
                            Advertise Services
                        </p>
                        <button data-toggle="modal" data-target="#PaymentDetailsModal">Choose Plan</button>
                    </div>
                </div>
            </div>

            {/* PAYMENT MODAL */}
            <Fragment>
                <div className="modal fade" id="PaymentDetailsModal" tabIndex="-1" role="dialog" aria-labelledby="PaymentDetailsModalTitle" aria-hidden="true" >
                    <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '900px' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="PaymentDetailsModalTitle">Payment</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form className="a" onSubmit={submitHandler} encType='multipart/form-data' >
                                {/* {loadings ? <Loader /> : ( */}
                                <div className="modal-body">

                                    <div className='row' >


                                        <div className='sixty' style={{ width: '60%', backgroundColor: 'transparent', padding: '10px' }}>
                                            {/* <img
                                                // src={transaction.inquiry_id && transaction.inquiry_id.freelancer.user_id.avatar.url}
                                                // alt={service.user && service.user.name}
                                                // key={service._id}
                                                // src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                                                className="rounded-img-big"


                                            /> */}
                                            <h4>Amount to pay: ₱50</h4>
                                            {/* <h4>Gcash Name: {transaction.isPaid}</h4> */}
                                            <h4>Gcash Name: Kendrick Galan</h4>
                                            <h4>Gcash Number: 09705684000</h4>

                                            <div className='form-group'>
                                                <br />
                                                <label htmlFor="email_field">GCash Receipt</label>
                                                <div className='d-flex align-items-center'>
                                                    {/* <div>
                        <figure className='avatar mr-3 item-rtl'>
                            <img
                                // src={avatarPreview}
                                className='rounded-circle'
                                alt='Avatar Preview'
                            />
                        </figure>
                    </div> */}
                                                    <div className='custom-file'>
                                                        <input
                                                            type='file'
                                                            name='avatar'
                                                            className='custom-file-input'
                                                            id='customFile'
                                                            accept='image/*'
                                                            required
                                                            onChange={OnChange}
                                                        />

                                                        {receiptName ? (
                                                            <label className='custom-file-label' htmlFor='customFile'>

                                                                {receiptName}

                                                            </label>

                                                        ) : (
                                                            <label className='custom-file-label' htmlFor='customFile'>

                                                                Attach screenshot

                                                            </label>

                                                        )
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='forty' style={{ width: '40%', backgroundColor: 'transparent', alignContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>

                                            <img
                                                src='https://res.cloudinary.com/dawhmjhu1/image/upload/v1681745281/servifind/photo1681745194_ad8slz.jpg'
                                                style={{
                                                    height: '50vh',
                                                    width: '35vh', border: '5px solid', margin: '10px'
                                                }}


                                            />
                                            <h4>Gcash QR Code</h4>
                                        </div>


                                    </div>







                                </div>
                                {/* )} */}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" >Payment Done</button>


                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </Fragment>
        </Fragment>
    )
}

export default Premium