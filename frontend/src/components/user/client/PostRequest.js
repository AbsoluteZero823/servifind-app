
import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination';
import { Link, useParams } from "react-router-dom";
import MetaData from '../../layout/MetaData';
// import Animal from './animal/Animal'
// import Loader from './layout/Loader'
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getCategories, clearErrors, newCategory } from '../../../actions/categoryActions';
import { newRequest } from '../../../actions/requestActions';
import { useNavigate } from 'react-router-dom';
import { NEW_CATEGORY_RESET } from '../../../constants/categoryConstants';
import { NEW_REQUEST_RESET } from '../../../constants/requestConstants';
import { newNotification } from '../../../actions/notificationActions';

import axios from "axios";

import { ChatState } from '../../../Context/ChatProvider';
import socket from '../../../Context/socket';

var selectedChatCompare;

const PostRequest = () => {
    const { selectedChat, setSelectedChat, notification, setNotification, fetchNotificationAgain, setFetchNotificationAgain } = ChatState();
    const [newMessageReceivedLocal, setNewMessageReceivedLocal] = useState(null);
    const [newInquiryReceivedLocal, setNewInquiryReceivedLocal] = useState(null);
    const [newOfferReceivedLocal, setNewOfferReceivedLocal] = useState(null);
    const [acceptOfferReceivedLocal, setAcceptOfferReceivedLocal] = useState(null);
    const [workCompletedReceivedLocal, setWorkCompletedReceivedLocal] = useState(null);

    const alert = useAlert();
    const dispatch = useDispatch();

    let navigate = useNavigate();


    const { loading, error, categories } = useSelector(state => state.categories);
    const { user, isAuthenticated } = useSelector(state => state.auth)

    const { success } = useSelector(state => state.addRequest);

    const [category_id, setId] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        dispatch(getCategories())

        if (success) {
            navigate('/manage-requests');
            // alert.success('Service created successfully');
            Swal.fire(
                'Request Successfully Created!',
                '',
                'success'
            )
            dispatch({ type: NEW_CATEGORY_RESET })
            dispatch({ type: NEW_REQUEST_RESET })
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


    useEffect(() => {
        if (acceptOfferReceivedLocal && acceptOfferReceivedLocal !== null) {
            // Execute your code when a new message is received
            console.log('accept offer received:', acceptOfferReceivedLocal);


            // addAcceptedOfferNotif()
            const formData = new FormData();
            formData.set("type", "accept_offer");
            // formData.set("message", acceptOfferReceivedLocal.request_id ? `${acceptOfferReceivedLocal.request_id.requested_by.name} accepted your offer` : `${acceptOfferReceivedLocal.inquiry_id.customer.name} accepted your offer`),
            formData.set("message", acceptOfferReceivedLocal.request_id ? `${acceptOfferReceivedLocal.request_id.requested_by.name} accepted your offer` : `${acceptOfferReceivedLocal.inquiry_id.customer.name} accepted your offer`);
            formData.set("type_id", acceptOfferReceivedLocal._id);
            formData.set("user_id", acceptOfferReceivedLocal.offered_by);
            dispatch(newNotification(formData));

            // Reset the newMessageReceived state
            setFetchNotificationAgain(!fetchNotificationAgain);
            setAcceptOfferReceivedLocal(null);
        }
    }, [acceptOfferReceivedLocal]);

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


    const submitHandler = (e) => {
        e.preventDefault();
        const requestData = new FormData();
        requestData.set('category', category_id);
        requestData.set('description', description);
        requestData.set('requested_by', user._id)
        // categoryData.set('service_id', transaction.inquiry_id.service_id._id);
        // categoryData.set('user', user._id)
        // categoryData.set('transaction_id', transaction._id)

        // dispatch(RateDone(transaction._id));
        dispatch(newRequest(requestData));




        // TODO:
        //         KEN INAVIGATE MO DAPAT SA MANAGE REQUEST AFTER MAG SUCCESS TO




        // dispatch(updateProfile(formData))

    }
    return (
        <Fragment>
            <MetaData title={'Post Job'} />
            <div className='newstyle'>
                <div className='mainsection'>
                    <div className='firstsection'>
                        <h3 className=''>Post Job</h3>
                        <img src='https://peopleintouch.com/wp-content/uploads/2019/11/illustratie-partner-compact.png' style={{ height: '50%', width: '100%' }}></img>
                    </div>
                    {/* forms */}
                    <div className='secondsection'>
                        <div style={{ padding: '10px 10px' }}>

                            {/* populate the service of the logged in freelancer */}


                            <form onSubmit={submitHandler}>
                                <br />
                                <label>What are you looking for? </label>
                                <textarea
                                    name="description"
                                    id="description" className="form-control mt-3"
                                    style={{ minHeight: '200px' }}
                                    placeholder='compose a detailed description of your request'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </textarea>
                                <br />
                                <label htmlFor="category">Category that best fit for your request</label>
                                <select
                                    name="reason"
                                    id="reason"
                                    className='form-control'
                                    value={category_id}
                                    onChange={(e) => setId(e.target.value)}
                                >
                                    <option value="">Select Category</option>


                                    {categories.map((category) => (
                                        <option value={category._id}>{category.name}</option>
                                        //   <li key={season.id}>{season}</li>
                                    ))}
                                    {/* categories.forEach(category => {
                    
                                        <option value={category._id}>{category.name}</option>
                                      

  
}) */}

                                </select>
                                <div style={{ paddingTop: '50px', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button className='nav-button' type="submit">Submit Request</button>
                                </div>
                            </form>
                            {/* <button>Submit</button> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <section id='cm-intro'>
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

                                 

                                </div>
                                <div style={{ paddingTop: '50px', display: 'flex', justifyContent: 'flex-start' }}>
                                    <Link to='/application'><button className='nav-button'>Become a Freelancer</button></Link>
                                </div>
                            </div>
                        </div>



                    </div>
                    <img id='home' className='bg-pic' src='../images/TUPT.jpg'></img>

                </div>

            </section> */}


        </Fragment >
    );
}
export default PostRequest
