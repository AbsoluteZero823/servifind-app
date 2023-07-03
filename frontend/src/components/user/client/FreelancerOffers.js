
import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination';
import { useParams } from "react-router-dom";
import MetaData from '../../layout/MetaData';
import Offers from './Offers'
import Loader from '../../layout/Loader';

import Swal from 'sweetalert2'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';

import { RequestOffer, AcceptOffer, CancelOtherOffer } from '../../../actions/offerActions';
import { newTransaction } from '../../../actions/transactionActions';
import { accessChat } from '../../../actions/chatActions';

import { UPDATE_OFFER_RESET } from '../../../constants/offerConstants';
import { NEW_CHAT_RESET } from '../../../constants/chatConstants';
import { newNotification } from '../../../actions/notificationActions';

import axios from "axios";

import { ChatState } from '../../../Context/ChatProvider';
import socket from '../../../Context/socket';

var selectedChatCompare;

const FreelancerOffers = () => {
    const { selectedChat, setSelectedChat, notification, setNotification, fetchNotificationAgain, setFetchNotificationAgain } = ChatState();
    const [newMessageReceivedLocal, setNewMessageReceivedLocal] = useState(null);
    const [newInquiryReceivedLocal, setNewInquiryReceivedLocal] = useState(null);
    const [newOfferReceivedLocal, setNewOfferReceivedLocal] = useState(null);
    // const { createSliderWithToolTip } = Slider;
    // const Range = createSliderWithToolTip(Slider.Range);


    const alert = useAlert();
    const dispatch = useDispatch();


    // const { users } = useSelector(state => state.users)
    // const { loading, services, error, servicesCount, resPerPage, filteredServicesCount } = useSelector(state => state.services);
    const { loading, requestoffers, error } = useSelector(state => state.requestoffers)
    const { success } = useSelector(state => state.newChat)
    const { offer: updatedOffer, updateloading, success: isUpdated } = useSelector((state) => state.updateoffer);

    const [selectedOffer, setSelectedOffer] = useState('');
    const { request_id } = useParams();


    useEffect(() => {
        if (error) {
            alert.success('success')
            return alert.error(error)
        }

        dispatch(RequestOffer(request_id));


    }, [dispatch, alert, error, request_id]);

    useEffect(() => {

        if (selectedOffer) {
            console.log(selectedOffer, 'itooooo')
            acceptOfferHandler(selectedOffer)
        }


    }, [selectedOffer]);

    useEffect(() => {
        if (success) {
            dispatch({ type: NEW_CHAT_RESET })
            // navigate(`/chat`)
        }
        if (isUpdated) {
            console.log(updatedOffer, 'nyawit')
            socket.emit("accept offer", updatedOffer);


            dispatch({ type: UPDATE_OFFER_RESET });
        }


    }, [dispatch, alert, success, isUpdated])

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

    // const requestOffers = offers.filter(function (o) {
    //     return o.request_id === request_id;

    // });

    if (requestoffers) {
        console.log(requestoffers);
        console.log(request_id);
    }
    else {
        console.log('no');
    }



    const acceptOfferHandler = (requestoffer) => {
        if (!requestoffer) return;
        const offerData = new FormData();
        offerData.set('request_id', requestoffer.request_id._id);
        // formData.set('client', 'false');


        const formData = new FormData();
        formData.set('offer_id', requestoffer._id);
        formData.set('price', requestoffer.price)

        Swal.fire({
            title: 'Are you sure?',
            text: "Accepting this offer will decline all other offers?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {

                const chatData = new FormData();
                chatData.set('userId', requestoffer.offered_by._id);
                chatData.set('offerId', requestoffer._id);
                chatData.set('chatName', requestoffer.service_id.name);

                dispatch(CancelOtherOffer(requestoffer.request_id._id))
                dispatch(AcceptOffer(requestoffer._id))
                dispatch(newTransaction(formData));

                dispatch(accessChat(chatData));
                Swal.fire(
                    'Offer Accepted!',
                    'Thank you',
                    'success'
                )

                //closes the modal
                // $('.close').click();

            }
        })


    }

    return (
        <Fragment>


            {loading ? <Loader /> : (
                <Fragment>
                    <div className='containerz'>
                        <MetaData title={'Offers'} />

                        <h1 id="animals_heading">Offers</h1>
                        <section id="services" className="containerz mt-5">
                            <div className="row" style={{ justifyContent: 'space-between' }}>
                                {requestoffers && requestoffers.map(offer => (

                                    <Offers key={offer._id} offer={offer} setSelectedOffer={setSelectedOffer} />
                                ))}
                            </div>
                        </section>
                    </div>
                    {/* 
                    <h1 id="animals_heading">Latest Animals</h1>
                    <section id="animals" className="container mt-5">
                        <div className="row">
                            {animals && animals.map(animal => (
                                <Animal key={animal._id} animal={animal} />
                            ))}
                        </div>
                    </section> */}

                    {/* {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={animalsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )} */}

                </Fragment>
            )
            }
        </Fragment >
    );
}
export default FreelancerOffers
