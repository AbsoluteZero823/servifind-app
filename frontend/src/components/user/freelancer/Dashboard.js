import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import $ from "jquery";

import Loader from "../../layout/Loader";
import MetaData from "../../layout/MetaData";
import moment from "moment/moment";

import { ChatState } from "../../../Context/ChatProvider";
import axios from "axios";
import socket from "../../../Context/socket";

import {
  availabilityUpdate,
  completeFreelancerSetup,
} from "../../../actions/freelancerActions";
import { getTransactions } from "../../../actions/transactionActions";
import { getFreelancerServices } from "../../../actions/serviceActions";
import { getDashboardCounts } from "../../../actions/transactionActions";
import { loadUser } from "../../../actions/userActions";

import {
  AVAILABILITY_UPDATE_RESET,
  FREELANCER_SETUP_RESET,
} from "../../../constants/freelancerConstants";

var selectedChatCompare;

const Dashboard = () => {

  const [newMessageReceivedLocal, setNewMessageReceivedLocal] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const { isUpdated, loading: updateLoading } = useSelector(
    (state) => state.updateFreelancer
  );
  const { services, loading: servicesLoading } = useSelector(
    (state) => state.freelancerServices
  );
  const {
    loading: transactionLoading,
    error,
    transactions,
  } = useSelector((state) => state.transactions);

  const { selectedChat, setSelectedChat, notification, setNotification, fetchNotificationAgain, setFetchNotificationAgain } = ChatState();

  const { success, result } = useSelector(state => state.dashboardInfo);

  const dispatch = useDispatch();

  const [activeSlider, setActiveSlider] = useState(0);
  const [gcash_name, setGcashName] = useState("");
  const [gcash_num, setGcashNum] = useState("");
  const [qrCodeName, setQRCodeName] = useState("");
  const [qrCode, setQRCode] = useState("");
  const [qrCodePreview, setQrCodePreview] = useState(
    "/images/default_avatar.jpg"
  );
  // const [loading, setLoading] = useState(false)

  useEffect(() => {
    socket.on('message received', (newMessageReceived) => {
      setNewMessageReceivedLocal(newMessageReceived);
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




  // const addAcceptedOfferNotif = async () => {

  //   try {
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //         // Authorization: `Bearer ${user.token}`,
  //       },
  //     };

  //     const { data } = await axios.post(
  //       "/api/v1/notification/new",
  //       {
  //         type: "accept_offer",
  //         message: (acceptOfferReceivedLocal.request_id)
  //           ? `${acceptOfferReceivedLocal.request_id.requested_by.name} accepted your offer`
  //           : `${acceptOfferReceivedLocal.inquiry_id.customer.name} accepted your offer`,
  //         type_id: acceptOfferReceivedLocal._id,
  //         user_id: acceptOfferReceivedLocal.offered_by
  //       },
  //       config
  //     );
  //     console.log(data, "ito yon kens");
  //     // socket.emit("new message", data.message);
  //     // setMessages([...messages, data.message]);

  //     // setFetchAgain(!fetchAgain);
  //   } catch (error) {
  //     console.log(error);
  //   }

  // };



  const addMessageNotif = async () => {
    console.log("awot")

    let userid = ""

    if (newMessageReceivedLocal.sender._id === newMessageReceivedLocal.chat.users[0]._id) {
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

  useEffect(() => {
    if (user.freelancer_id.availability === true) {
      console.log("available");
      $("#myCheck").prop("checked", true);
      setActiveSlider(0);
    } else {
      console.log("else");
      $("#myCheck").prop("checked", false);
      setActiveSlider(1);
    }
  }, []);



  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getDashboardCounts())
    if (user) {
      dispatch(getFreelancerServices(user.freelancer_id._id));
    }

    if (isUpdated) {
      dispatch(loadUser());
      Swal.fire("Success", "Update Successfully", "success");
      $(".modal-backdrop").hide();
      $("#setupModal").hide();
      dispatch({ type: AVAILABILITY_UPDATE_RESET });
      dispatch({ type: FREELANCER_SETUP_RESET });
      // setLoading(false)
    }

    if (user.freelancer_id.gcash_name) {
      setGcashName(user.freelancer_id.gcash_name);
      setGcashNum(user.freelancer_id.gcash_num);
      setQrCodePreview(user.freelancer_id.qrCode.url);
    }
  }, [dispatch, isUpdated]);

  const ClientTransactions = transactions.filter(function (ctransaction) {
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
  });
  const ProcessingTransactions = transactions.filter(function (transaction) {
    if (transaction.inquiry_id) {
      if (transaction.inquiry_id.freelancer.user_id._id === user._id) {
        return transaction.status === "processing";
      } else if (transaction.inquiry_id.customer._id === user._id) {
        return transaction.status === "processing";
      }
    } else if (transaction.offer_id) {
      if (transaction.offer_id.offered_by._id === user._id) {
        return transaction.status === "processing";
      } else if (
        transaction.offer_id.request_id.requested_by._id === user._id
      ) {
        return transaction.status === "processing";
      }
    }
  });

  const OnChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setQRCode(reader.result);
        setQrCodePreview(reader.result);
        setQRCodeName(e.target.files[0].name);
        // console.log(avatarName)
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const freelancerData = new FormData();
    freelancerData.set("gcash_name", gcash_name);
    freelancerData.set("gcash_num", gcash_num);
    freelancerData.set("qrCode", qrCode);

    dispatch(completeFreelancerSetup(freelancerData));
    $(".close").click();
    // setLoading(true);
    //     dispatch(updateUser(user._id, formData))
  };

  const submitEditHandler = (e) => {
    e.preventDefault();

    const freelancerData = new FormData();
    freelancerData.set("gcash_name", gcash_name);
    freelancerData.set("gcash_num", gcash_num);
    freelancerData.set("qrCode", qrCode);

    dispatch(completeFreelancerSetup(freelancerData));
    $(".close").click();
    // setLoading(true);
    //     dispatch(updateUser(user._id, formData))
  };
  const clickedSliderHandler = (e) => {
    // console.log(e.target);
    var checkBox = document.getElementById("myCheck");
    if (checkBox.checked === false) {
      Swal.fire({
        title: "Are you Sure?",
        text: "Accepting this Application will make this student acquire a freelancer role.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Approve",
      }).then((result) => {
        if (result.isConfirmed) {
          // dispatch(approveApplication(id))
          setActiveSlider(1);
          console.log(activeSlider);
          $("#myCheck").prop("checked", false);
          dispatch(availabilityUpdate());
          Swal.fire("Success", 'Status set to "not available"', "success");
          //closes the modal
          // $('.close').click();
        } else {
          $("#myCheck").prop("checked", true);
        }
      });
    } else {
      Swal.fire({
        title: "Are you Sure?",
        text: "Accepting this Application will make this student acquire a freelancer role.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Approve",
      }).then((result) => {
        if (result.isConfirmed) {
          const freelancerData = new FormData();

          setActiveSlider(0);
          console.log(activeSlider);
          $("#myCheck").prop("checked", true);
          dispatch(availabilityUpdate());
          Swal.fire("Success", 'Status set to "available"', "success");
          //closes the modal
        } else {
          $("#myCheck").prop("checked", false);
        }
      });

      // console.log(FreelancerTransactions)
    }

    // const { value } = e.target;
    // setActiveSlider(1);
    // console.log(activeButton);
  };

  const notSetupSliderHandler = (e) => {
    // console.log(e.target);
    // var checkBox = document.getElementById("myCheck");
    Swal.fire(
      "Warning",
      'Please Complete your payment details first. Click "Complete Setup" button to setup your Payment Details',
      "info"
    );

    // Swal.fire({
    //     title: 'Warning?',
    //     text: 'Please Complete your payment details first. Click "Complete Setup" button to setup your Payment Details',
    //     icon: 'info',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Approve'
    // })

    // const { value } = e.target;
    // setActiveSlider(1);
    // console.log(activeButton);
  };
  return (
    <Fragment>
      <div className="containerDashboardFull">
        <MetaData title={"Freelancer Dashboard"} />
        {updateLoading ? (
          <Loader />
        ) : (
          <div className="dashboard">
            <div className="dashboardContent">
              {user &&
                user.freelancer_id &&
                user.freelancer_id.isPremium === false && (
                  <div className="premiumCard">
                    <div className="content">
                      <h1>Go Premium</h1>
                      <p>
                        Post more Services and Earn more with lifetime
                        mermbership
                      </p>
                      <Link to="/premium">
                        <button className="premiumBtn">
                          <span>Connect Now</span>{" "}
                        </button>
                      </Link>
                    </div>
                    <div className="picContainer">
                      <img className="pic" src="../images/8-03.png" />
                    </div>
                  </div>
                )}
              <div className="charts">
                <div
                  className="smallCardContainer"
                  style={{ marginRight: "10px" }}
                >
                  <h5>My Job Post & Inquiries (Client)</h5>
                  <div className="smallCard">
                    <div
                      className="smallCard-section"
                      style={{
                        borderRight: "2px solid rgba(0, 0, 0, .09)",
                        backgroundColor: "lightblue",
                        borderRadius: "10px 0px 0px 10px",
                      }}
                    >
                      <div className="count">{result.request}</div>
                      <div className="countLabel">Job Posts</div>
                    </div>
                    <div
                      className="smallCard-section"
                      style={{
                        borderRight: "2px solid rgba(0, 0, 0, .09)",
                        backgroundColor: "lightgreen",
                      }}
                    >
                      <div className="count">{result.inquiries}</div>
                      <div className="countLabel">Inquiries</div>
                    </div>
                    <div
                      className="smallCard-section"
                      style={{
                        backgroundColor: "lightgoldenrodyellow",
                        borderRadius: "0px 10px 10px 0px",
                      }}
                    >
                      <div className="count">{result.totalInquiriesAndRequest}</div>
                      <div className="countLabel">Total</div>
                    </div>
                  </div>
                </div>
                <div
                  className="smallCardContainer"
                  style={{ marginLeft: "10px" }}
                >
                  <h5>My Projects (Freelancer)</h5>
                  <div className="smallCard">
                    <div
                      className="smallCard-section"
                      style={{
                        borderRight: "2px solid rgba(0, 0, 0, .09)",
                        backgroundColor: "lightblue",
                        borderRadius: "10px 0px 0px 10px",
                      }}
                    >
                      <div className="count">{result.total}</div>
                      <div className="countLabel">All</div>
                    </div>
                    <div
                      className="smallCard-section"
                      style={{
                        borderRight: "2px solid rgba(0, 0, 0, .09)",
                        backgroundColor: "lightgreen",
                      }}
                    >
                      <div className="count">{result.completed}</div>
                      <div className="countLabel">Completed</div>
                    </div>
                    <div
                      className="smallCard-section"
                      style={{
                        backgroundColor: "lightgoldenrodyellow",
                        borderRadius: "0px 10px 10px 0px",
                      }}
                    >
                      <div className="count">{result.processing}</div>
                      <div className="countLabel">Pending</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="runningCourses">
                <div></div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {/* <h4 style={{ fontWeight: 'bold', marginTop: "20px" }}>My Services</h4> */}
                  <h5 style={{ paddingBottom: "10px" }}>
                    Ongoing Transactions
                  </h5>
                  <Link to={`/my/transactions`} style={{ marginTop: "20px" }}>
                    <span>see all</span>
                  </Link>
                </div>
                <div className="bigCardContainer">
                  {transactionLoading ? (
                    <Loader />
                  ) : (
                    <Fragment>
                      {ProcessingTransactions &&
                        ProcessingTransactions.map((transaction) => (
                          // <CTransaction key={transaction._id} transaction={transaction} rating={rating} setRating={setRating} />
                          <div
                            className="wideCard"
                            style={{
                              height: "100px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: 20,
                            }}
                            key={transaction._id}
                          >
                            <div style={{ textAlign: "center" }}>
                              {(transaction.inquiry_id &&
                                transaction.inquiry_id.freelancer.user_id
                                  ._id === user._id) ||
                                transaction.offer_id.offered_by._id === user._id
                                ? "Freelancer"
                                : "Client"}
                              <br></br> Mode
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {transaction.offer_id.service_id.name}
                            </div>

                            <div>
                              <p>
                                Created At:{" "}
                                {moment(transaction.created_At).format(
                                  "MMM/DD/yy"
                                )}
                              </p>
                              <p>
                                Expected Date:{" "}
                                {moment(transaction.expected_Date).format(
                                  "MMM/DD/yy"
                                )}
                              </p>
                            </div>
                          </div>
                        ))}
                    </Fragment>
                  )}

                  {/* <div className='notClickedCard' style={{ height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <h1 style={{ display: 'flex', justifyContent: 'center' }}>No Transactions Yet</h1>
                                    </div> */}

                  {/* <div className='wideCard' >

                                </div>
                                <div className='notClickedCard' >

                                </div> */}
                </div>
              </div>
            </div>

            <div className="dashboardProfile">
              <div style={{ marginBottom: "15px" }}>
                <p style={{ fontWeight: "bold" }}>Profile</p>
              </div>
              <div
                style={{
                  display: "flex",
                  borderBottom: "2px solid rgba(0, 0, 0, .09)",
                  justifyContent: "space-around",
                }}
              >
                <div className="picContainer">
                  <img src={user.avatar.url} className="rounded-pic" />
                </div>
                <div className="profileInfo">
                  <h3>{user.name}</h3>
                  <p>
                    {user.role} -
                    {user.freelancer_id.isPremium ? "Premium" : "Basic"}
                  </p>
                  {user.role === "freelancer" &&
                    user.freelancer_id.gcash_num && (
                      <a
                        name=""
                        className={
                          activeSlider === 1 ? `selection` : "selection active"
                        }
                      >
                        Availability
                        <label
                          className="switch"
                          style={{
                            justifyContent: "center",
                            margin: "0px 5px",
                          }}
                        >
                          <input
                            type="checkbox"
                            id="myCheck"
                            onClick={clickedSliderHandler}
                          />
                          <span className="slider round"></span>
                        </label>
                      </a>
                    )}

                  {user.role === "freelancer" &&
                    !user.freelancer_id.gcash_num && (
                      <a name="" className="selection">
                        Availability
                        <label
                          className="switch"
                          style={{
                            justifyContent: "center",
                            margin: "0px 5px",
                          }}
                        >
                          <div onClick={notSetupSliderHandler}>
                            <input
                              type="checkbox"
                              id="myCheck"
                              onClick={notSetupSliderHandler}
                            />
                          </div>
                          <span className="slider round"></span>
                        </label>
                      </a>
                    )}
                </div>
              </div>
              <div className="paymentDetails">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                    paddingRight: "10px",
                  }}
                >
                  <p style={{ fontWeight: "bold" }}>Payment Details</p>
                  <span>
                    <i
                      className="fa fa-pencil"
                      data-toggle="modal"
                      data-target="#editDetailsModal"
                    ></i>
                  </span>
                </div>
                <div className="completeSetup">
                  {/* {user.freelancer_id && (

)} */}
                  <p>
                    GCash Name:{" "}
                    {user.freelancer_id && user.freelancer_id.gcash_name}
                  </p>
                  <p>
                    GCash Number:{" "}
                    {user.freelancer_id && user.freelancer_id.gcash_num}
                  </p>
                  {
                    !user.freelancer_id.gcash_name && (
                      <div className="flexCenter">
                        <button
                          className="profileBtn"
                          data-toggle="modal"
                          data-target="#setupModal"
                        >
                          Complete Setup
                        </button>
                      </div>
                    )
                    // <div className='flexCenter'><button className='profileBtn' data-toggle="modal" data-target="#editDetailsModal">Edit Details</button></div>
                  }
                </div>
              </div>
              <div className="servicesDisplay">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 style={{ fontWeight: "bold", marginTop: "20px" }}>
                    My Services
                  </h4>
                  <Link
                    to={`/services/${user.freelancer_id._id}`}
                    style={{ marginTop: "20px" }}
                  >
                    <span>see all</span>
                  </Link>
                </div>

                {servicesLoading ? (
                  <Loader />
                ) : (
                  <div className="servicesContainer">
                    {services &&
                      services.map((service) => (
                        // <ClientInquiries key={inquiry._id} inquiry={inquiry} />

                        <div className="serviceCard" key={service._id}>
                          <img
                            className="rounded-img"
                            src={service.images.url}
                            style={{ margin: "auto 20px auto 0px" }}

                          />
                          <div className="serviceCardInfo">
                            <p style={{ fontWeight: "bold" }}>
                              {service.category.name}
                            </p>
                            <p className="limitTextLength">{service.name}</p>
                            <p>₱{service.priceStarts_At}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* dito lagay loading */}
      </div>

      {/* SETUP INFORMATION MODAL */}
      <div
        className="modal fade"
        id="setupModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Payment Details
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
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="email_field">GCash Name</label>
                  <input
                    type="text"
                    id="gcash_name"
                    className="form-control"
                    name="gcash_name"
                    placeholder="Your gcash name"
                    required
                    value={gcash_name}
                    onChange={(e) => setGcashName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email_field">GCash Number</label>
                  <input
                    type="tel"
                    id="gcash_num"
                    className="form-control"
                    name="gcash_num"
                    placeholder="09XXXXXXXXX"
                    pattern="[0-9]{11}"
                    maxLength="11"
                    required
                    title="Please use a 11 digit telephone number with no dashes or dots"
                    value={gcash_num}
                    onChange={(e) => setGcashNum(e.target.value)}
                  />
                  {/* <input type="tel" name="phoneNumber" id="phoneNumber" title="Please use a 11 digit telephone number with no dashes or dots" pattern="[0-9]{10}" required /> <i>10 digits</i> */}
                </div>

                <label htmlFor="email_field">GCash QRCode</label>
                <div className="d-flex align-items-center">
                  <div className="custom-file">
                    <input
                      type="file"
                      name="qrCode"
                      className="custom-file-input"
                      id="customFile"
                      accept="image/*"
                      onChange={OnChange}
                    />

                    {qrCodeName ? (
                      <label className="custom-file-label" htmlFor="customFile">
                        {qrCodeName}
                      </label>
                    ) : (
                      <label className="custom-file-label" htmlFor="customFile">
                        attach GCash QRCode
                      </label>
                    )}
                  </div>
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
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* EDIT PAYMENT DETAILS MODAL */}
      <div
        className="modal fade"
        id="editDetailsModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Payment Details
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
                <div className="form-group">
                  <label htmlFor="email_field">GCash Name</label>
                  <input
                    type="text"
                    id="gcash_name"
                    className="form-control"
                    name="gcash_name"
                    placeholder="Your gcash name"
                    required
                    value={gcash_name}
                    onChange={(e) => setGcashName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email_field">GCash Number</label>
                  <input
                    type="number"
                    id="gcash_num"
                    className="form-control"
                    name="gcash_num"
                    placeholder="Your Gcash registered number"
                    required
                    value={gcash_num}
                    onChange={(e) => setGcashNum(e.target.value)}
                  />
                </div>

                {/* <label htmlFor="email_field">GCash QRCode</label>
                                <div className='d-flex align-items-center'>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='qrCode'
                                            className='custom-file-input'
                                            id='customFile'
                                            accept='image/*'
                                            onChange={OnChange}
                                        />

                                        {qrCodeName ? (
                                            <label className='custom-file-label' htmlFor='customFile'>

                                                {qrCodeName}

                                            </label>

                                        ) : (
                                            <label className='custom-file-label' htmlFor='customFile'>

                                                attach GCash QRCode

                                            </label>

                                        )
                                        }

                                    </div>
                                </div> */}

                <div className="form-group">
                  <label htmlFor="avatar_upload">QR Code</label>
                  <div className="d-flex align-items-center">
                    <div>
                      <figure className="avatar mr-3 item-rtl">
                        <img
                          src={qrCodePreview}
                          className="rounded-circle"
                          alt="Avatar Preview"
                        />
                      </figure>
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        name="qrcode"
                        className="custom-file-input"
                        id="customFile"
                        accept="image/*"
                        onChange={OnChange}
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Choose QR Code
                      </label>
                    </div>
                  </div>
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
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* {loading ? <Loader /> : (
                <Fragment>



                    <div className='containerDashboard'>
                        <button data-toggle="modal" data-target="#setupModal">Complete Setup</button>

                        {user.role === 'freelancer' && user.freelancer_id.gcash_num && (
                            <a name='' className={activeSlider === 1 ? `selection` : "selection active"} style={{ borderLeft: '3px solid' }} >Availability
                                <label className="switch" style={{ justifyContent: 'center', margin: '0px 5px' }}>
                                    <input type="checkbox" id='myCheck' onClick={clickedSliderHandler} />
                                    <span className="slider round" ></span>
                                </label>
                              
                            </a>
                        )}

                        {user.role === 'freelancer' && !user.freelancer_id.gcash_num && (
                            <a name='' className='selection'  >Availability
                                <label className="switch" style={{ justifyContent: 'center', margin: '0px 5px' }}>
                                    <div onClick={notSetupSliderHandler}>
                                        <input type="checkbox" id='myCheck' onClick={notSetupSliderHandler} /></div>
                                    <span className="slider round" ></span>
                                </label>
                            
                            </a>
                        )}
                    </div>

             

                </Fragment>
            )} */}
    </Fragment>
  );
};

export default Dashboard;
