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