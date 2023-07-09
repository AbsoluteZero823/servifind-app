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
  const [acceptOfferReceivedLocal, setAcceptOfferReceivedLocal] = useState(null);
  const [workCompletedReceivedLocal, setWorkCompletedReceivedLocal] = useState(null);
  const [paymentSentReceivedLocal, setPaymentSentReceivedLocal] = useState(null);
  const [paymentReceivedLocal, setPaymentReceivedLocal] = useState(null);
  const [newRatingReceivedLocal, setNewRatingReceivedLocal] = useState(null);


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
