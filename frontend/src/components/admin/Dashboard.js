import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { ChatState } from "../../Context/ChatProvider";

import { UserData } from './charts/data';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import BarChart from './charts/BarChart';
import IncomeChart from './charts/IncomeChart';
import MonthlyApplication from './charts/MonthlyApplication';
import PieChart from './charts/PieChart';
import ServiceLeaderboards from './leaderboards/ServiceLeaderboards';
import LineChart from './charts/LineChart';
import { getDashboardInfo, getTransactions, getTransactionPerUsers } from '../../actions/transactionActions';
import { getServiceLeaderboards, clearErrors, getTransactionDashboard, getProcessingData, getToPayData,getToConfirmData,getCompletedData } from '../../actions/transactionActions';
import { getPremiumFreelancersPerMonth} from '../../actions/freelancerActions';
import { getApplicationPerMonth } from '../../actions/freelancerActions';
import socket from '../../Context/socket';
import $ from 'jquery';



import axios from "axios";

import { useDispatch, useSelector } from 'react-redux'


var selectedChatCompare;




const Dashboard = () => {
  const [newMessageReceivedLocal, setNewMessageReceivedLocal] = useState(null);
  const { loading, error, sortedService } = useSelector(state => state.serviLeaderboards);
  const { monthlyPremiumCounts, clearErrors, success: incomeSuccess, error: incomeError, loading: incomeLoading } = useSelector(state => state.premiumFreelancers);
  const { loading: transactionLoading, error: transactionError, transactions, success: successTransaction } = useSelector((state) => state.transactions);
  const { sectionArr, success: successTopUsers, loading: loadingTopUsers } = useSelector((state) => state.topUsers);
  const { monthlyApplication, success: successMonthlyApplication, loading: loadingMonthlyApplication} = useSelector((state) => state.applicationMonthly);
  const { transactionCounts, success: successTransactionDashboard, loading: loadingTransactionDashboard} = useSelector((state) => state.transactionDashboard);
  const{processingTransactions, success: successProcessing, loading:loadingProcessing} = useSelector((state)=> state.processingData);
  const{notSentTransactions, success: successToPay, loading:loadingToPay} = useSelector((state)=> state.toPayData);
  const{customConditionTransactions, success:successToConfirm, loading:loadingToConfirm} = useSelector((state)=> state.toConfirmData);
  const{completedTransactions, success:successCompleted, loading:loadingCompleted} = useSelector((state)=> state.completedData);
  const dispatch = useDispatch();



  // const { products } = useSelector(state => state.products)
  // const { users } = useSelector(state => state.allUsers)
  // const { orders, totalAmount, loading } = useSelector(state => state.allOrders)

  const { success, result } = useSelector(state => state.dashboardInfo);
  const { selectedChat, setSelectedChat, notification, setNotification, fetchNotificationAgain, setFetchNotificationAgain } = ChatState();




  const [pdfLoading, setPdfLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");


  useEffect(() => {
    dispatch(getDashboardInfo())
    dispatch(getServiceLeaderboards());
    dispatch(getPremiumFreelancersPerMonth());
    dispatch(getTransactionPerUsers());
    dispatch(getApplicationPerMonth());
    dispatch(getTransactionDashboard());
    
    dispatch(getProcessingData());
    dispatch(getToPayData());
    dispatch(getToConfirmData());
    dispatch(getCompletedData());
    if (success) {
      console.log(result)

    }

    if (incomeSuccess) {
      console.log(monthlyPremiumCounts)
    }
    if (incomeError) {
      alert.error(incomeError);
      dispatch(clearErrors())
    }

    if (successTopUsers) {
      // dispatch(clearErrors())
      console.log(sectionArr[0].section, 'ito yon-----------------------------------')
    }

    if (successTransaction) {
      if (fromDate) {
        // $("#setupModal").modal('hide');
        handleTransactionsPdf();
        setToDate("");
        setFromDate("");
      }

      if(successTransactionDashboard){
        console.log(transactionCounts)
      }

      if(successProcessing){
        console.log(processingTransactions)
      }
      if(successToPay){
        console.log(notSentTransactions)
      }
      if(successToConfirm){
        console.log(customConditionTransactions)
      }
      if(successCompleted){
        console.log(completedTransactions)
      }
    }
  }, [dispatch, success, incomeSuccess, incomeError, successTransaction, successTopUsers, successMonthlyApplication, successTransactionDashboard, successProcessing, successToPay, successToConfirm, successCompleted])

  const handleProcessingPdf = async () => {
    setPdfLoading(true);

    try {
      // const response = await fetch('http://localhost:3000/api/v1/transactions-processing-pdf', {
        const response = await fetch('https://servifind-app.onrender.com/api/v1/transactions-processing-pdf', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ processingTransactions }) // Serialize the array of objects to JSON string
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'processingTransactions.pdf';
      link.click();
      setPdfLoading(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setPdfLoading(false);
    }
  };

  const handleToPayPdf = async () => {
    setPdfLoading(true);

    try {
      // const response = await fetch('http://localhost:3000/api/v1/transactions-to-pay-pdf', {
        const response = await fetch('https://servifind-app.onrender.com/api/v1/transactions-to-pay-pdf', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ notSentTransactions }) // Serialize the array of objects to JSON string
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'toPayTransactions.pdf';
      link.click();
      setPdfLoading(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setPdfLoading(false);
    }
  };

  const handleToConfirmPdf = async () => {
    setPdfLoading(true);

    try {
      // const response = await fetch('http://localhost:3000/api/v1/transactions-to-confirm-pdf', {
        const response = await fetch('https://servifind-app.onrender.com/api/v1/transactions-to-confirm-pdf', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ customConditionTransactions }) // Serialize the array of objects to JSON string
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'toConfirmTransactions.pdf';
      link.click();
      setPdfLoading(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setPdfLoading(false);
    }
  };

  const handleCompletedPdf = async () => {
    setPdfLoading(true);

    try {
      // const response = await fetch('http://localhost:3000/api/v1/transactions-completed-pdf', {
        const response = await fetch('https://servifind-app.onrender.com/api/v1/transactions-completed-pdf', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completedTransactions }) // Serialize the array of objects to JSON string
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'completedTransactions.pdf';
      link.click();
      setPdfLoading(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setPdfLoading(false);
    }
  };

  const handleTopFreelancersPdf = async () => {
    setPdfLoading(true);

    try {
      // const response = await fetch('http://localhost:3000/api/v1/top-freelancers-pdf', {
        const response = await fetch('https://servifind-app.onrender.com/api/v1/top-freelancers-pdf', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sectionArr }) // Serialize the array of objects to JSON string
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'topFreelancers.pdf';
      link.click();
      setPdfLoading(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setPdfLoading(false);
    }
  };
  const handleFreelancerMonthlyPdf = async () => {
    setPdfLoading(true);

    try {
      // const response = await fetch('http://localhost:3000/api/v1/freelancer-monthly-join-pdf', {
        const response = await fetch('https://servifind-app.onrender.com/api/v1/freelancer-monthly-join-pdf', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ monthlyApplication }) // Serialize the array of objects to JSON string
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'monthlyJoin.pdf';
      link.click();
      setPdfLoading(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setPdfLoading(false);
    }
  };
  const handleTopServicesPdf = async () => {
    setPdfLoading(true);

    try {
      // const response = await fetch('http://localhost:3000/api/v1/top-services-pdf', {
        const response = await fetch('https://servifind-app.onrender.com/api/v1/top-services-pdf', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sortedService }) // Serialize the array of objects to JSON string
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'topServices.pdf';
      link.click();
      setPdfLoading(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setPdfLoading(false);
    }
  };

  const handleMonthlyIncomePdf = async () => {
    setPdfLoading(true);

    try {
      // const response = await fetch('http://localhost:3000/api/v1/monthly-income-pdf', {
        const response = await fetch('https://servifind-app.onrender.com/api/v1/monthly-income-pdf', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ monthlyPremiumCounts }) // Serialize the array of objects to JSON string
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'monthlyIncome.pdf';
      link.click();
      setPdfLoading(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setPdfLoading(false);
    }
  };
  const handleTransactionsPdf = async () => {
    setPdfLoading(true);

    try {
      // const response = await fetch('http://localhost:3000/api/v1/transactions-pdf', {
        const response = await fetch('https://servifind-app.onrender.com/api/v1/transactions-pdf', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ transactions }) // Serialize the array of objects to JSON string
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fromDate}-${toDate}.pdf`;
      link.click();
      setPdfLoading(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setPdfLoading(false);
    }
  };

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
        addNotif()
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


  const addNotif = async () => {
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

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("toDate", toDate);
    formData.set("fromDate", fromDate);
    console.log(fromDate, toDate)
    dispatch(getTransactions({ fromDate, toDate }));
    $('.modal-backdrop').hide();

    closeModal()
  };

  const closeModal = () => {
    $("#setupModal").hide();
  }
  return (
    <Fragment>





      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '0px 30px'
        }}>

        <h1 className="my-4">Dashboard</h1>
        <div className="btn-group">
          <button type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ padding: '15px 10px' }}>
            Generate Reports
          </button>
          <div className="dropdown-menu dropdown-menu-right">


            <button type="button"
              // className="profileBtn"
              className="dropdown-item"
              data-toggle="modal"
              data-target="#setupModal"
            >Transactions</button>


            <button className="dropdown-item" type="button" onClick={handleMonthlyIncomePdf} disabled={pdfLoading}>
              {pdfLoading ? 'Monthly Income...' : 'Monthly Income'}
            </button>

            <button className="dropdown-item" type="button" onClick={handleTopServicesPdf} disabled={pdfLoading}>
              {pdfLoading ? 'Top Services...' : 'Top Services'}
            </button>

            <button className="dropdown-item" type="button" onClick={handleFreelancerMonthlyPdf} disabled={pdfLoading}>
              {pdfLoading ? 'Monthly Freelancer Join...' : 'Monthly Freelancer Join'}
            </button>
            <button className="dropdown-item" type="button" onClick={handleTopFreelancersPdf} disabled={pdfLoading}>
              {pdfLoading ? 'Top Freelancers...' : 'Top Freelancers'}
            </button>

            <button className="dropdown-item" type="button" onClick={handleProcessingPdf} disabled={pdfLoading}>
              {pdfLoading ? 'Processing Transactions...' : 'Processing Transactions'}
            </button>
            <button className="dropdown-item" type="button" onClick={handleToPayPdf} disabled={pdfLoading}>
              {pdfLoading ? 'To Pay Transactions...' : 'To Pay Transactions'}
            </button>
            <button className="dropdown-item" type="button" onClick={handleToConfirmPdf} disabled={pdfLoading}>
              {pdfLoading ? 'To Confirm Transactions...' : 'To Confirm Transactions'}
            </button>
            <button className="dropdown-item" type="button" onClick={handleCompletedPdf} disabled={pdfLoading}>
              {pdfLoading ? 'Completed Transactions...' : 'Completed Transactions'}
            </button>
          </div>
        </div>
      </div>
      {false ? <Loader /> : (
        <Fragment>
          <MetaData title={'Admin Dashboard'} />

          {/* <div className="row pr-4">
                        <div className="col-xl-12 col-sm-12 mb-3">
                            <div className="card text-white bg-primary o-hidden h-100">
                                <div className="card-body">
                                 
                                    <div className="text-center card-font-size">Total Amount<br /> <b>$100</b></div>

                                </div>
                            </div>
                        </div>
                    </div> */}

          <div className="row pr-4">
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-success o-hidden h-100">



                <div className="card-body">
                  {/* <div className="text-center card-font-size">Products<br /> <b>{products && products.length}</b></div> */}
                  <div className="text-center card-font-size">Services</div>
                </div>

                <Link className="card-footer text-white clearfix small z-1" to="/services">
                  <div>
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </div>

                  <div className='dashboard_count'>{result.serviceCount}</div>
                </Link>
              </div>
            </div>


            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-danger o-hidden h-100">



                <div className="card-body">
                  {/* <div className="text-center card-font-size">Orders<br /> <b>{orders && orders.length}</b></div> */}
                  <div className="text-center card-font-size">Freelancers</div>
                </div>

                <Link className="card-footer text-white clearfix small z-1" to="/all/freelancers">
                  <div>
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </div>
                  <div className='dashboard_count'>{result && result.freelancerCount}</div>
                </Link>
              </div>
            </div>


            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-info o-hidden h-100">



                <div className="card-body">
                  {/* <div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div> */}
                  <div className="text-center card-font-size">Users</div>
                </div>

                <Link className="card-footer text-white clearfix small z-1" to="/users">
                  <div>
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </div>
                  <div className='dashboard_count'>{result.userCount}</div>
                </Link>
              </div>
            </div>


            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-warning o-hidden h-100">


                <div className="card-body">
                  {/* <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div> */}
                  <div className="text-center card-font-size">Completed Transactions</div>

                  <div className="card-footer text-white clearfix small z-1" to="/admin/users">


                    <div className='dashboard_count'>{result.transactionCount}</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', padding: 20, justifyContent: 'space-between' }}>

            {/* <LineChart chartData={userData}/> */}
            <PieChart />
            <BarChart />
            <IncomeChart loading={incomeLoading} error={incomeError} success={incomeSuccess} clearErrors={clearErrors} monthlyPremiumCounts={monthlyPremiumCounts} />
            <MonthlyApplication loading={loadingMonthlyApplication} success={successMonthlyApplication} monthlyApplication={monthlyApplication} />
            <ServiceLeaderboards loading={loading} error={error} sortedService={sortedService} />
            <div className="col-md-6"
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 0 15px 1px rgba(0, 0, 0, 0.4)',
                flex: '0 0 48%',
                margin: '25px 0px',

                // minHeight: '300px',
                padding: '20px'
              }} >
              <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>
                Top Freelancers
              </h1>
              {(loadingTopUsers && !sectionArr) ? <Loader /> : (


                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <label>
                    {sectionArr[0] ? sectionArr[0].section : "?"}
                  </label>
                  <label>
                    {sectionArr[1] ? sectionArr[1].section : "?"}
                  </label>
                  <label>
                    {sectionArr[2] ? sectionArr[2].section : "?"}
                  </label>
                </div>
              )}
              
              <div style={{
                // position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                // width: "calc(100% - 30px)"


              }}>
                <img src='../../images/gold_silver_bronzeMedal.png' style={{ height: '20vh' }}>


                </img>
                {(loadingTopUsers && !sectionArr) ? <Loader /> : (
                <div style={{
                  position: 'absolute',
                  display: "flex",
                  // justifyContent: 'space-around',
                  gap: '15%',
                  width: '100%',
                  padding: '23px 47px',
                  width: 'calc(100% - 30px)'


                }}>
                  <img className='topGold' src={sectionArr[0] ? sectionArr[0].avatar : "https://media.istockphoto.com/vectors/vector-illustration-male-silhouette-profile-picture-with-question-on-vector-id937695038?k=6&m=937695038&s=170667a&w=0&h=qev78TH1j74fdL6DmGxbRN3cPf2xqFHgF4fCYGcL8-8="}
                    style={{
                      height: '14vh',
                      width: '14vh',
                      paddingtop: '0px',
                      borderRadius: '100%',

                    }}>
                  </img>


                  <img className='topSilver' src={sectionArr[1] ? sectionArr[1].avatar : "https://media.istockphoto.com/vectors/vector-illustration-male-silhouette-profile-picture-with-question-on-vector-id937695038?k=6&m=937695038&s=170667a&w=0&h=qev78TH1j74fdL6DmGxbRN3cPf2xqFHgF4fCYGcL8-8="}
                    style={{
                      height: '14vh',
                      width: '14vh',
                      paddingtop: '0px',
                      borderRadius: '100%',

                    }}>
                  </img>


                  <img className='topBronze' src={sectionArr[2] ? sectionArr[2].avatar : "https://media.istockphoto.com/vectors/vector-illustration-male-silhouette-profile-picture-with-question-on-vector-id937695038?k=6&m=937695038&s=170667a&w=0&h=qev78TH1j74fdL6DmGxbRN3cPf2xqFHgF4fCYGcL8-8="}
                    style={{
                      height: '14vh',
                      width: '14vh',
                      paddingtop: '0px',
                      borderRadius: '100%',

                      marginLeft: '7px'
                    }}>
                  </img>
                </div>
                )}

              </div>


              {(loadingTopUsers && !sectionArr) ? <Loader /> : (
                <div className='descriptions' style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                  <div>
                    <label >Completed Transaction: {sectionArr[0] ? sectionArr[0].count : "?"}</label>
                  </div>

                  <div>
                    <label>Completed Transaction: {sectionArr[1] ? sectionArr[1].count : "?"}</label>
                  </div>
                  <div>
                    <label>Completed Transaction: {sectionArr[2] ? sectionArr[2].count : "?"}</label>
                  </div>
                </div>
              )}
              {/* <img src='../images/students-college.png' ></img> */}
            </div>

           




          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            <div className="col-md-12"
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 0 15px 1px rgba(0, 0, 0, 0.4)',
                flex: '0 0 48%',
                margin: '25px 0px',
                minWidth: '60vw',
                // minHeight: '500px',
                padding: '20px'
              }} >
              <h1 style={{ textAlign: 'center', padding:'20px' }}>
                Transaction Counts
              </h1>
<hr></hr>

{(loadingTransactionDashboard) ? <Loader /> : (
<div className='transaction_count' style={{display:'flex', justifyContent:'space-around'}}>
<div className='on_process'>
<img src='https://www.pngkit.com/png/full/335-3350147_process-icon-process-icon-blue-png.png' ></img>
<span className="transaction_badge rounded-pill badge-notification bg-danger">{transactionCounts && transactionCounts.processingCount}</span>
<label>On Process</label>
</div>
<div className='to_pay'>
<img src='http://clipart-library.com/images_k/cash-icon-transparent/cash-icon-transparent-19.png' ></img>
<span className="transaction_badge rounded-pill badge-notification bg-danger">{transactionCounts && transactionCounts.paymentNotSentCount}</span>
<label>To Pay</label>
</div>

<div className='to_confirm'>
<img src='https://seeklogo.com/images/F/facebook-like-logo-84B75A1FCB-seeklogo.com.png' ></img>
<span className="transaction_badge rounded-pill badge-notification bg-danger">{transactionCounts && transactionCounts.customConditionCount}</span>
<label>To Confirm</label>
</div>
<div className='completed'>
<img src='https://icon-library.com/images/completed-icon/completed-icon-6.jpg' ></img>
<span className="transaction_badge rounded-pill badge-notification bg-danger">{transactionCounts && transactionCounts.completedCount}</span>
<label>Completed</label>
</div>
</div>
)}

              {/* <img src='../images/students-college.png' ></img> */}
            </div>
          </div>
        </Fragment>
      )}


      {/* GENERATE TRANSACTION PDF MODAL */}

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
                Generate Transaction Reports
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
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10 }}>
                  <div className="form-group">
                    <label >From: </label>

                    <input type="date" className="form-control"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label > To: </label>

                    <input type="date" className="form-control"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
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
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </Fragment >
  )
}

export default Dashboard