import React, { Fragment, useState, useEffect } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { getMessages, addMessage } from "../../actions/messageActions";
import Loader from "../layout/Loader";
import { Form } from "react-bootstrap";
import { event, type } from "jquery";
import ScrollableChat from "./ScrollableChat";
import $ from "jquery";
import Lottie from "react-lottie";
import animationData from "../../animations/typing.json";
import { newOffer } from "../../actions/offerActions";
import {
  newTransaction,
  updateTransaction,
} from "../../actions/transactionActions";
import {
  NEW_TRANSACTION_RESET,
  UPDATE_TRANSACTION_RESET,
} from "../../constants/transactionConstants";
import {
  NEW_OFFER_RESET,
  UPDATE_OFFER_RESET,
} from "../../constants/offerConstants";
import {
  AcceptOffer,
  SingleOffer,
  updateOffer,
} from "../../actions/offerActions";
import { updateStatus } from "../../actions/inquiryActions";
import { newNotification } from "../../actions/notificationActions";

import moment from "moment/moment";

import io from "socket.io-client";
import Swal from "sweetalert2";

const ENDPOINT = "http://localhost:4002"; //localhost
// const ENDPOINT = "https://servifind-app.onrender.com" //website
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain, offers }) => {

  const [newMessageReceivedLocal, setNewMessageReceivedLocal] = useState(null);
  const dispatch = useDispatch();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { selectedChat, setSelectedChat, notification, setNotification, fetchNotificationAgain, setFetchNotificationAgain } =
    ChatState();
  const { user } = useSelector((state) => state.auth);
  const { offer, success, newOfferLoading } = useSelector(
    (state) => state.addOffer
  );
  const {notification: newNotif} = useSelector((state)=> state.addNotification);
  // const {updateloading} = useSelector(state=>state.updatePayment)

  const { singleoffer, loadings } = useSelector((state) => state.singleOffer);

  //sa update offer
  const { offer: updatedOffer,updateloading, success: isUpdated } = useSelector(
    (state) => state.updateoffer
  );

  //sa updateTransaction
  const { loadingUptTrans, isUpdatedTrans } = useSelector(
    (state) => state.updatetransaction
  );

  const { message } = useSelector((state) => state.addMessage);
  // const { messages, loading } = useSelector(state => state.messages)

  const [expectedDate, setExpectedDate] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [messages, setMessages] = useState([]);
  const [hide, setHide] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState([]);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  // useEffect(() => {
  //   socket = io(ENDPOINT);
  //   socket.emit("setup", user);
  //   socket.on("connected", () => setSocketConnected(true));
  //   socket.on("typing", () => setIsTyping(true));
  //   socket.on("stop typing", () => setIsTyping(false));
  // }, []);
  useEffect(() => {
    let isMounted = true; // Flag to track if component is mounted
    socket = io(ENDPOINT);
    // socket.emit("setup", user);

    socket.on("connected", () => {
      if (isMounted) {
        setSocketConnected(true);
      }
    });

    socket.on("typing", () => {
      if (isMounted) {
        setIsTyping(true);
      }
    });

    socket.on("stop typing", () => {
      if (isMounted) {
        setIsTyping(false);
      }
    });

    return () => {
      isMounted = false; // Set the flag to false when component is unmounted
      socket.disconnect(); // Disconnect the socket connection
    };
  }, []);

  useEffect(() => {
    // console.log(OfferExists);
    if (selectedChat) {
      fetchMessages();
    }


    // setLoading(true)

    // console.log(singleoffer);
    if (singleoffer) {
      setDescription(singleoffer.description);
      setPrice(singleoffer.transaction[0] && singleoffer.transaction[0].price);
      // setExpectedDate(moment(singleoffer.transaction[0].expected_Date).format('YYYY-MM-DD'));
      setExpectedDate(
        moment(
          singleoffer.transaction[0] && singleoffer.transaction[0].expected_Date
        ).format("YYYY-MM-DD")
      );

      // setExpectedDate('2013-01-08');
    }
    // console.log(expectedDate);
    if (success) {
      socket.emit("new offer", offer);
      const formData = new FormData();
      formData.set("offer_id", offer._id);
      formData.set("price", price);
      formData.set("expected_Date", expectedDate);
      formData.set("inquiry_id", selectedChat.inquiry_id._id);
      dispatch(newTransaction(formData));
      setFetchAgain(!fetchAgain);
      $(".close").click();
      Swal.fire("Offer sent Successfully!", "", "success");
      dispatch({ type: NEW_OFFER_RESET });
    }

    if (isUpdated) {
      console.log(updatedOffer)
      socket.emit("accept offer", updatedOffer);
      
      setFetchAgain(!fetchAgain);
      dispatch({ type: UPDATE_OFFER_RESET });
    }

    if (isUpdatedTrans) {
      // setFetchAgain(!fetchAgain);
      if (selectedChat) {
        dispatch({ type: UPDATE_TRANSACTION_RESET });
      }

    }
    // dispatch({type: UPDATE_TRANSACTION_RESET});
    // dispatch({ type: UPDATE_OFFER_RESET });
  }, [
    fetchAgain,
    success,
    loadings,
    dispatch,
    updateloading,
    isUpdated,
    loadingUptTrans,
    isUpdatedTrans,
  ]);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages();

      console.log(OfferExists);
      selectedChatCompare = selectedChat;
      console.log(selectedChat);
    }




    // setLoading(true);



    // const interval = setInterval(() => {
    //     fetchMessages(); // Call the function at regular intervals
    // }, 5000); // Fetch messages every 5 seconds (adjust as needed)

    // return () => {
    //     clearInterval(interval); // Clean up the interval when component unmounts
    // };
  }, [selectedChat]);


  useEffect(() => {
    socket.on('message received', (newMessageReceived) => {
      setNewMessageReceivedLocal(newMessageReceived);
    });

    // Cleanup function
    return () => {
      socket.off('message received');
    };
  }, []);
  console.log(notification, 'waaaah')
  useEffect(() => {
    if (newMessageReceivedLocal && newMessageReceivedLocal !== null) {
      // Execute your code when a new message is received
      console.log('New message received:', newMessageReceivedLocal);

      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageReceivedLocal.chat._id
      ) {
       
        
       
          //dito mo lagay ung add notif

          // const formData = new FormData();
          // // console.log(newMessageReceivedLocal);
    
          // formData.set("type", "message");
          // formData.set("message", `New message from ${newMessageReceivedLocal.sender.name}`);
          // if(newMessageReceivedLocal.sender._id === newMessageReceivedLocal.chat.users[0]._id){
          //   formData.set("user_id", newMessageReceivedLocal.chat.users[1]._id)
          // }
          // else {
          //   formData.set("user_id", newMessageReceivedLocal.chat.users[0]._id)
          // }
          // formData.set("type_id", newMessageReceivedLocal._id)
        
          // dispatch(newNotification(formData))

          addNotif()

          // setNotification(prevNotification => {
          //   const updatedNotification = [newMessageReceived, ...prevNotification];
          //   return updatedNotification.filter((item, index) => {
          //     return (
          //       index === updatedNotification.findIndex(
          //         obj => obj._id === item._id
          //       )
          //     );
          //   });
          // });
          // console.log(newMessageReceived);
      
        //give notification
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
  //NOT WORKING WELL ------------------------------------->
  // useEffect(() => {
  //   if (selectedChat) {

  //     setFetchAgain(!fetchAgain)

  //   }
  // }, [notification]);
  //NOT WORKING WELL <-------------------------------------


  // useEffect(() => {
  //   socket.on('message received', (newMessageReceived) => {
  //     setNewMessageReceivedLocal(newMessageReceived);
  //   });

  //   // Cleanup function
  //   return () => {
  //     socket.off('message received');
  //   };
  // }, []);
  // console.log(notification, 'waaaah')
  // useEffect(() => {
  //   if (newMessageReceivedLocal) {
  //     // Execute your code when a new message is received
  //     console.log('New message received:', newMessageReceivedLocal);

  //     if (
  //       !selectedChatCompare || // if chat is not selected or doesn't match current chat
  //       selectedChatCompare._id !== newMessageReceivedLocal.chat._id
  //     ) {
       
        
       
  //         //dito mo lagay ung add notif

  //         const formData = new FormData();
  //         console.log(newMessageReceivedLocal);
    
  //         formData.set("type", "message");
  //         formData.set("message", `New message from ${newMessageReceivedLocal.sender.name}`);
  //         if(newMessageReceivedLocal.sender._id === newMessageReceivedLocal.chat.users[0]._id){
  //           formData.set("user_id", newMessageReceivedLocal.chat.users[1]._id)
  //         }
  //         else {
  //           formData.set("user_id", newMessageReceivedLocal.chat.users[0]._id)
  //         }
  //         formData.set("type_id", newMessageReceivedLocal._id)
        
  //         dispatch(newNotification(formData))

  //         // setNotification(prevNotification => {
  //         //   const updatedNotification = [newMessageReceived, ...prevNotification];
  //         //   return updatedNotification.filter((item, index) => {
  //         //     return (
  //         //       index === updatedNotification.findIndex(
  //         //         obj => obj._id === item._id
  //         //       )
  //         //     );
  //         //   });
  //         // });
  //         // console.log(newMessageReceived);
      
  //       //give notification
  //     } else {
  //       setFetchAgain(!fetchAgain);
  //       // setMessages([...messages, newMessageReceived]);
  //     }

  //     // Reset the newMessageReceived state
  //     setFetchNotificationAgain(!fetchNotificationAgain);
  //     setNewMessageReceivedLocal(null);
  //   }
  // }, [newMessageReceivedLocal]);
  // useEffect(() => {
  //   socket.on("message received", (newMessageReceived) => {
     
  //   });
  // });
  // useEffect(() => {
  //     socket.on('message received', (newMessageReceived) => {
  //         if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
  //             //give notification
  //         } else {
  //             setMessages([...messages, newMessageReceived]);
  //         }
  //     });
  // })

  const addNotif = async () => {
    console.log("awot")
   
   let userid = ""
    
     if(newMessageReceivedLocal.sender._id === newMessageReceivedLocal.chat.users[0]._id){
       userid = newMessageReceivedLocal.chat.users[1]._id
     }
     else {
      userid = newMessageReceivedLocal.chat.users[0]._id
     }
   
       // event.preventDefault();
   
       try {
         const config = {
           headers: {
             "Content-type": "application/json",
             // Authorization: `Bearer ${user.token}`,
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
         // socket.emit("new message", data.message);
         // setMessages([...messages, data.message]);
   
         // setFetchAgain(!fetchAgain);
       } catch (error) {
         console.log(error);
       }
   
   };

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // setLoading(true);

      const { data } = await axios.get(
        // `/api/v1/messages/${id}`
        `/api/v1/messages/${selectedChat._id}`
        // config
      );
      setMessages(data);
      // console.log(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (event) => {
    const messageData = new FormData();

    messageData.set("content", newMessage);
    messageData.set("chatId", selectedChat._id);
    if (event.key === "Enter" && newMessage) {
      event.preventDefault();
      socket.emit("stop typing", selectedChat._id);

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            // Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/v1/message/new",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data);
        socket.emit("new message", data.message);
        setMessages([...messages, data.message]);

        // setFetchAgain(!fetchAgain);
      } catch (error) {
        console.log(error);
      }
    } else {
      return false;
    }
  };

  const sendMessageViaButton = async (event) => {
    if (newMessage) {
      event.preventDefault();
      socket.emit("stop typing", selectedChat._id);

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            // Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/v1/message/new",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        socket.emit("new message", data.message);
        setMessages([...messages, data.message]);
        // setFetchAgain(!fetchAgain);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const typingHandler = (e) => {
    // console.log(newMessage)
    setNewMessage(e.target.value);

    //Typing Indicator Logic
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const offerData = new FormData();

    offerData.set("service_id", selectedChat.inquiry_id.service_id);
    offerData.set("price", price);
    offerData.set("description", description);
    // offerData.set('offered_by', user._id);
    offerData.set("inquiry_id", selectedChat.inquiry_id._id);

    dispatch(newOffer(offerData));
  };

  const acceptHandler = (id, inquiry_or_offer_id, type) => {
    const statusData = new FormData();
    statusData.set("status", "granted");
    Swal.fire({
      title: "Are you sure?",
      text: "Double check the offer and price",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(AcceptOffer(id));

        if (type === "offer") {
          dispatch(updateOffer(inquiry_or_offer_id, statusData));
        } else if (type === "inquiry") {
          dispatch(updateStatus(inquiry_or_offer_id, statusData));
        }

        Swal.fire(
          "Offer Accepted",
          "Freelancer should start working",
          "success"
        );
        //closes the modal
        $(".close").click();
      }
    });
  };

  const refuseHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      html: `
                <div>
                    <p style="font-size:15;"><a style="color:#3085d6;">Refuse</a> = Refuses the offer, but allowing the freelancer to change offer details </p>
                    <p style="font-size:15;"><a style="color:#d33;">Refuse and Cancel</a> = Refuses the offer, and cancelling the transaction</p>
                    <p style="font-size:15;"><a style="color:#261616;">Close</a> = closing/hiding the modal display</p>
                </div>`,

      icon: "info",
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#261616",
      cancelButtonText: "Close",
      confirmButtonText: "Refuse",
      denyButtonText: "Refuse and Cancel",
      denyButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        const offerData = new FormData();
        offerData.set("offer_status", "cancelled");
        dispatch(updateOffer(OfferExists[0]._id, offerData));

        // dispatch(PaymentSent(transaction._id, statusData));

        Swal.fire("Offer refused", "", "success");
        //closes the modal
        $(".close").click();
      } else if (result.isDenied) {
        const offerData = new FormData();
        offerData.set("offer_status", "cancelled");
        dispatch(updateOffer(OfferExists[0]._id, offerData));
        const transactionData = new FormData();
        transactionData.set("status", "cancelled");
        // transactionData.set('expected_Date', expectedDate);
        dispatch(
          updateTransaction(OfferExists[0].transaction[0]._id, transactionData)
        );

        Swal.fire("Offer Refused and Transaction cancelled", "", "success");
        //closes the modal
        $(".close").click();
      }
    });
  };

  const submitEditHandler = (e) => {
    e.preventDefault();

    // console.log("submit")
    // const offerData = new FormData();

    const offerData = new FormData();

    offerData.set("description", description);
    offerData.set("offer_status", "waiting");
    dispatch(updateOffer(OfferExists[0]._id, offerData));
    const transactionData = new FormData();
    transactionData.set("price", price);
    transactionData.set("expected_Date", expectedDate);
    dispatch(
      updateTransaction(OfferExists[0].transaction[0]._id, transactionData)
    );
    $("#EditOfferModal").hide();
    $(".modal-backdrop").hide();
    Swal.fire("Offer Updated Successfully!", "", "success");
  };

  const singleOfferHandler = (id) => {
    dispatch(SingleOffer(id));
  };

  const OfferExists = offers.filter(function (o) {
    if (selectedChat) {


      if (o.inquiry_id) {
        if (selectedChat.inquiry_id) {
          return o.inquiry_id === selectedChat.inquiry_id._id;
        }
      } else if (o.request_id && selectedChat.offer_id) {
        // console.log("tama naman");
        if (selectedChat.offer_id.request_id) {
          return o.request_id === selectedChat.offer_id.request_id._id;
        }
      }
    }
  });

  return (
    <Fragment>
      {selectedChat ? (
        <Fragment>
          {newOfferLoading ? (
            <Loader />
          ) : (
            <Fragment>
              {selectedChat.users[0]._id === user._id && (
                <div className="chat-header clearfix">
                  <figure
                    className="avatar"
                    style={{ float: "left", outline: "solid rgb(96, 96,96)" }}
                  >
                    <img
                      src={selectedChat.users[1].avatar.url}
                      className="rounded-circle"
                      alt="avatar"
                    />
                  </figure>

                  <div className="chat-about">
                    <div className="chat-with">{selectedChat.users[1].name}</div>
                    {/* <div className="chat-num-messages">already 1 902 messages</div> */}
                  </div>
                  {loading ? (
                    <></>
                  ) : (
                    <Fragment>
                      {!OfferExists[0] &&
                        selectedChat.inquiry_id &&
                        selectedChat.inquiry_id.customer !== user._id && (
                          <button
                            type="button"
                            className="custom-offer"
                            data-toggle="modal"
                            data-target="#CustomOfferModal"
                          >
                            Custom Offer
                          </button>
                        )}
                      {/* {OfferExists[0] && OfferExists[0].inquiry_id === selectedChat.inquiry_id._id && selectedChat.inquiry_id && selectedChat.inquiry_id.customer !== user._id && (
                                <button type="button" className='custom-offer' data-toggle="modal" data-target="#CheckOfferModal">Check Offer</button>
                            )} */}
                    </Fragment>
                  )}

                  {selectedChat.inquiry_id &&
                    OfferExists[0] &&
                    OfferExists[0].inquiry_id === selectedChat.inquiry_id._id && (
                      <Fragment>
                        {OfferExists[0].offer_status === "granted" ? (
                          <button
                            type="button"
                            className="custom-offer"
                            data-toggle="modal"
                            data-target="#CheckOfferModal"
                          >
                            Check Offer
                          </button>
                        ) : (
                          <div style={{ float: "right", paddingTop: 20 }}>
                            <a
                              style={{
                                padding: 10,
                                color: "black",
                                fontWeight: "bold",
                              }}
                              onClick={() => setHide(!hide)}
                            >
                              Offer <i className="fa fa-caret-down"></i>{" "}
                            </a>
                          </div>
                        )}
                      </Fragment>
                    )}

                  {OfferExists[0] &&
                    OfferExists[0].request_id &&
                    OfferExists[0].request_id ===
                    selectedChat.offer_id.request_id._id && (
                      <Fragment>
                        {OfferExists[0].offer_status === "granted" ? (
                          <button
                            type="button"
                            className="custom-offer"
                            data-toggle="modal"
                            data-target="#CheckOfferModal"
                          >
                            Check Offer
                          </button>
                        ) : (
                          <div style={{ float: "right", paddingTop: 20 }}>
                            <a
                              style={{
                                padding: 10,
                                color: "black",
                                fontWeight: "bold",
                              }}
                              onClick={() => setHide(!hide)}
                            >
                              Offer <i className="fa fa-caret-down"></i>{" "}
                            </a>
                          </div>
                        )}
                      </Fragment>
                    )}

                  {/* <i className="fa fa-star"></i> */}
                </div>
              )}

              {selectedChat.users[1]._id === user._id && (
                <div className="chat-header clearfix">
                  <figure
                    className="avatar"
                    style={{ float: "left", outline: "solid rgb(96, 96,96)" }}
                  >
                    <img
                      src={selectedChat.users[0].avatar.url}
                      className="rounded-circle"
                      alt="avatar"
                    />
                  </figure>

                  <div className="chat-about">
                    <div className="chat-with">{selectedChat.users[0].name}</div>
                    {/* <div className="chat-num-messages">already 1 902 messages</div> */}
                  </div>

                  {loading ? (
                    <></>
                  ) : (
                    <Fragment>
                      {!OfferExists[0] &&
                        selectedChat.inquiry_id &&
                        selectedChat.inquiry_id.customer !== user._id && (
                          <button
                            type="button"
                            className="custom-offer"
                            data-toggle="modal"
                            data-target="#CustomOfferModal"
                          >
                            Custom Offer
                          </button>
                        )}
                      {/* {!OfferExists[0] && selectedChat.offer_id && selectedChat.offer_id.request_id.requested_by !== user._id && (
                                    <button type="button" className='custom-offer' data-toggle="modal" data-target="#CustomOfferModal">Custom Offer</button>
                                )} */}
                      {OfferExists[0] && (
                        <Fragment>
                          {OfferExists[0] &&
                            OfferExists[0].offer_status === "granted" ? (
                            <button
                              type="button"
                              className="custom-offer"
                              data-toggle="modal"
                              data-target="#CheckOfferModal"
                            >
                              Check Offer
                            </button>
                          ) : (
                            <div style={{ float: "right", paddingTop: 20 }}>
                              <a
                                style={{
                                  padding: 10,
                                  color: "black",
                                  fontWeight: "bold",
                                }}
                                onClick={() => setHide(!hide)}
                              >
                                Offer <i className="fa fa-caret-down"></i>{" "}
                              </a>
                            </div>
                          )}
                        </Fragment>
                      )}

                      {/* {OfferExists[0] && OfferExists[0].inquiry_id === selectedChat.inquiry_id._id && selectedChat.inquiry_id && selectedChat.inquiry_id.customer !== user._id && (
                                    <button type="button" className='custom-offer' data-toggle="modal" data-target="#CheckOfferModal">Check Offer</button>
                                )} */}
                    </Fragment>
                  )}

                  {/* <i className="fa fa-star"> Custom Offer</i> */}
                </div>
              )}
              {/* <!-- end chat-header --> */}

              {/* SA CUSTOMER */}

              {/* {selectedChat.inquiry_id && selectedChat.inquiry_id.customer === user._id && OfferExists[0] && OfferExists[0].inquiry_id === selectedChat.inquiry_id._id && ( */}
              {OfferExists[0] &&
                selectedChat.offer_id &&
                selectedChat.offer_id.request_id &&
                selectedChat.offer_id.request_id.requested_by === user._id && (
                  <Fragment>
                    {OfferExists[0].offer_status === "waiting" && !hide && (
                      <div
                        style={{
                          backgroundColor: "white",
                          position: "absolute",
                          width: "58vw",
                          height: "15vh",
                          alignItems: "center",
                          display: "flex",
                          padding: "20px",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <i
                              className="fas fa-tag"
                              style={{
                                fontSize: "50px",
                                width: "50px",
                                height: "50px",
                                margin: "20px",
                              }}
                            ></i>
                            <div style={{ width: "80%" }}>
                              <p style={{ padding: '10px' }}>Freelancer made an offer with the price at ₱{OfferExists[0].transaction[0].price} that supposed to be done on {moment(OfferExists[0].transaction[0].expected_Date).format('MMM/DD/yy')}, would you like to proceed?</p>
                              {/* <p style={{ padding: '10px' }}>Description: {OfferExists[0].description}</p> */}
                            </div>
                          </div>
                          <p
                            style={{
                              padding: "10px",
                              marginLeft: "90px",
                              width: "80%",
                            }}
                          >
                            Job Description: {OfferExists[0].description}
                          </p>
                        </div>
                        {/* buttons */}

                        <div style={{ float: "right" }}>
                          <a
                            style={{
                              padding: 10,
                              color: "purple",
                              fontWeight: "bold",
                            }}
                            onClick={() =>
                              acceptHandler(
                                OfferExists[0]._id,
                                OfferExists[0].request_id,
                                "request"
                              )
                            }
                          >
                            Accept
                          </a>
                          <a
                            style={{
                              padding: 10,
                              color: "purple",
                              fontWeight: "bold",
                            }}
                            onClick={() => refuseHandler(OfferExists[0]._id)}
                          >
                            Refuse
                          </a>
                          {/* <a style={{ padding: 10, color: 'teal', fontWeight: 'bold' }} data-toggle="modal" data-target='#CheckOfferModal'>Check Details</a> */}
                          {/* <a style={{ padding: 10, color: 'purple', fontWeight: 'bold' }} >Hide</a> */}
                        </div>
                      </div>
                    )}
                  </Fragment>
                )}

              {/* CUSTOMER THROUGH INQUIRY */}
              {OfferExists[0] &&
                selectedChat.inquiry_id &&
                selectedChat.inquiry_id.customer === user._id && (
                  <Fragment>
                    {OfferExists[0].offer_status === "waiting" && !hide && (
                      <div
                        style={{
                          backgroundColor: "white",
                          position: "absolute",
                          width: "58vw",
                          height: "15vh",
                          alignItems: "center",
                          display: "flex",
                          padding: "20px",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <i
                              className="fas fa-tag"
                              style={{
                                fontSize: "50px",
                                width: "50px",
                                height: "50px",
                                margin: "20px",
                              }}
                            ></i>
                            <div style={{ width: "80%" }}>
                              <p style={{ padding: '10px' }}>Freelancer made an offer with the price at ₱{OfferExists[0].transaction[0].price} that supposed to be done on {moment(OfferExists[0].transaction[0].expected_Date).format('MMM/DD/yy')}, would you like to proceed?</p>
                              {/* <p style={{ padding: '10px' }}>Description: {OfferExists[0].description}</p> */}
                            </div>
                          </div>
                          <p
                            style={{
                              padding: "10px",
                              marginLeft: "90px",
                              width: "80%",
                            }}
                          >
                            Job Description: {OfferExists[0].description}
                          </p>
                        </div>
                        {/* buttons */}

                        <div style={{ float: "right" }}>
                          <a
                            style={{
                              padding: 10,
                              color: "purple",
                              fontWeight: "bold",
                            }}
                            onClick={() =>
                              acceptHandler(
                                OfferExists[0]._id,
                                OfferExists[0].inquiry_id,
                                "inquiry"
                              )
                            }
                          >
                            Accept
                          </a>
                          <a
                            style={{
                              padding: 10,
                              color: "purple",
                              fontWeight: "bold",
                            }}
                            onClick={() => refuseHandler(OfferExists[0]._id)}
                          >
                            Refuse
                          </a>
                          {/* <a style={{ padding: 10, color: 'teal', fontWeight: 'bold' }} data-toggle="modal" data-target='#CheckOfferModal'>Check Details</a> */}
                          {/* <a style={{ padding: 10, color: 'purple', fontWeight: 'bold' }} >Hide</a> */}
                        </div>
                      </div>
                    )}
                  </Fragment>
                )}
              {/* CUSTOMER THROUGH INQUIRY END */}
              {/* SA FREELANCER */}
              {/* {!loadingUptTrans ? (
                <Fragment> */}
              {/* {OfferExists[0] && OfferExists[0].inquiry_id === selectedChat.inquiry_id._id && selectedChat.inquiry_id && selectedChat.inquiry_id.customer !== user._id && ( */}
              {OfferExists[0] &&
                selectedChat.inquiry_id &&
                selectedChat.inquiry_id.customer !== user._id && (
                  <Fragment>
                    {(OfferExists[0].offer_status === "waiting" ||
                      OfferExists[0].offer_status === "cancelled") &&
                      !hide && (
                        <div
                          style={{
                            backgroundColor: "white",
                            position: "absolute",
                            width: "58vw",
                            height: "15vh",
                            alignItems: "center",
                            display: "flex",
                            padding: "20px",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <i
                                className="fas fa-tag"
                                style={{
                                  fontSize: "50px",
                                  width: "50px",
                                  height: "50px",
                                  margin: "20px",
                                }}
                              ></i>
                              <div style={{ width: "80%" }}>
                                <Fragment>
                                  {OfferExists[0].offer_status === "waiting" && (
                                    <p style={{ padding: "10px" }}>
                                      Your offer with the price of ₱
                                      {OfferExists[0].transaction[0] &&
                                        OfferExists[0].transaction[0].price}{" "}
                                      that supposed to be done on{" "}
                                      {moment(
                                        OfferExists[0].transaction[0] &&
                                        OfferExists[0].transaction[0]
                                          .expected_Date
                                      ).format("MMM/DD/yy")}{" "}
                                      is currently waiting
                                    </p>
                                  )}
                                  {OfferExists[0].offer_status === "cancelled" && (
                                    <p style={{ padding: "10px" }}>
                                      Your offer with the price of ₱
                                      {OfferExists[0].transaction[0] &&
                                        OfferExists[0].transaction[0].price}{" "}
                                      that supposed to be done on{" "}
                                      {moment(
                                        OfferExists[0].transaction[0] &&
                                        OfferExists[0].transaction[0]
                                          .expected_Date
                                      ).format("MMM/DD/yy")}{" "}
                                      is currently cancelled
                                    </p>
                                  )}
                                </Fragment>

                                {/* <p style={{ padding: '10px' }}>Description: {OfferExists[0].description}</p> */}
                              </div>
                            </div>
                            <p
                              style={{
                                padding: "10px",
                                marginLeft: "90px",
                                width: "80%",
                              }}
                            >
                              Job Description: {OfferExists[0].description}
                            </p>
                          </div>
                          {/* buttons */}

                          <div style={{ float: "right" }}>
                            {OfferExists[0].offer_status === "cancelled" && (
                              <a
                                style={{
                                  padding: 10,
                                  color: "purple",
                                  fontWeight: "bold",
                                }}
                                data-toggle="modal"
                                data-target="#EditOfferModal"
                                onClick={() =>
                                  singleOfferHandler(OfferExists[0]._id)
                                }
                              >
                                Edit
                              </a>
                            )}
                            {/* <a style={{ padding: 10, color: 'purple', fontWeight: 'bold' }} onClick={() => refuseHandler(OfferExists[0]._id)}>Refuse</a> */}
                            {/* <a style={{ padding: 10, color: 'teal', fontWeight: 'bold' }} data-toggle="modal" data-target='#CheckOfferModal'>Check Details</a> */}
                            {/* <a style={{ padding: 10, color: 'purple', fontWeight: 'bold' }} >Hide</a> */}
                          </div>
                        </div>
                      )}
                  </Fragment>
                )}

              {/* FREELANCER THROUGH REQUEST */}
              {OfferExists[0] &&
                selectedChat.offer_id &&
                selectedChat.offer_id.request_id &&
                selectedChat.offer_id.request_id.requested_by !== user._id && (
                  <Fragment>
                    {(OfferExists[0].offer_status === "waiting" ||
                      OfferExists[0].offer_status === "cancelled") &&
                      !hide && (
                        <div
                          style={{
                            backgroundColor: "white",
                            position: "absolute",
                            width: "58vw",
                            height: "15vh",
                            alignItems: "center",
                            display: "flex",
                            padding: "20px",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <i
                                className="fas fa-tag"
                                style={{
                                  fontSize: "50px",
                                  width: "50px",
                                  height: "50px",
                                  margin: "20px",
                                }}
                              ></i>
                              <div style={{ width: "80%" }}>
                                <Fragment>
                                  {OfferExists[0].offer_status === "waiting" && (
                                    <p style={{ padding: "10px" }}>
                                      Your offer with the price of ₱
                                      {OfferExists[0].transaction[0] &&
                                        OfferExists[0].transaction[0].price}{" "}
                                      that supposed to be done on{" "}
                                      {moment(
                                        OfferExists[0].transaction[0] &&
                                        OfferExists[0].transaction[0]
                                          .expected_Date
                                      ).format("MMM/DD/yy")}{" "}
                                      is currently waiting
                                    </p>
                                  )}
                                  {OfferExists[0].offer_status === "cancelled" && (
                                    <p style={{ padding: "10px" }}>
                                      Your offer with the price of ₱
                                      {OfferExists[0].transaction[0] &&
                                        OfferExists[0].transaction[0].price}{" "}
                                      that supposed to be done on{" "}
                                      {moment(
                                        OfferExists[0].transaction[0] &&
                                        OfferExists[0].transaction[0]
                                          .expected_Date
                                      ).format("MMM/DD/yy")}{" "}
                                      is currently cancelled
                                    </p>
                                  )}
                                </Fragment>

                                {/* <p style={{ padding: '10px' }}>Description: {OfferExists[0].description}</p> */}
                              </div>
                            </div>
                            <p
                              style={{
                                padding: "10px",
                                marginLeft: "90px",
                                width: "80%",
                              }}
                            >
                              Job Description: {OfferExists[0].description}
                            </p>
                          </div>
                          {/* buttons */}

                          <div style={{ float: "right" }}>
                            {OfferExists[0].offer_status === "cancelled" && (
                              <a
                                style={{
                                  padding: 10,
                                  color: "purple",
                                  fontWeight: "bold",
                                }}
                                data-toggle="modal"
                                data-target="#EditOfferModal"
                                onClick={() =>
                                  singleOfferHandler(OfferExists[0]._id)
                                }
                              >
                                Edit
                              </a>
                            )}
                            {/* <a style={{ padding: 10, color: 'purple', fontWeight: 'bold' }} onClick={() => refuseHandler(OfferExists[0]._id)}>Refuse</a> */}
                            {/* <a style={{ padding: 10, color: 'teal', fontWeight: 'bold' }} data-toggle="modal" data-target='#CheckOfferModal'>Check Details</a> */}
                            {/* <a style={{ padding: 10, color: 'purple', fontWeight: 'bold' }} >Hide</a> */}
                          </div>
                        </div>
                      )}
                  </Fragment>
                )}
              {/* FREELANCER THROUGH REQUEST END */}
              {/* </Fragment>
            ) : <Loader />} */}

              <div className="chat-history">
                {loading ? (
                  <Loader />
                ) : (
                  <Fragment>
                    {messages ? (
                      <div>
                        <ScrollableChat messages={messages} />
                      </div>
                    ) : (
                      <Loader />
                    )}
                  </Fragment>
                )}
                {istyping ? (
                  <div>
                    <Lottie
                      options={defaultOptions}
                      width={70}
                      style={{ marginBottom: 15, marginLeft: 0 }}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {/* <!-- end chat-history --> */}

              <div className="chat-message clearfix" style={{ display: "flex" }}>
                <form
                  onKeyDown={sendMessage}
                  onSubmit={sendMessageViaButton}
                  style={{ width: "100%", display: "flex" }}
                >
                  <input
                    placeholder="Type your message"
                    rows="3"
                    onChange={typingHandler}
                    value={newMessage}
                  ></input>
                  {/* <i className="fa fa-file-o"></i>  */}
                  &nbsp;&nbsp;&nbsp;
                  {/* <i className="fa fa-file-image-o"></i> */}
                  <button type="submit">Send</button>
                </form>
              </div>
            </Fragment>
          )}

          {/* CUSTOM OFFER MODAL */}
          <Fragment>
            <div
              className="modal fade"
              id="CustomOfferModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="CustomOfferModalTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
                style={{ maxWidth: "800px" }}
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="CustomOfferModalTitle">
                      Custom Offer
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form
                    className="a"
                    onSubmit={submitHandler}
                    encType="multipart/form-data"
                  >
                    {/* {loadings ? <Loader /> : ( */}
                    <div className="modal-body">
                      <div className="form-group">
                        <label>Description: </label>
                        <textarea
                          name="description"
                          id="description"
                          className="form-control mt-3"
                          style={{ minHeight: "200px" }}
                          placeholder="what you should do?"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>

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

                      <div className="form-group">
                        <label htmlFor="stock_field">Expected Date Finished</label>
                        <input
                          type="date"
                          id="stock_field"
                          className="form-control"
                          value={expectedDate}
                          onChange={(e) => setExpectedDate(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* )} */}
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Fragment>

          {/* CHECK OFFER MODAL */}
          <Fragment>
            <div
              className="modal fade"
              id="CheckOfferModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="CheckOfferModalTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
                style={{ maxWidth: "800px" }}
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="CheckOfferModalTitle">
                      Freelancer Offer
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  {/* {loadings ? <Loader /> : ( */}
                  <div className="modal-body">
                    {/* <div className='center'>
                                    <figure className='profile-pic mr-3 item-rtl'>
                                        <img
                                            src={user.avatar.url}
                                            className='rounded-circle'
                                            id='profile-pic'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div> */}

                    <h5 style={{ color: "red" }}>Offer Details</h5>
                    <div className="room">
                      {OfferExists[0] && OfferExists[0].transaction[0] && (
                        <div className="contents">
                          <label htmlFor="email_field">
                            Description: {OfferExists[0].description}
                          </label>
                          <label htmlFor="email_field">
                            Price: ₱{OfferExists[0].transaction[0].price}
                          </label>
                          <label htmlFor="email_field">
                            Expected Date to be Finished:{" "}
                            {moment(
                              OfferExists[0].transaction[0].expected_Date
                            ).format("MMM/DD/yy")}
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                  {OfferExists[0] &&
                    OfferExists[0].transaction[0] &&
                    OfferExists[0].transaction[0].status === "completed" ? (
                    <div
                      style={{
                        minWidth: 50,
                        border: "2px solid",
                        borderRadius: 10,
                        borderColor: "lightgreen",
                        padding: 10,
                        margin: "20px",
                      }}
                    >
                      Transaction Completed
                    </div>
                  ) : (
                    <div
                      style={{
                        minWidth: 50,
                        border: "2px solid",
                        borderRadius: 10,
                        borderColor: "lightgreen",
                        padding: 10,
                        margin: "20px",
                      }}
                    >
                      {OfferExists[0] &&
                        OfferExists[0].transaction[0] &&
                        OfferExists[0].offered_by._id === user._id
                        ? " You should start working now"
                        : "Freelancer should start working now"}
                    </div>
                  )}
                  {/* <Fragment> */}

                  {/* </Fragment> */}
                  {/* )} */}
                  <div className="modal-footer">
                    {/* <Link to={'/my/transactions'} className='btn-primary'><button>Transaction Page</button></Link> */}
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    {/* <button type="submit" className="btn btn-danger" >Refuse</button>
                                <button type="submit" className="btn btn-success" >Accept</button> */}
                  </div>
                </div>
              </div>
            </div>
          </Fragment>

          {/* EDIT OFFER MODAL */}
          <Fragment>
            <div
              className="modal fade"
              id="EditOfferModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="EditOfferModalTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
                style={{ maxWidth: "800px" }}
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="EditOfferModalTitle">
                      Edit Offer
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form
                    className="a"
                    onSubmit={submitEditHandler}
                    encType="multipart/form-data"
                  >
                    <div className="modal-body">
                      {loadings ? (
                        <Loader />
                      ) : (
                        <Fragment>
                          <div className="form-group">
                            <label>Description: </label>
                            <textarea
                              name="description"
                              id="description"
                              className="form-control mt-3"
                              style={{ minHeight: "200px" }}
                              placeholder="what you should do?"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </div>

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

                          <div className="form-group">
                            <label htmlFor="stock_field">
                              Expected Date Finished
                            </label>
                            <input
                              type="date"
                              id="stock_field"
                              className="form-control"
                              value={expectedDate}
                              onChange={(e) => setExpectedDate(e.target.value)}
                            />
                          </div>
                        </Fragment>
                      )}
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Fragment>

        </Fragment>
      ) : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: 'xx-large' }}>Click on a user to start chatting</div>

      }
    </Fragment>
  );
};

export default SingleChat;
