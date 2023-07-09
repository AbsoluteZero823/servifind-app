import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";

import MetaData from '../layout/MetaData'
// import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newService, clearErrors } from '../../actions/serviceActions'
import { NEW_SERVICES_RESET } from '../../constants/serviceConstants'
import { getCategories } from '../../actions/categoryActions';
import { newNotification } from '../../actions/notificationActions';

import axios from "axios";


import { ChatState } from '../../Context/ChatProvider';
import socket from '../../Context/socket';


var selectedChatCompare;

const NewService = () => {

    const { selectedChat, setSelectedChat, notification, setNotification, fetchNotificationAgain, setFetchNotificationAgain } = ChatState();
    const [newMessageReceivedLocal, setNewMessageReceivedLocal] = useState(null);
    const [newInquiryReceivedLocal, setNewInquiryReceivedLocal] = useState(null);
    const [newOfferReceivedLocal, setNewOfferReceivedLocal] = useState(null);
    const [acceptOfferReceivedLocal, setAcceptOfferReceivedLocal] = useState(null);
    const [workCompletedReceivedLocal, setWorkCompletedReceivedLocal] = useState(null);
    const [paymentSentReceivedLocal, setPaymentSentReceivedLocal] = useState(null);
    const [paymentReceivedLocal, setPaymentReceivedLocal] = useState(null);
    const [newRatingReceivedLocal, setNewRatingReceivedLocal] = useState(null);

    // const [name, setName] = useState('')
    const { user } = useSelector(state => state.auth)
    const { categories } = useSelector(state => state.categories);

    const alert = useAlert();
    const dispatch = useDispatch();

    let navigate = useNavigate();



    const [name, setName] = useState('');
    const [priceStarts_At, setPriceStarts_At] = useState('');
    const [category, setCategory] = useState('')
    const [imageName, setImageName] = useState('')
    const [image, setImage] = useState('')

    const { loading, error, success } = useSelector(state => state.addService);

    useEffect(() => {
        dispatch(getCategories())
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            navigate(`/services/${user.freelancer_id._id}`);
            alert.success('Service created successfully');
            dispatch({ type: NEW_SERVICES_RESET })
        }

    }, [dispatch, alert, error, success, navigate])

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

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('category', category);
        formData.set('priceStarts_At', priceStarts_At);
        formData.set('images', image)


        dispatch(newService(formData))
    }

    const OnChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {

                setImage(reader.result)
                setImageName(e.target.files[0].name)

            }
        }
        // console.log(freelancerData.schoolID)
        reader.readAsDataURL(e.target.files[0])

    }

    return (
        <Fragment>

            <MetaData title={'Create Service'} />




            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-3">Create Service</h1>







                        <div className="service-info-container">

                            <label htmlFor="email_field">Select Category</label>

                            <select
                                name="category"
                                id="category"
                                className='form-control'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>


                                {categories.map((category) => (
                                    <option value={category._id} key={category._id}>{category.name}</option>

                                ))}



                            </select>
                            <br />
                            <label htmlFor="email_field">Service Name</label>
                            <input
                                type="text"
                                placeholder="I will ...... for you"
                                name='name'
                                className="form-control"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />

                            <br />
                            <label>Price Starts in (₱)</label>
                            <input
                                className="form-control"
                                placeholder="Price Starts At"
                                type="number"
                                id="priceStarts_At"
                                name="priceStarts_At"
                                min="5"
                                onChange={(e) => {
                                    setPriceStarts_At(e.target.value);
                                }}
                                value={priceStarts_At}
                            />

                            <div className='form-group'>
                                <br />
                                <label htmlFor="email_field">Image</label>
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
                                            onChange={OnChange}
                                        />

                                        {imageName ? (
                                            <label className='custom-file-label' htmlFor='customFile'>

                                                {imageName}

                                            </label>

                                        ) : (
                                            <label className='custom-file-label' htmlFor='customFile'>

                                                Attach Service Image

                                            </label>

                                        )
                                        }

                                    </div>
                                </div>
                            </div>




                        </div>









                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            Create
                        </button>
                        <Link to={`/services/${user.freelancer_id._id}`} className="btn btn-danger btn-block py-3">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default NewService