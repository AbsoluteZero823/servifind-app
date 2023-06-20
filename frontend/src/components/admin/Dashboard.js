import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { ChatState } from "../../Context/ChatProvider";

import { UserData } from './charts/data';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import BarChart from './charts/BarChart';
import PieChart from './charts/PieChart';
import ServiceLeaderboards from './leaderboards/ServiceLeaderboards';
import LineChart from './charts/LineChart';
import { getDashboardInfo } from '../../actions/transactionActions';
import socket from '../../Context/socket';
import axios from "axios";

import { useDispatch, useSelector } from 'react-redux'

// import { getAdminProducts } from '../../actions/productActions'
// import { allOrders } from '../../actions/orderActions'
// import { allUsers } from '../../actions/userActions'
var selectedChatCompare;


const Dashboard = () => {
    const [newMessageReceivedLocal, setNewMessageReceivedLocal] = useState(null);
    const dispatch = useDispatch();

    // const { products } = useSelector(state => state.products)
    // const { users } = useSelector(state => state.allUsers)
    // const { orders, totalAmount, loading } = useSelector(state => state.allOrders)

    const { success, result } = useSelector(state => state.dashboardInfo);
    const { selectedChat, setSelectedChat, notification, setNotification, fetchNotificationAgain, setFetchNotificationAgain } = ChatState();
    // let outOfStock = 0;
    // products.forEach(product => {
    //     if (product.stock === 0) {
    //         outOfStock += 1;
    //     }
    // })

    useEffect(() => {
        dispatch(getDashboardInfo())
        if(success){
           console.log(result)  
          
        }

    }, [dispatch, success])

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

    const [userData, setUserData] = useState({
        labels: UserData.map((data)=> data.year),
        datasets: [{
          label: "Users Gained",
          data: UserData.map((data)=> data.userGain),
          backgroundColor: ["green", 'blue'],
          borderColor: "black",
          borderWidth: 1.5
        }]
      })

    return (
        <Fragment>






            <h1 className="my-4">Dashboard</h1>

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
                                    <div className='dashboard_count'>{result.freelancerCount}</div>
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
                    <div style={{display:'flex', flexWrap:'wrap', padding:20, justifyContent:'space-between'}}>
                    
                {/* <LineChart chartData={userData}/> */}
                <PieChart/>
                <BarChart/>
                <ServiceLeaderboards/>
                </div>
                </Fragment>
            )}




        </Fragment >
    )
}

export default Dashboard