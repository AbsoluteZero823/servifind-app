import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userActions";
import { getMyUnreadNotifications, readMyNotification, newNotification } from "../../actions/notificationActions";



import swal from "sweetalert";
import Search from "./Search";

import "mdbreact/dist/css/mdb.css";
import "../../App.css";
import { ChatState } from "../../Context/ChatProvider";





// var selectedChatCompare;

// import Header from "./Header";

const Header = () => {

  const [newInquiryReceivedLocal, setNewInquiryReceivedLocal] = useState(null);
  const [newOfferReceivedLocal, setNewOfferReceivedLocal] = useState(null);
  const [acceptOfferReceivedLocal, setAcceptOfferReceivedLocal] = useState(null);

  const [newMessageReceivedLocal, setNewMessageReceivedLocal] = useState(null);
  let navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();
  const currentUrl = window.location.href;

  const { setSelectedChat, notification, setNotification, fetchNotificationAgain, setFetchNotificationAgain } = ChatState();

  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notifications)
  const { notification: newNotif } = useSelector((state) => state.addNotification);

  // useEffect(() => {


  //   if (user) {
  //     socket.emit("setup", user);
  //     console.log('sheesh')
  //   }

  //   // socket.on('message received', (newMessageReceived) => {
  //   //   setNewMessageReceivedLocal(newMessageReceived);
  //   // });

  //   socket.on('offer received', (newOfferReceived) => {
  //     setNewOfferReceivedLocal(newOfferReceived);
  //   });
  //   socket.on('inquiry received', (newInquiryReceived) => {
  //     setNewInquiryReceivedLocal(newInquiryReceived);
  //   });




  //   socket.on('accept_offer received', (acceptOfferReceived) => {
  //     setAcceptOfferReceivedLocal(acceptOfferReceived);
  //   });

  //   return () => {
  //     // I-close ang socket connection kapag nag-unmount ang component
  //     socket.disconnect();
  //   };

  // }, [])


  useEffect(() => {
    if (user) {
      //  dispatch(getMyUnreadNotifications());
      getMyNotifications();

    }
    if (notification) {


      console.log(notification)

    }
  }, [dispatch, fetchNotificationAgain])

  // useEffect(() => {

  // }, []);



  const getMyNotifications = async () => {
    // if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // setLoading(true);

      const { data } = await axios.get(
        // `/api/v1/messages/${id}`
        `/api/v1/my-notifications`,
        config
      );
      setNotification(data.notifications);

      console.log(data.notifications);
      console.log(notification);
      // setLoading(false);


    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (newInquiryReceivedLocal && newInquiryReceivedLocal !== null) {
  //     // Execute your code when a new message is received
  //     console.log('New inquiry received:', newInquiryReceivedLocal);


  //     // addInquiryNotif()

  //     const formData = new FormData();
  //     formData.set("type", 'inquiry');
  //     formData.set("message", `New Inquiry from ${newInquiryReceivedLocal.customer.name}`);
  //     formData.set("type_id", newInquiryReceivedLocal._id);
  //     formData.set("user_id", newInquiryReceivedLocal.freelancer.user_id);

  //     // type: "inquiry",
  //     //   message: `New Inquiry from ${newInquiryReceivedLocal.customer.name}`,
  //     //     type_id: newInquiryReceivedLocal._id,
  //     //       user_id: newInquiryReceivedLocal.freelancer.user_id

  //     dispatch(newNotification(formData));


  //     // Reset the newMessageReceived state
  //     setFetchNotificationAgain(!fetchNotificationAgain);
  //     setNewInquiryReceivedLocal(null);
  //   }
  // }, [newInquiryReceivedLocal]);

  // useEffect(() => {
  //   if (newOfferReceivedLocal && newOfferReceivedLocal !== null) {
  //     // Execute your code when a new offer is received
  //     console.log('New offer received:', newOfferReceivedLocal);


  //     // addOfferNotif()

  //     const formData = new FormData();
  //     formData.set("type", (newOfferReceivedLocal.request_id) ? "offer_request" : "offer_inquiry");
  //     formData.set("message", `New Offer from ${newOfferReceivedLocal.offered_by.name}`);
  //     formData.set("type_id", newOfferReceivedLocal._id);
  //     formData.set("user_id", (newOfferReceivedLocal.request_id) ? newOfferReceivedLocal.request_id.requested_by : newOfferReceivedLocal.inquiry_id.customer);
  //     dispatch(newNotification(formData));
  //     // type: (newOfferReceivedLocal.request_id) ? "offer_request" : "offer_inquiry",
  //     //   message: `New Offer from ${newOfferReceivedLocal.offered_by.name}`,
  //     //     type_id: newOfferReceivedLocal._id,
  //     //       user_id: userid

  //     // Reset the newOfferReceived state
  //     setFetchNotificationAgain(!fetchNotificationAgain);
  //     setNewOfferReceivedLocal(null);
  //   }
  // }, [newOfferReceivedLocal]);


  // useEffect(() => {
  //   if (acceptOfferReceivedLocal && acceptOfferReceivedLocal !== null) {
  //     // Execute your code when a new message is received
  //     console.log('accept offer received:', acceptOfferReceivedLocal);


  //     // addAcceptedOfferNotif()
  //     const formData = new FormData();
  //     formData.set("type", "accept_offer");
  //     // formData.set("message", acceptOfferReceivedLocal.request_id ? `${acceptOfferReceivedLocal.request_id.requested_by.name} accepted your offer` : `${acceptOfferReceivedLocal.inquiry_id.customer.name} accepted your offer`),
  //     formData.set("message", acceptOfferReceivedLocal.request_id ? `${acceptOfferReceivedLocal.request_id.requested_by.name} accepted your offer` : `${acceptOfferReceivedLocal.inquiry_id.customer.name} accepted your offer`);
  //     formData.set("type_id", acceptOfferReceivedLocal._id);
  //     formData.set("user_id", acceptOfferReceivedLocal.offered_by);
  //     dispatch(newNotification(formData));

  //     // Reset the newMessageReceived state
  //     setFetchNotificationAgain(!fetchNotificationAgain);
  //     setAcceptOfferReceivedLocal(null);
  //   }
  // }, [acceptOfferReceivedLocal]);





  const logoutHandler = () => {
    dispatch(logout());
    // alert.success('Logged out successfully.')
    swal("Success!", "Logged Out Succesfully!", "success");
  };
  return (
    <div>
      <nav className="navbar" style={{ zIndex: "6" }}>
        <div className="fifteen-percent">
          {(!user || user.role === "admin") && (
            <a className="logo" href="/">
              <img className="servi_logo" src="../images/ServiFind.png" />
            </a>
          )}
          {user && user.role !== "admin" && (
            <a className="logo" href="/all">
              <img className="servi_logo" src="../images/ServiFind.png" />
            </a>
          )}
        </div>
        <div className="thirtyfive-percent">
          <Search />
        </div>

        <ul
          className={isMobile ? "nav-links-mobile" : "nav-links"}
          onClick={() => setIsMobile(false)}
        >
          {/* <ul className="nav-links"> */}
          {/* <a href="/">
                    <li>HOME</li>
                </a> */}
          {/* <Link to="/#our-team" href="#our-team"> */}

          {!user && (
            <a href="/#our-team">
              <li>ABOUT</li>
            </a>
          )}
          {!user && (
            <a href="/#features">
              <li>FEATURES</li>
            </a>
          )}
          {!user && (
            <a href="/#our-team">
              <li>TERMS & CONDITION</li>
            </a>
          )}
          {!user && (
            <Link to="/all">
              <li>SERVICES</li>
            </Link>
          )}
          {user && user.role === "admin" && (
            <Link to="/all">
              <li>SERVICES</li>
            </Link>
          )}

          {/* </Link> */}
          {/* <Link to="/contact">
                    <li>CONTACT US</li>
                </Link> */}
          {/* <Link to="/contact">Meet Our Team</Link> */}

          {!user && (
            <Link to="/register">
              <li>SIGN UP</li>
            </Link>
          )}

          {user ? (
            <Fragment>

              {/* <!-- Notification dropdown --> */}
              <li className="nav-item dropdown">
                <a className="me-3 me-lg-0 dropdown-toggle hidden-arrow" href="#" id="navbarDropdownMenuLink"
                  role="button" data-toggle="dropdown" aria-expanded="false"
                  style={{ padding: '0px 5px' }}>
                  <i className="fas fa-bell" style={{ fontSize: '20px' }}></i>

                  {/* <span className="badge rounded-pill badge-notification bg-danger">{ (notification && notification[0] && ((user._id === notification[0].chat.users[0]._id) || (user._id === notification[0].chat.users[1]._id)) && user._id !== notification[0].sender._id) ? notification.length : ''}</span> */}
                  <span className="badge rounded-pill badge-notification bg-danger">{(notification.length > 0) ? notification.length : ''}</span>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink"
                  style={{
                    top: '150%',
                    right: '-50%',
                    left: 'unset',
                    overflowY: 'auto',
                    maxHeight: "calc(100vh - 100px)"
                  }}>
                  {/* {(notification && notification[0] && ((user._id !== notification[0].chat.users[0]._id) || (user._id !== notification[0].chat.users[1]._id)) && user._id === notification[0].sender._id) && */}
                  {(notification.length === 0) &&
                    (<li>
                      <a className="dropdown-item">No New Notification</a>
                    </li>)
                  }

                  {/* { (notification && notification[0] && ((user._id === notification[0].chat.users[0]._id) || (user._id === notification[0].chat.users[1]._id)) && user._id !== notification[0].sender._id) && ( */}


                  {(notification) && (
                    <Fragment>

                      {notification.map(notif => (
                        <li key={notif._id}
                        >
                          {/* PAG NASA CHAT PAGE ANG RERECEIVE */}
                          {currentUrl === `${process.env.BASE_URL}chat` && (
                            <a className="dropdown-item" href="#" onClick={() => {

                              // SetNotification(notification.filter((n) => n._id !== notif._id));



                              setSelectedChat(notif.chat);
                              setNotification(notification.filter(n => n._id !== notif._id));

                              // console.log(notification)
                            }}>{`${notif.message}`}</a>
                          )}
                          {/* PAG WALA SA CHAT PAGE ANG RERECEIVE */}
                          {currentUrl !== `${process.env.BASE_URL}chat` && (
                            <a className="dropdown-item" href="#" onClick={() => {

                              // SetNotification(notification.filter((n) => n._id !== notif._id));



                              setSelectedChat(notif.chat);
                              setNotification(notification.filter(n => n._id !== notif._id));
                              navigate(`/chat`)

                              // console.log(notification)
                            }}>{`${notif.message}`}</a>
                          )}
                        </li>
                      ))}
                      {/* NOTIFICATION MAP END */}
                    </Fragment>
                  )}
                  {/* <li>
                    <a className="dropdown-item" href="#">Kendrick Sent a message</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">Another news</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </li> */}
                </ul>
              </li>




              {/* <div className="btn text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa fa-envelope"></i>

                <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                  <Link className="dropdown-item" to="/me">Profile</Link></div>
              </div> */}
              <div className="ml-4 dropdown d-inline">
                <Link
                  to="#!"
                  className="btn dropdown-toggle text-white mr-4"
                  type="button"
                  id="dropDownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <figure className="avatar avatar-nav">
                    <img
                      src={user.avatar && user.avatar.url}
                      alt={user && user.name}
                      className="rounded-circle"
                    />
                  </figure>
                  {user && user.role !== 'customer' && (
                    <span>{user && user.role} : {user && user.name}</span>
                  )}
                  {user && user.role === 'customer' && (
                    <span>client : {user && user.name}</span>
                  )}
                </Link>

                <div
                  className="dropdown-menu"
                  aria-labelledby="dropDownMenuButton"
                  style={{ left: '46%' }}
                >
                  {user && user.role === "admin" && (
                    <Link className="dropdown-item" to="/dashboard">
                      Dashboard
                    </Link>
                  )}

                  <Link className="dropdown-item" to="/me">
                    Profile
                  </Link>
                  {user.role !== "admin" && (
                    <Link className="dropdown-item" to="/chat">
                      Inbox
                    </Link>
                  )}

                  {user.role !== "admin" && (
                    <Link className="dropdown-item" to="/manage-requests">
                      Manage Request
                    </Link>
                  )}

                  {user.role !== "admin" && (
                    <Link className="dropdown-item" to="/post-request">
                      Post a Job
                    </Link>
                  )}

                  <hr></hr>
                  {user && user.role === "customer" && (
                    <Link className="dropdown-item" to="/become-freelancer">
                      Become a Freelancer
                    </Link>
                  )}
                  {/* <Link className="dropdown-item" to="/orders/me">Orders</Link> */}
                  {user && user.role === "customer" && <hr></hr>}

                  {user &&
                    user.role === "freelancer" &&
                    !user.freelancer_id.isPremium && (
                      <Fragment>
                        <Link className="dropdown-item" to="/premium">
                          Upgrade to Premium
                        </Link>
                        <hr></hr>
                      </Fragment>
                    )}
                  <Link
                    className="dropdown-item text-danger"
                    to="/"
                    onClick={logoutHandler}
                  >
                    Sign Out
                  </Link>
                  {/* <Link className="dropdown-item text-danger" to="/" >
                                    Logout
                                </Link> */}
                </div>
              </div>
            </Fragment>
          ) : (
            !loading && (
              <Link to="/login">
                <li>
                  <button className="nav-button">SIGN IN</button>
                </li>
              </Link>
            )
          )}
        </ul>

        <button
          className="mobile-menu-icon"
          onClick={() => setIsMobile(!isMobile)}
        >
          {isMobile ? (
            <i>
              <FaTimes></FaTimes>
            </i>
          ) : (
            <i>
              <FaBars></FaBars>
            </i>
          )}
        </button>
      </nav>
      <nav className="navbar" style={{ position: "static" }}></nav>
    </div >
  );
};

export default Header;
