import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { ChatState } from "../../Context/ChatProvider";

import { UserData } from './charts/data';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import BarChart from './charts/BarChart';
import IncomeChart from './charts/IncomeChart';
import PieChart from './charts/PieChart';
import ServiceLeaderboards from './leaderboards/ServiceLeaderboards';
import LineChart from './charts/LineChart';
import { getDashboardInfo } from '../../actions/transactionActions';
import { getServiceLeaderboards, clearErrors } from '../../actions/transactionActions';
import { getPremiumFreelancersPerMonth } from '../../actions/freelancerActions';
import socket from '../../Context/socket';



import axios from "axios";

import { useDispatch, useSelector } from 'react-redux'


var selectedChatCompare;




const Dashboard = () => {
  const [newMessageReceivedLocal, setNewMessageReceivedLocal] = useState(null);
  const { loading, error, sortedService } = useSelector(state => state.serviLeaderboards);
  const { monthlyPremiumCounts, clearErrors, success: incomeSuccess, error: incomeError, loading: incomeLoading } = useSelector(state => state.premiumFreelancers);
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
  }, [dispatch, success, incomeSuccess, incomeError])


  const handleTopServicesPdf = async () => {
    setPdfLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/v1/top-services-pdf', {
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
      const response = await fetch('http://localhost:3000/api/v1/monthly-income-pdf', {
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
        <div class="btn-group">
          <button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ padding: '15px 10px' }}>
            Generate Reports
          </button>
          <div class="dropdown-menu dropdown-menu-right">


            <button type="button"
              // className="profileBtn"
              class="dropdown-item"
              data-toggle="modal"
              data-target="#setupModal"
            >Transactions</button>
            <button class="dropdown-item" type="button" onClick={handleMonthlyIncomePdf} disabled={pdfLoading}>
              {pdfLoading ? 'Monthly Income...' : 'Monthly Income'}
            </button>

            <button class="dropdown-item" type="button" onClick={handleTopServicesPdf} disabled={pdfLoading}>
              {pdfLoading ? 'Top Services...' : 'Top Services'}
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
            <ServiceLeaderboards loading={loading} error={error} sortedService={sortedService} />
          </div>
        </Fragment>
      )}


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
              // onSubmit={submitHandler}
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