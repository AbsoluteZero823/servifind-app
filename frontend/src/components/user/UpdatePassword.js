import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { newNotification } from "../../actions/notificationActions";

import axios from "axios";


import { ChatState } from "../../Context/ChatProvider";
import socket from "../../Context/socket";

var selectedChatCompare;

const UpdatePassword = () => {
  const { selectedChat, setSelectedChat, notification, setNotification, fetchNotificationAgain, setFetchNotificationAgain } = ChatState();
  const [newMessageReceivedLocal, setNewMessageReceivedLocal] = useState(null);
  const [newInquiryReceivedLocal, setNewInquiryReceivedLocal] = useState(null);
  const [newOfferReceivedLocal, setNewOfferReceivedLocal] = useState(null);

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password updated successfully");

      navigate("/me");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, alert, error, navigate, isUpdated]);

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
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);

    dispatch(updatePassword(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Change Password"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mt-2 mb-5">Update Password</h1>
            <div className="form-group">
              <label htmlFor="old_password_field">Old Password</label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new_password_field">New Password</label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
