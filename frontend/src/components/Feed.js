
import React, { Fragment, useState, useEffect } from 'react'

import { useParams, useNavigate } from "react-router-dom";
import MetaData from './layout/MetaData';
import Request from './Request';
import Loader from './layout/Loader';
import $ from 'jquery';


import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';

import { getFreelancerServices } from '../actions/serviceActions';
import { getCategories } from '../actions/categoryActions';
import { getRequests, clear } from '../actions/requestActions';
import { newOffer } from '../actions/offerActions';
import { NEW_OFFER_RESET } from '../constants/offerConstants';
import { newNotification } from '../actions/notificationActions';

import axios from "axios";



import { ChatState } from '../Context/ChatProvider';
import socket from '../Context/socket';


var selectedChatCompare;


const Feed = () => {

    const { selectedChat, setSelectedChat, notification, setNotification, fetchNotificationAgain, setFetchNotificationAgain } = ChatState();
    const [newMessageReceivedLocal, setNewMessageReceivedLocal] = useState(null);
    const [newInquiryReceivedLocal, setNewInquiryReceivedLocal] = useState(null);
    const [newOfferReceivedLocal, setNewOfferReceivedLocal] = useState(null);
    const [acceptOfferReceivedLocal, setAcceptOfferReceivedLocal] = useState(null);
    const [workCompletedReceivedLocal, setWorkCompletedReceivedLocal] = useState(null);

    let navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();


    // const { users } = useSelector(state => state.users)
    // const { loading, services, error, servicesCount, resPerPage, filteredServicesCount } = useSelector(state => state.services);

    const { loading, error, requests } = useSelector(state => state.requests);
    const { categories } = useSelector(state => state.categories);
    const { services } = useSelector(state => state.freelancerServices);
    const { offer, success, newOfferLoading } = useSelector((state) => state.addOffer);
    // const { loadings, detailserror, transaction } = useSelector(state => state.transactionDetails);
    const { user, isAuthenticated } = useSelector(state => state.auth)
    // const [currentPage, setCurrentPage] = useState(1)

    const [selectedRequest, setSelectedRequest] = useState('');
    const [category, setCategory] = useState('');
    let { categoryId } = useParams();

    const [service_id, setServiceId] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');



    useEffect(() => {
        if (error) {
            alert.success('success')
            return alert.error(error)
        }
        dispatch(getCategories())
        dispatch(getRequests(categoryId))
        // if (user) {
        //     console.log(user._id);
        // }




    }, [dispatch, alert, error, success]);
    useEffect(() => {

        if (user.role === 'freelancer') {
            dispatch(getFreelancerServices(user.freelancer_id._id));
        }

    }, []);

    useEffect(() => {
        console.log(selectedRequest)


    }, [selectedRequest]);
    useEffect(() => {


        if (success) {
            socket.emit("new offer", offer);
            dispatch({ type: NEW_OFFER_RESET });
            console.log('bakit ako')
            Swal.fire("Offer sent Successfully!", "", "success");

        }
    }, [success]);

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




    const submitOfferHandler = (e) => {
        e.preventDefault();
        // console.log(e)
        // const { requestId } = e.target;
        const offerData = new FormData();


        offerData.set('service_id', service_id);
        offerData.set('description', description);
        offerData.set('price', price);
        // offerData.set('offered_by', user._id);
        offerData.set('request_id', selectedRequest);


        dispatch(newOffer(offerData));
        // Swal.fire(
        //     'Offer sent Successfully!',
        //     '',
        //     'success'
        // )
        //closes the modal
        $('.close').click();




        // dispatch(updateProfile(formData))

    }

    const categoryHandler = (id) => {
        if (id && id !== "") {
            navigate(`/feed/category/${id}`)
            // window.location.reload()
        }
        else if (id === "") {
            navigate(`/feed`)
        }
    }
    // const categoryHandler => {
    //     if (category && category != "") {
    //         navigate(`/feed/category/${category}`)
    //         // window.location.reload()
    //     }
    //     else if (category === "") {
    //         navigate(`/feed`)
    //     }
    // }
    let sortedRequests = requests.filter(function (myrequest) {
        return myrequest.request_status === 'waiting';

    });
    sortedRequests = sortedRequests.sort((a, b) => {
        let da = new Date(a.created_At),
            db = new Date(b.created_At);
        return db - da;
    });
    return (

        <Fragment>

            <MetaData title={'Feed'} />

            <Fragment>
                <div className='firstcontainer' style={{ paddingTop: '25px', boxShadow: 'none' }}>
                    <div className='secondcontainer' style={{ display: 'flex' }}>


                        {/* sa mga transaction na */}
                        {loading ? <Loader /> : (
                            <div style={{ width: '70%', padding: '0px 10px' }}>
                                {/* dito nagsimula ang isang service */}

                                {sortedRequests && sortedRequests.map(request => (

                                    <Request key={request._id} request={request} services={services} setSelectedRequest={setSelectedRequest} />
                                ))}



                            </div>
                        )}
                        <div style={{ width: '30%' }}>
                            <div className='card filter' style={{}}>
                                <a style={{ paddingBottom: '10px' }}>My Offers</a>
                                <p style={{ fontSize: '20px' }}>Category Filter</p>

                                <form>
                                    <label className="filterContainer">All
                                        <input type="radio" defaultChecked="checked" name="category" value="" onClick={() => setCategory("")} onChange={() => categoryHandler("")} />
                                        <span className="checkmark"></span>
                                    </label>
                                    {categories.map((category) => (
                                        <label className="filterContainer" key={category._id} >{category.name}

                                            <input
                                                type="radio"
                                                name="category"
                                                value={category._id}
                                                key={category._id}
                                                onClick={() => setCategory(category._id)}
                                                onChange={() => categoryHandler(category._id)}

                                            />

                                            <span className="checkmark"></span>
                                        </label>
                                        // <option value={category._id}>{category.name}</option>

                                    ))}


                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>
            {/* MAKE OFFER MODAL */}

            <div className="modal fade" id="MakeOfferModal" tabIndex="-1" role="dialog" aria-labelledby="MakeOfferModalTitle" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '700px' }}>
                    <div className="modal-content" >
                        <div className="modal-header">
                            <h5 className="modal-title" id="MakeOfferModalTitle">Make Offer</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <form className="a" onSubmit={submitOfferHandler} encType='multipart/form-data' >
                            <div className="modal-body">

                                <div style={{ padding: '10px 10px' }}>
                                    {/* populate the service of the logged in freelancer */}
                                    <label htmlFor="service_id">Service to offer:</label>

                                    <select
                                        name="service_id"
                                        id="service_id"
                                        className='form-control'
                                        value={service_id}
                                        onChange={(e) => setServiceId(e.target.value)}
                                    >
                                        <option value="">Select Service</option>

                                        {services.map((service) => (
                                            <option key={service._id} value={service._id}>{service.name}</option>
                                            //   <li key={season.id}>{season}</li>
                                        ))}
                                        {/* <option value="spam">service1</option>
                                        <option value="harassment">service2</option>
                                        <option value="inappropriate-content">service3</option> */}
                                    </select>
                                    <br />
                                    <label>Description: </label>
                                    <textarea
                                        name="description"
                                        id="description" className="form-control mt-3"
                                        style={{ minHeight: '200px' }}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    >
                                    </textarea>

                                    <div className="form-group">
                                        <label htmlFor="stock_field">Price</label>
                                        <input
                                            type="number"
                                            id="stock_field"
                                            className="form-control"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>


                                </div>








                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" >Submit</button>


                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </Fragment >
    );
}
export default Feed
