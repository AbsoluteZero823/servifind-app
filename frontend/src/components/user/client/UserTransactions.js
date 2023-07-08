import React, { Fragment, useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import MetaData from "../../layout/MetaData";
import CTransaction from "./Transaction";
import FTransaction from "../freelancer/Transaction";
import Loader from "../../layout/Loader";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Swal from "sweetalert2";
import $ from "jquery";

import { newRating } from "../../../actions/ratingActions";
import { newReport } from "../../../actions/reportActions";

import {
  getTransactions,
  clearErrors,
  SingleTransaction,
  PaymentReceived,
  PaymentSent,
  TransactionDone,
  RateDone,
  ReportDone,
} from "../../../actions/transactionActions";


import { UPDATE_PSENT_RESET, UPDATE_TRANSACTIONDONE_RESET } from "../../../constants/transactionConstants";
import { newNotification } from "../../../actions/notificationActions";

import axios from "axios";

import { ChatState } from '../../../Context/ChatProvider';
import socket from '../../../Context/socket';

var selectedChatCompare;

const UserTransactions = () => {
  const { selectedChat, setSelectedChat, notification, setNotification, fetchNotificationAgain, setFetchNotificationAgain } = ChatState();
  const [newMessageReceivedLocal, setNewMessageReceivedLocal] = useState(null);
  const [newInquiryReceivedLocal, setNewInquiryReceivedLocal] = useState(null);
  const [newOfferReceivedLocal, setNewOfferReceivedLocal] = useState(null);
  const [acceptOfferReceivedLocal, setAcceptOfferReceivedLocal] = useState(null);

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, transactions } = useSelector(
    (state) => state.transactions
  );
  const { loadings, detailserror, transaction } = useSelector(
    (state) => state.transactionDetails
  );
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { success: isUpdated, loadingPayment,updatedTransaction } = useSelector(
    (state) => state.updatePayment
  );
  // const [currentPage, setCurrentPage] = useState(1)
  // let { keyword } = useParams();

  const [activeButton, setActiveButton] = useState("first");
  const [activeSlider, setActiveSlider] = useState(1);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => { }, [dispatch, alert]);

  useEffect(() => {
    if (error) {
      alert.success("success");
      return alert.error(error);
    }

    dispatch(getTransactions());
    if (user) {
      console.log(user._id);
    }

    if (isUpdated) {
      console.log('sa UserTransactions.js')
      // console.log("sa Transaction.js")
      socket.emit('work completed', updatedTransaction);
      dispatch({ type: UPDATE_TRANSACTIONDONE_RESET });
      dispatch({ type: UPDATE_PSENT_RESET });
    }
  }, [dispatch, alert, error, loadingPayment, isUpdated]);

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

  const ClientTransactions = transactions.filter(function (ctransaction) {
    if (activeButton === "first") {
      if (ctransaction.inquiry_id) {
        return ctransaction.inquiry_id.customer._id === user._id;
      } else if (ctransaction.offer_id) {
        return ctransaction.offer_id.request_id.requested_by._id === user._id;
      }
    } else if (activeButton === "second") {
      if (ctransaction.inquiry_id) {
        return (
          ctransaction.inquiry_id.customer._id === user._id &&
          ctransaction.status === "processing"
        );
      } else if (ctransaction.offer_id) {
        return (
          ctransaction.offer_id.request_id.requested_by._id === user._id &&
          ctransaction.status === "processing"
        );
      }
    } else if (activeButton === "third") {
      if (ctransaction.inquiry_id) {
        return (
          ctransaction.inquiry_id.customer._id === user._id &&
          ctransaction.paymentSent === "false"
        );
      } else if (ctransaction.offer_id) {
        return (
          ctransaction.offer_id.request_id.requested_by._id === user._id &&
          ctransaction.paymentSent === "false"
        );
      }
    } else if (activeButton === "fourth") {
      if (ctransaction.inquiry_id) {
        return (
          ctransaction.inquiry_id.customer._id === user._id &&
          ctransaction.paymentSent === "true" &&
          ctransaction.transaction_done.freelancer === "true" &&
          ctransaction.status === "processing"
        );
        // return ctransaction.inquiry_id.customer._id === user._id &&  ctransaction.transaction_done.client === 'true' && ctransaction.isRated === 'false';
      } else if (ctransaction.offer_id) {
        return (
          ctransaction.offer_id.request_id.requested_by._id === user._id &&
          ctransaction.paymentSent === "true" &&
          ctransaction.transaction_done.freelancer === "true" &&
          ctransaction.status === "processing"
        );
        // return ctransaction.offer_id.request_id.requested_by === user._id &&  ctransaction.transaction_done.client === 'true' && ctransaction.isRated === 'false';
      }
    } else if (activeButton === "fifth") {
      if (ctransaction.inquiry_id) {
        return (
          ctransaction.inquiry_id.customer._id === user._id &&
          ctransaction.status === "completed"
        );
      } else if (ctransaction.offer_id) {
        return (
          ctransaction.offer_id.request_id.requested_by._id === user._id &&
          ctransaction.status === "completed"
        );
      }
    }

    // return ctransaction.inquiry_id.customer._id === user._id;
    // console.log(ctransaction)
  });

  const FreelancerTransactions = transactions.filter(function (ftransaction) {
    // return ftransaction.inquiry_id.freelancer.user_id._id === user._id;
    if (activeButton === "first") {
      if (ftransaction.inquiry_id) {
        return ftransaction.inquiry_id.freelancer.user_id._id === user._id;
      } else if (ftransaction.offer_id) {
        return ftransaction.offer_id.offered_by._id === user._id;
      }
    } else if (activeButton === "second") {
      if (ftransaction.inquiry_id) {
        return (
          ftransaction.inquiry_id.freelancer.user_id._id === user._id &&
          ftransaction.status === "processing"
        );
      } else if (ftransaction.offer_id) {
        return (
          ftransaction.offer_id.offered_by._id === user._id &&
          ftransaction.status === "processing"
        );
      }
    } else if (activeButton === "third") {
      if (ftransaction.inquiry_id) {
        return (
          ftransaction.inquiry_id.freelancer.user_id._id === user._id &&
          ftransaction.transaction_done.freelancer === "true"
        );
      } else if (ftransaction.offer_id) {
        return (
          ftransaction.offer_id.offered_by._id === user._id &&
          ftransaction.transaction_done.freelancer === "true"
        );
      }
    } else if (activeButton === "paymentsent") {
      if (ftransaction.inquiry_id) {
        return (
          ftransaction.inquiry_id.freelancer.user_id._id === user._id &&
          ftransaction.paymentSent === "true"
        );
      } else if (ftransaction.offer_id) {
        return (
          ftransaction.offer_id.offered_by._id === user._id &&
          ftransaction.paymentSent === "true"
        );
      }
    } else if (activeButton === "fourth") {
      if (ftransaction.inquiry_id) {
        return (
          ftransaction.inquiry_id.freelancer.user_id._id === user._id &&
          ftransaction.paymentSent === "false"
        );
      } else if (ftransaction.offer_id) {
        return (
          ftransaction.offer_id.offered_by._id === user._id &&
          ftransaction.paymentSent === "false"
        );
      }
    } else if (activeButton === "fifth") {
      if (ftransaction.inquiry_id) {
        return (
          ftransaction.inquiry_id.freelancer.user_id._id === user._id &&
          ftransaction.transaction_done.freelancer === "true" &&
          ftransaction.transaction_done.client === "true"
        );
      } else if (ftransaction.offer_id) {
        return (
          ftransaction.offer_id.offered_by._id === user._id &&
          ftransaction.transaction_done.freelancer === "true" &&
          ftransaction.transaction_done.client === "true"
        );
      }
    }

    // return ctransaction.inquiry_id.customer._id === user._id;
    // console.log(ctransaction)
  });

  const clickedButtonHandler = (e) => {
    console.log(e.target);
    const { name } = e.target;
    setActiveButton(name);
    console.log(activeButton);
  };

  const clickedSliderHandler = (e) => {
    // console.log(e.target);
    var checkBox = document.getElementById("myCheck");
    if (checkBox.checked == false) {
      setActiveSlider(1);
      console.log(activeSlider);
      console.log(ClientTransactions);
    } else {
      setActiveSlider(0);
      console.log(activeSlider);
      console.log(FreelancerTransactions);
    }
    // const { value } = e.target;
    // setActiveSlider(1);
    // console.log(activeButton);
  };

  const transactionDetailsHandler = (id) => {
    dispatch(SingleTransaction(id));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const statusData = new FormData();
    statusData.set("paymentSent", "true");
    Swal.fire({
      title: "is Payment Done?",
      text: "If you pay thru Gcash, make sure to send the screenshot of the receipt to the freelancer.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, payment is done",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(PaymentSent(transaction._id, statusData));

        Swal.fire(
          "Payment Sent!",
          "Wait for the freelancer to check your payment",
          "success"
        );
        //closes the modal
        $(".close").click();
      }
    });
  };

  const submitRateHandler = (e) => {
    e.preventDefault();
    const ratingData = new FormData();
    ratingData.set("comment", comment);
    ratingData.set("rating", rating);
    if (transaction.inquiry_id) {
      ratingData.set("service_id", transaction.inquiry_id.service_id._id);
    } else if (transaction.offer_id) {
      ratingData.set("service_id", transaction.offer_id.service_id._id);
    }

    ratingData.set("user", user._id);
    ratingData.set("transaction_id", transaction._id);

    dispatch(RateDone(transaction._id));
    dispatch(newRating(ratingData));

    Swal.fire("Rate Success!", "", "success");
    //closes the modal
    $(".close").click();

    // dispatch(updateProfile(formData))
  };
  const submitReportHandler = (e) => {
    e.preventDefault();
    const reportData = new FormData();

    reportData.set("reason", reason);
    reportData.set("description", description);
    reportData.set("reported_by", user._id);
    reportData.set("transaction_id", transaction._id);
    // if user is the service provider
    if (transaction.inquiry_id &&
      transaction.inquiry_id.freelancer &&
      transaction.inquiry_id.freelancer.user_id &&
      transaction.inquiry_id.freelancer.user_id._id ===
      user._id) {
      reportData.set("user_reported", transaction.inquiry_id.customer._id);
    } else if (
      transaction.offer_id &&
      transaction.offer_id.request_id &&
      transaction.offer_id.offered_by &&
      transaction.offer_id.offered_by._id === user._id
    ) {
      reportData.set("user_reported", transaction.offer_id.request_id.requested_by);
    }


    // if user is the client
    else if (
      transaction.inquiry_id &&
      transaction.inquiry_id.customer &&
      transaction.inquiry_id.customer._id ===
      user._id) {
      console.log('dito1')
      reportData.set("user_reported", transaction.inquiry_id.freelancer.user_id._id);

    }
    else if (
      transaction.offer_id &&
      transaction.offer_id.request_id &&
      transaction.offer_id.request_id.requested_by._id ===
      user._id) {
      console.log('dito2')
      reportData.set("user_reported", transaction.offer_id.offered_by._id);

    }

    const formData = new FormData();
    // if user is the service provider
    if (transaction.inquiry_id &&
      transaction.inquiry_id.freelancer &&
      transaction.inquiry_id.freelancer.user_id &&
      transaction.inquiry_id.freelancer.user_id._id ===
      user._id) {
      formData.set("freelancer", "true");
      formData.set("client", transaction.reportedBy.client);
    } else if (transaction.inquiry_id &&
      transaction.inquiry_id.freelancer &&
      transaction.inquiry_id.freelancer.user_id &&
      transaction.inquiry_id.freelancer.user_id._id ===
      user._id) {
      formData.set("freelancer", "true");
      formData.set("client", transaction.reportedBy.client);
    }


    // if user is the client
    else if (
      transaction.inquiry_id &&
      transaction.inquiry_id.customer &&
      transaction.inquiry_id.customer._id ===
      user._id) {
      // reportData.set("user_reported", transaction.inquiry_id.freelancer._id);
      formData.set("freelancer", transaction.reportedBy.freelancer);
      formData.set("client", "true");
    }
    else if (
      transaction.offer_id &&
      transaction.offer_id.request_id &&
      transaction.offer_id.request_id.request_by ===
      user._id) {
      formData.set("freelancer", transaction.reportedBy.freelancer);
      formData.set("client", "true");
    }

    dispatch(ReportDone(transaction._id, formData));
    dispatch(newReport(reportData));

    Swal.fire("Reported Successfully!", "", "success");
    //closes the modal
    $(".close").click();

    // dispatch(updateProfile(formData))
  };
  const paymentReceivedHandler = (id) => {
    const statusData = new FormData();
    statusData.set("paymentReceived", "true");

    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure this client is paid?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, payment Received",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(PaymentReceived(id, statusData));

        Swal.fire("Payment Received!", "Thank you", "success");
        //closes the modal
        $(".close").click();
      }
    });
  };

  const confirmTransactionHandler = (id, workCompleted) => {
    const formData = new FormData();
    formData.set("freelancer", "true");
    formData.set("client", "true");
    formData.set("workCompleted", workCompleted);

    Swal.fire({
      title: "Transaction is Done?",
      text: "Once you click done, you can't report this user anymore",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(TransactionDone(id, formData));

        Swal.fire("Transaction Done!", "Thank you", "success");
        //closes the modal
        $(".close").click();
      }
    });
  };

  function setUserRatings(id) {
    dispatch(SingleTransaction(id));
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");
            // console.log(this.starValue);
            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }

  return (
    <Fragment>
      {loading || loadingPayment ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Transaction"} />

          {/* <div style={{ float:'right', position:"fixed",     top: '15vh'}}>
                        <label style={{padding:'16px 0px'}}>Freelancer</label>
                        <label className="switch" style={{justifyContent:'center'}}>
                        <input type="checkbox" id='myCheck' onClick={clickedSliderHandler}/>
                        <span className="slider round" ></span>
                        </label>
                    </div> */}

          <div className="firstcontainer">
            <div className="secondcontainer">
              <div className="stickyOne">
                {activeSlider === 1 && (
                  <Fragment>
                    <a
                      name="first"
                      className={
                        activeButton === "first"
                          ? `selection active`
                          : "selection"
                      }
                      onClick={clickedButtonHandler}
                    >
                      All
                    </a>

                    <a
                      name="second"
                      className={
                        activeButton === "second"
                          ? `selection active`
                          : "selection"
                      }
                      onClick={clickedButtonHandler}
                    >
                      On Process
                    </a>

                    <a
                      name="third"
                      className={
                        activeButton === "third"
                          ? `selection active`
                          : "selection"
                      }
                      onClick={clickedButtonHandler}
                    >
                      To Pay
                    </a>
                    <a
                      name="fourth"
                      className={
                        activeButton === "fourth"
                          ? `selection active`
                          : "selection"
                      }
                      onClick={clickedButtonHandler}
                    >
                      To Confirm
                    </a>
                    <a
                      name="fifth"
                      className={
                        activeButton === "fifth"
                          ? `selection active`
                          : "selection"
                      }
                      onClick={clickedButtonHandler}
                    >
                      Completed
                    </a>
                  </Fragment>
                )}
                {activeSlider === 0 && (
                  <Fragment>
                    <a
                      name="first"
                      className={
                        activeButton === "first"
                          ? `selection active`
                          : "selection"
                      }
                      onClick={clickedButtonHandler}
                    >
                      All
                    </a>

                    <a
                      name="second"
                      className={
                        activeButton === "second"
                          ? `selection active`
                          : "selection"
                      }
                      onClick={clickedButtonHandler}
                    >
                      On Process
                    </a>

                    <a
                      name="third"
                      className={
                        activeButton === "third"
                          ? `selection active`
                          : "selection"
                      }
                      onClick={clickedButtonHandler}
                    >
                      Work Done
                    </a>
                    <a
                      name="fourth"
                      className={
                        activeButton === "fourth"
                          ? `selection active`
                          : "selection"
                      }
                      onClick={clickedButtonHandler}
                    >
                      Not Paid
                    </a>
                    <a
                      name="paymentsent"
                      className={
                        activeButton === "paymentsent"
                          ? `selection active`
                          : "selection"
                      }
                      onClick={clickedButtonHandler}
                    >
                      Payment Sent
                    </a>
                    <a
                      name="fifth"
                      className={
                        activeButton === "fifth"
                          ? `selection active`
                          : "selection"
                      }
                      onClick={clickedButtonHandler}
                    >
                      Completed
                    </a>
                    {/* <a
                      name="sixth"
                      className={
                        activeButton === "sixth"
                          ? `selection active`
                          : "selection"
                      }
                      onClick={clickedButtonHandler}
                    >
                      Cancelled
                    </a> */}
                  </Fragment>
                )}
                {user.role === "freelancer" && (
                  <a
                    name=""
                    className={
                      activeSlider === 1 ? `selection` : "selection active"
                    }
                    style={{ borderLeft: "3px solid" }}
                  >
                    Freelancer
                    <label
                      className="switch"
                      style={{ justifyContent: "center", margin: "0px 5px" }}
                    >
                      <input
                        type="checkbox"
                        id="myCheck"
                        onClick={clickedSliderHandler}
                      />
                      <span className="slider round"></span>
                    </label>
                    {/* <div className='inTransDiv'>
                                        <button className='buttonInTransCircle' style={{backgroundColor:'transparent',  color:'gray'}}> <i className="fas fa-question-circle" data-toggle="tooltip" data-placement="bottom" title='Turn on the switch to display Freelancer transactions'></i></button>
                                    </div> */}
                  </a>
                )}
              </div>

              {/* sa mga transaction na */}
              <div>
                {/* dito nagsimula ang isang service */}

                {activeSlider === 1 && ClientTransactions.length == 0 && (
                  <div
                    style={{
                      padding: "12px 24px",
                      background: "#fff",
                      height: "70vh",
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <p>No transaction yet</p>
                  </div>
                )}

                {activeSlider === 1 &&
                  ClientTransactions &&
                  ClientTransactions.map((transaction) => (
                    <CTransaction
                      key={transaction._id}
                      transaction={transaction}
                      rating={rating}
                      setRating={setRating}
                    />
                  ))}

                {activeSlider === 0 &&
                  FreelancerTransactions &&
                  FreelancerTransactions.map((transaction) => (
                    <FTransaction
                      key={transaction._id}
                      transaction={transaction}
                    />
                  ))}
                {/* dito nagtapos ang isang service */}
              </div>
            </div>
          </div>
        </Fragment>
      )}

      {/* REPORT SERVICE MODAL */}
      <Fragment>
        <div className="modal fade" id="ReportServiceModal" tabIndex="-1" role="dialog" aria-labelledby="ReportServiceModalTitle" aria-hidden="true" >
          <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '700px' }}>
            <div className="modal-content" >
              <div className="modal-header">
                <h5 className="modal-title" id="ReportServiceModalTitle">Report User</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <form className="a" onSubmit={submitReportHandler} encType='multipart/form-data' >
                <div className="modal-body">

                  <div style={{ padding: '10px 10px' }}>

                    <label htmlFor="reason">Reason:</label>

                    <select
                      name="reason"
                      id="reason"
                      className='form-control'
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    >
                      <option value="">Select Reason</option>
                      <option value="Missed deadlines">Missed deadlines</option>
                      <option value="Poor work quality">Poor work quality</option>
                      <option value="Plagiarism">Plagiarism</option>
                      <option value="Unprofessional behavior">Unprofessional behavior</option>
                      <option value="Harassment">Harassment</option>
                      <option value="Nudity or sexual content">Nudity or sexual content</option>
                      <option value="Terrorism or violence">Terrorism or violence</option>


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

                    {/* Add proof or evidence here(optional) */}


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
      </Fragment>

      {/* PAYMENT MODAL */}
      <Fragment>
        <div
          className="modal fade"
          id="PaymentDetailsModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="PaymentDetailsModalTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            style={{ maxWidth: "800px" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="PaymentDetailsModalTitle">
                  Payment
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
                {loadings ? (
                  <Loader />
                ) : (
                  <div className="modal-body">
                    {transaction.inquiry_id && !transaction.offer_id && (
                      <div className="row">
                        <div
                          className="sixty"
                          style={{
                            width: "60%",
                            backgroundColor: "transparent",
                            padding: "10px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={
                                transaction.inquiry_id.freelancer.user_id.avatar
                                  .url
                              }
                              // alt={service.user && service.user.name}
                              // key={service._id}
                              // src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                              className="rounded-img-big"
                            />
                          </div>
                          <h4>Amount to pay: 100</h4>
                          {/* <h4>Gcash Name: {transaction.isPaid}</h4> */}

                          <Fragment>
                            <h4>
                              Gcash Name:{" "}
                              {transaction.inquiry_id.freelancer.gcash_name}
                            </h4>
                            <h4>
                              Gcash Number:{" "}
                              {transaction.inquiry_id.freelancer.gcash_num}
                            </h4>
                          </Fragment>
                        </div>
                        <div
                          className="forty"
                          style={{
                            width: "40%",
                            backgroundColor: "transparent",
                            alignContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                            flexWrap: "wrap",
                          }}
                        >
                          <img
                            src={transaction.inquiry_id.freelancer.qrCode.url}
                            style={{
                              height: "500px",
                              width: "300px",
                              border: "5px solid",
                              margin: "10px",
                            }}
                          />

                          <h4>Gcash QR Code</h4>
                        </div>

                        <div
                          className="paymentMethod mtop"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                          }}
                        >
                          <div className="alternativeforLi">
                            <input
                              className="inputCash"
                              type="radio"
                              id="a25"
                              name="amount"
                            />
                            <label className="labelCash" htmlFor="a25">
                              Cash
                            </label>
                          </div>
                          <div className="alternativeforLi">
                            <input
                              className="inputGcash"
                              type="radio"
                              id="a50"
                              name="amount"
                            />
                            <label className="labelGcash" htmlFor="a50">
                              GCash
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                    {transaction.inquiry_id && transaction.offer_id && (
                      <div className="row">
                        <div
                          className="sixty"
                          style={{
                            width: "60%",
                            backgroundColor: "transparent",
                            padding: "10px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={
                                transaction.inquiry_id.freelancer.user_id.avatar
                                  .url
                              }
                              // alt={service.user && service.user.name}
                              // key={service._id}
                              // src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                              className="rounded-img-big"
                            />
                          </div>

                          <h4>Amount to pay: ₱{transaction.price}</h4>
                          {/* <h4>Gcash Name: {transaction.isPaid}</h4> */}

                          <Fragment>
                            <h4>
                              Gcash Name:{" "}
                              {transaction.inquiry_id.freelancer.gcash_name}
                            </h4>
                            <h4>
                              Gcash Number:{" "}
                              {transaction.inquiry_id.freelancer.gcash_num}
                            </h4>
                          </Fragment>
                        </div>
                        <div
                          className="forty"
                          style={{
                            width: "40%",
                            backgroundColor: "transparent",
                            alignContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                            flexWrap: "wrap",
                          }}
                        >
                          <img
                            src={transaction.inquiry_id.freelancer.qrCode.url}
                            style={{
                              height: "500px",
                              width: "300px",
                              border: "5px solid",
                              margin: "10px",
                            }}
                          />

                          <h4>Gcash QR Code</h4>
                        </div>

                        <div
                          className="paymentMethod mtop"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                          }}
                        >
                          <div className="alternativeforLi">
                            <input
                              className="inputCash"
                              type="radio"
                              id="a25"
                              name="amount"
                            />
                            <label className="labelCash" htmlFor="a25">
                              Cash
                            </label>
                          </div>
                          <div className="alternativeforLi">
                            <input
                              className="inputGcash"
                              type="radio"
                              id="a50"
                              name="amount"
                            />
                            <label className="labelGcash" htmlFor="a50">
                              GCash
                            </label>
                          </div>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            border: "2px solid",
                            borderRadius: 10,
                            borderColor: "lightgreen",
                            padding: 10,
                            margin: "20px",
                            textAlign: "center",
                          }}
                        >
                          If you prefer to pay cash, please hand over the
                          payment to the freelancer, before submiting payment
                          here
                        </div>
                      </div>
                    )}

                    {transaction.offer_id && !transaction.inquiry_id && (
                      <div className="row">
                        <div
                          className="sixty"
                          style={{
                            width: "60%",
                            backgroundColor: "transparent",
                            padding: "10px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={
                                transaction.offer_id.service_id.freelancer_id
                                  .user_id.avatar.url
                              }
                              // alt={service.user && service.user.name}
                              // key={service._id}
                              // src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                              className="rounded-img-big"
                            />
                          </div>
                          <h4>Amount to pay: 100</h4>
                          {/* <h4>Gcash Name: {transaction.isPaid}</h4> */}

                          <Fragment>
                            <h4>
                              Gcash Name:{" "}
                              {
                                transaction.offer_id.service_id.freelancer_id
                                  .gcash_name
                              }
                            </h4>
                            <h4>
                              Gcash Number:{" "}
                              {
                                transaction.offer_id.service_id.freelancer_id
                                  .gcash_num
                              }
                            </h4>
                          </Fragment>
                        </div>
                        <div
                          className="forty"
                          style={{
                            width: "40%",
                            backgroundColor: "transparent",
                            alignContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                            flexWrap: "wrap",
                          }}
                        >
                          <img
                            src={
                              transaction.offer_id.service_id.freelancer_id
                                .qrCode.url
                            }
                            style={{
                              height: "250px",
                              width: "250px",
                              border: "5px solid",
                              margin: "10px",
                            }}
                          />

                          <h4>Gcash QR Code</h4>
                        </div>
                        <div
                          className="paymentMethod mtop"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                          }}
                        >
                          <div className="alternativeforLi">
                            <input
                              className="inputCash"
                              type="radio"
                              id="a25"
                              name="amount"
                            />
                            <label className="labelCash" htmlFor="a25">
                              Cash
                            </label>
                          </div>
                          <div className="alternativeforLi">
                            <input
                              className="inputGcash"
                              type="radio"
                              id="a50"
                              name="amount"
                            />
                            <label className="labelGcash" htmlFor="a50">
                              GCash
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Payment Done
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>

      {/* RATE SERVICE MODAL */}
      <Fragment>
        <div
          className="modal fade"
          id="RateServiceModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="RateServiceModalTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            style={{ maxWidth: "800px" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="RateServiceModalTitle">
                  Rate Service
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
                onSubmit={submitRateHandler}
                encType="multipart/form-data"
              >
                <div className="modal-body">
                  <div style={{ padding: "10px 10px" }}>
                    {loadings ? (
                      <Loader />
                    ) : (
                      <div style={{ display: "block" }}>
                        <div>
                          <span>
                            <div style={{ display: "block" }}></div>
                            <div className="imagePriceColumn">
                              <div
                                className="picFrame"
                                style={{
                                  border: "1px solid #e1e1e1",
                                  background: "#e1e1e1",
                                }}
                              >
                                <div style={{ position: "relative" }}>
                                  <div>
                                    <img
                                      src={
                                        transaction.inquiry_id &&
                                        transaction.inquiry_id.service_id.images
                                          .url
                                      }
                                      className="picFrame"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div></div>
                            </div>
                          </span>
                        </div>
                      </div>
                    )}
                    <p>Service Rating: </p>
                    <ul className="stars">
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                    </ul>

                    <label>Comments: </label>
                    <textarea
                      name="comment"
                      id="comment"
                      className="form-control mt-3"
                      style={{ minHeight: "200px" }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
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
  );
};
export default UserTransactions;
