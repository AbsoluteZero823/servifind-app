import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
// import Sidebar from '../admin/Sidebar'
// import moment from 'moment-timezone/builds/moment-timezone-with-data-2012-2022';
import moment from 'moment/moment'
import Swal from 'sweetalert2';
import $ from 'jquery';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
// import { allUsers, deleteUser, activateUser, deactivateUser, clearErrors } from '../../actions/userActions'
// import { DELETE_USER_RESET, ACTIVATE_USER_RESET, DEACTIVATE_USER_RESET } from '../../constants/userConstants'
import { getTransactions, clearErrors, SingleTransaction, PaymentReceived, PaymentSent, TransactionDone, RateDone, ReportDone } from '../../actions/transactionActions'
import { newRating } from '../../actions/ratingActions'
import { newReport } from '../../actions/reportActions'
import { UPDATE_PSENT_RESET, UPDATE_PRECEIVED_RESET, UPDATE_TRANSACTIONDONE_RESET } from '../../constants/transactionConstants'



const MyTransactions = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const [reason, setReason] = useState('');
    const [description, setDescription] = useState('');

    // const { loading, error, users } = useSelector(state => state.users);
    const { loading, error, transactions } = useSelector(state => state.transactions);
    const { loadings, detailserror, transaction } = useSelector(state => state.transactionDetails);
    const { user, isAuthenticated } = useSelector(state => state.auth)
    const { isUpdated, loadingpayment } = useSelector(state => state.updatePayment)


    const [transactionID, setTransactionID] = useState('')
    const [clientName, setClientName] = useState('')
    const [freelancerName, setFreelancerName] = useState('')
    // const { isUpdated } = useSelector(state => state.user);
    // const { isDeleted } = useSelector(state => state.updelUser);
    // const { user } = useSelector(state => state.auth)
    // const {id} = useParams();
    useEffect(() => {
        dispatch(getTransactions());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        console.log(user)

        if (user) {
            console.log(user._id);
        }
        if (transactions) {
            console.log(transactions._id);
        }
        // if (isDeleted) {
        //     alert.success('User deleted successfully');
        //     navigate('/users');
        //     dispatch({ type: DELETE_USER_RESET })
        // }
        if (isUpdated) {



            dispatch({ type: UPDATE_PSENT_RESET })
            dispatch({ type: UPDATE_PRECEIVED_RESET })
        }

    }, [dispatch, alert, error, navigate, isUpdated])


    const transactionDetailsHandler = (id) => {
        dispatch(SingleTransaction(id))



    }

    const submitHandler = (e) => {
        e.preventDefault();
        const statusData = new FormData();
        statusData.set('paymentSent', 'true');
        Swal.fire({
            title: 'is Payment Done?',
            text: "If you pay thru Gcash, make sure to send the screenshot of the receipt to the freelancer.",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, payment is done'
        }).then((result) => {
            if (result.isConfirmed) {

                dispatch(PaymentSent(transaction._id, statusData));

                Swal.fire(
                    'Payment Sent!',
                    'Wait for the freelancer to check your payment',
                    'success'
                )
                //closes the modal
                $('.close').click();

            }
        })


    }

    const submitRateHandler = (e) => {
        e.preventDefault();
        const ratingData = new FormData();
        ratingData.set('comment', comment);
        ratingData.set('rating', rating);
        ratingData.set('service_id', transaction.inquiry_id.service_id._id);
        ratingData.set('user', user._id)
        ratingData.set('transaction_id', transaction._id)

        dispatch(RateDone(transaction._id));
        dispatch(newRating(ratingData));

        Swal.fire(
            'Rate Success!',
            '',
            'success'
        )
        //closes the modal
        $('.close').click();




        // dispatch(updateProfile(formData))

    }
    const submitReportHandler = (e) => {
        e.preventDefault();
        const reportData = new FormData();

        reportData.set('reason', reason);
        reportData.set('description', description);
        reportData.set('reported_by', user._id);
        reportData.set('transaction_id', transaction._id)
        // if user is the service provider
        if (user._id === transaction.inquiry_id.service_id.user) {
            reportData.set('user_reported', transaction.inquiry_id.customer._id)

        } // if user is the client
        else if (user._id === transaction.inquiry_id.customer._id) {
            reportData.set('user_reported', transaction.inquiry_id.service_id.user)
        }

        const formData = new FormData();
        // if user is the service provider
        if (user._id === transaction.inquiry_id.service_id.user) {
            formData.set('freelancer', 'true')
            formData.set('client', transaction.reportedBy.client)

        }// if user is the client 
        else if (user._id === transaction.inquiry_id.customer._id) {
            formData.set('freelancer', transaction.reportedBy.freelancer)
            formData.set('client', 'true')
        }

        dispatch(ReportDone(transaction._id, formData))
        dispatch(newReport(reportData));

        Swal.fire(
            'Reported Successfully!',
            '',
            'success'
        )
        //closes the modal
        $('.close').click();




        // dispatch(updateProfile(formData))

    }
    const paymentReceivedHandler = (id) => {
        const statusData = new FormData();
        statusData.set('paymentReceived', 'true');


        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure this client is paid?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, payment Received'
        }).then((result) => {
            if (result.isConfirmed) {

                dispatch(PaymentReceived(id, statusData))


                Swal.fire(
                    'Payment Received!',
                    'Thank you',
                    'success'
                )
                //closes the modal
                $('.close').click();

            }
        })


    }


    const confirmTransactionHandler = (id, workCompleted) => {
        const formData = new FormData();
        formData.set('freelancer', 'true');
        formData.set('client', 'true');
        formData.set('workCompleted', workCompleted);

        Swal.fire({
            title: 'Transaction is Done?',
            text: "Once you click done, you can't report this user anymore",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {

                dispatch(TransactionDone(id, formData))


                Swal.fire(
                    'Transaction Done!',
                    'Thank you',
                    'success'
                )
                //closes the modal
                $('.close').click();

            }
        })


    }


    const workDoneHandler = (id) => {
        const formData = new FormData();
        formData.set('freelancer', 'true');
        formData.set('client', 'false');

        Swal.fire({
            title: 'Are you sure?',
            text: "Did you already finish the work?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {

                dispatch(TransactionDone(id, formData))


                Swal.fire(
                    'Work Done!',
                    'Thank you',
                    'success'
                )
                //closes the modal
                $('.close').click();

            }
        })


    }

    function setUserRatings(id) {
        dispatch(SingleTransaction(id))
        const stars = document.querySelectorAll('.star');

        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            })
        })

        function showRatings(e) {

            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange');
                        // console.log(this.starValue);
                        setRating(this.starValue)
                    } else {
                        star.classList.remove('orange')
                    }
                }

                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow')
                    }
                }

                if (e.type === 'mouseout') {
                    star.classList.remove('yellow')
                }
            })
        }

    }
    // const deleteUserHandler = (id) => {
    //     dispatch(deleteUser(id))
    // }
    // const activateUserHandler = (id) => {
    //     dispatch(activateUser(id))

    // }
    // const deactivateUserHandler = (id) => {
    //     dispatch(deactivateUser(id))
    // }

    // SET FREELANCER TRANSACTION

    const setTransactions = () => {

        // console.log(transactions)

        const data = {
            columns: [

                {
                    label: 'Client',
                    field: 'Client'

                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Created At',
                    field: 'created_At',
                    sort: 'asc'
                },

                {
                    label: 'Payment Sent',
                    field: 'paymentSent'

                },
                {
                    label: 'Payment Received',
                    field: 'paymentReceived'

                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        const FreelancerTransactions = transactions.filter(function (ftransaction) {
            // return ftransaction.inquiry_id.freelancer.user_id._id === user._id;

            if (ftransaction.inquiry_id) {
                return ftransaction.inquiry_id.freelancer.user_id._id === user._id;
            }
            else if (ftransaction.offer_id) {
                return ftransaction.offer_id.offered_by === user._id;
            }

        });

        FreelancerTransactions.forEach(transaction => {

            // if( transaction.inquiry_id){
            //     setClientName(transaction.inquiry_id.customer.name)
            //     // return clientName;
            //   }else if(transaction.offer_id){
            //     setClientName(transaction.offer_id.request_id.requested_by.name)
            //     //    return clientName;
            //   }


            data.rows.push({


                // Client: clientName,
                status: transaction.status,
                created_At: moment(transaction.created_At).format('MMM/DD/yy'),
                paymentSent: transaction.paymentSent,
                paymentReceived: transaction.paymentReceived,

                actions: <Fragment>

                    <div className='action'>
                        {transaction.transaction_done && transaction.transaction_done.freelancer === 'false' && (
                            <Link to={''} className="btn btn-success py-1 px-2" onClick={() => workDoneHandler(transaction._id)} data-toggle="tooltip" data-placement="bottom" title="is Work done?">
                                <i className="fa fa-clipboard-check" ></i>
                            </Link>
                        )}

                        {/* {transaction.transaction_done && transaction.transaction_done.freelancer === 'true' && (
                    <Link to={''} className="btn py-1 px-2" data-toggle="tooltip" data-placement="bottom" title="Work is already Done - Not Clickable" disabled>
                        <i className="fa fa-clipboard-check" ></i>
                    </Link>
                    )} */}

                        {transaction && transaction.paymentReceived === 'false' && transaction.paymentSent === 'true' && (
                            <Link to={''} className="btn btn-primary py-1 px-2 ml-2" data-toggle="tooltip" data-placement="bottom" title="Confirm if client is Paid" onClick={() => (paymentReceivedHandler(transaction._id))}>
                                <i className="fa fa-hand-holding-usd" ></i>
                            </Link>
                        )}
                        {transaction && transaction.paymentSent === 'false' && (
                            <Link to={''} className="btn py-1 px-2 ml-2" data-toggle="tooltip" data-placement="bottom" title="Client is not paid yet - Not Clickable" disabled>
                                <i className="fa fa-hand-holding-usd" ></i>
                            </Link>
                        )}
                        {transaction && transaction.paymentReceived === 'true' && transaction.status === 'processing' && (
                            <Link to={''} className="btn py-1 px-2 ml-2" data-toggle="tooltip" data-placement="bottom" title="Payment is already Received - Not Clickable" disabled>
                                <i className="fa fa-hand-holding-usd" ></i>
                            </Link>
                        )}
                        {transaction && transaction.reportedBy.freelancer === 'false' && (
                            <div data-toggle="tooltip" data-placement="bottom" title="Report this Client" onClick={() => transactionDetailsHandler(transaction._id)}>
                                <Link to={''} className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target="#ReportServiceModal">
                                    <i className="fa fa-exclamation-circle" ></i>
                                </Link>
                            </div>
                        )}
                        {transaction && transaction.reportedBy.freelancer === 'true' && (
                            <div data-toggle="tooltip" data-placement="bottom" title="You reported this user already">
                                <Link to={''} className="btn py-1 px-2 ml-2" disabled>
                                    <i className="fa fa-exclamation-circle" ></i>
                                </Link>
                            </div>
                        )}
                    </div>

                </Fragment>
            })
        })

        return data;
    }

    // END FREELANCER TRANSACTION

    // SET CLIENT TRANSACTION
    const setClientTransactions = () => {

        const data = {
            columns: [

                {
                    label: 'Freelancer',
                    field: 'Freelancer'

                },

                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Created At',
                    field: 'created_At',
                    sort: 'asc'
                },

                {
                    label: 'PaymentSent?',
                    field: 'paymentSent',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        const ClientTransactions = transactions.filter(function (ctransaction) {
            if (ctransaction.inquiry_id) {
                return ctransaction.inquiry_id.customer._id === user._id;
            }
            else if (ctransaction.offer_id) {
                return ctransaction.offer_id.request_id.requested_by === user._id;
            }


        });

        ClientTransactions.forEach(ctransaction => {
            // if( ctransaction.inquiry_id){
            //     // {csetCount(count + 1)}
            //    setFreelancerName(ctransaction.inquiry_id.freelancer.user_id.name)
            //     // return clientName;
            //   }else if(ctransaction.offer_id){
            //    setFreelancerName(ctransaction.offer_id.offered_by.name)
            //     //    return clientName;
            //   }
            data.rows.push({


                // Freelancer: freelancerName,
                status: ctransaction.status,
                created_At: moment(ctransaction.created_At).format('MMM/DD/yy'),
                paymentSent: ctransaction.paymentSent,

                actions: <Fragment>
                    <div className='action'>
                        {ctransaction.paymentSent === 'false' && (
                            <Link to={''} className="btn btn-primary py-1 px-2 ml-2" data-toggle="modal" data-target="#PaymentDetailsModal" onClick={() => transactionDetailsHandler(ctransaction._id)}>
                                <i className="fa fa-coins" data-toggle="tooltip" data-placement="bottom" title="Make Payment"></i>
                            </Link>
                        )}

                        {ctransaction.paymentSent === 'true' && ctransaction.status === 'processing' && (
                            <Link to={''} className="btn py-1 px-2 ml-2" data-toggle="tooltip" data-placement="bottom" title="You already send payment" disabled>
                                <i className="fa fa-coins"></i>
                            </Link>
                        )}
                        {ctransaction && ctransaction.paymentSent === 'false' && (
                            <Link to={''} className="btn btn-success py-1 px-2 ml-2" onClick={() => Swal.fire(
                                'Warning!',
                                'You should proceed to make payment before clicking this button.',
                                'warning'
                            )}>
                                <i className="fa fa-check" data-toggle="tooltip" data-placement="bottom" title="Confirm if the transaction is done"></i>
                            </Link>
                        )}

                        {ctransaction && ctransaction.paymentSent === 'true' && ctransaction.transaction_done.freelancer === 'true' && ctransaction.status === 'processing' && (
                            <div data-toggle="tooltip" data-placement="bottom" title="Confirm if the transaction is done">
                                <Link to={''} className="btn btn-success py-1 px-2 ml-2" onClick={() => confirmTransactionHandler(ctransaction._id, ctransaction.transaction_done.workCompleted)}>
                                    <i className="fa fa-check" ></i>
                                </Link>
                            </div>
                        )}
                        {ctransaction && ctransaction.paymentSent === 'true' && ctransaction.transaction_done.freelancer === 'false' && (
                            <Link to={''} className="btn py-1 px-2 ml-2" data-toggle="tooltip" data-placement="bottom" title="Work of Freelancer is not Done yet - Not Clickable">
                                <i className="fa fa-check"  ></i>
                            </Link>
                        )}
                        {/* {ctransaction && ctransaction.paymentSent === 'false' && (
                    <Link to={''} className="btn py-1 px-2 ml-2" disabled>
                        <i className="fa fa-check"  data-toggle="tooltip" data-placement="bottom" title="Confirm if the transaction is done"></i>
                    </Link>
                )} */}

                        {ctransaction && ctransaction.transaction_done.client === 'true' && ctransaction.isRated === 'false' && (
                            <div data-toggle="tooltip" data-placement="bottom" title="Review or Rate the Service"  >
                                <Link to={''} className="btn btn-warning py-1 px-2 ml-2" data-toggle="modal" data-target="#RateServiceModal" onClick={() => { setUserRatings(ctransaction._id); }} >
                                    <i className="fa fa-star" ></i>
                                </Link>
                            </div>
                        )}


                        {ctransaction && ctransaction.transaction_done.client === 'false' && (
                            <div data-toggle="tooltip" data-placement="bottom" title="Report this Freelancer" onClick={() => transactionDetailsHandler(transaction._id)}>
                                <Link to={''} className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target="#ReportServiceModal">
                                    <i className="fa fa-exclamation-circle" ></i>
                                </Link>
                            </div>
                        )}
                    </div>
                </Fragment>

            })
        })

        return data;
    }
    //END CLIENT TRANSACTION

    return (

        <Fragment>
            <MetaData title={'My Transactions'} />




            {user && user.role === 'freelancer' && (
                <Fragment>
                    <h1 className="my-5">Transactions as a Freelancer

                    </h1>

                    {(loading && loadingpayment) ? <Loader /> : (
                        <MDBDataTable
                            data={setTransactions()}
                            className="px-3"
                            bordered
                            striped
                            hover
                        />
                    )}

                </Fragment>

            )}
            <Fragment>
                <h1 className="my-5">Transactions as a Client

                </h1>

                {(loading && loadingpayment) ? <Loader /> : (
                    <MDBDataTable
                        data={setClientTransactions()}
                        className="px-3"
                        bordered
                        striped
                        hover
                        id='mdbtable'
                    />
                )}

            </Fragment>



            {/* PAYMENT MODAL */}
            <Fragment>
                <div className="modal fade" id="PaymentDetailsModal" tabIndex="-1" role="dialog" aria-labelledby="PaymentDetailsModalTitle" aria-hidden="true" >
                    <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '800px' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="PaymentDetailsModalTitle">Payment</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form className="a" onSubmit={submitHandler} encType='multipart/form-data' >
                                {loadings ? <Loader /> : (
                                    <div className="modal-body">

                                        <div className='row' >


                                            <div className='sixty' style={{ width: '60%', backgroundColor: 'transparent', padding: '10px' }}>
                                                <img
                                                    src={transaction.inquiry_id && transaction.inquiry_id.freelancer.user_id.avatar.url}
                                                    // alt={service.user && service.user.name}
                                                    // key={service._id}
                                                    // src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                                                    className="rounded-img-big"


                                                />
                                                <h4>Amount to pay: 100</h4>
                                                {/* <h4>Gcash Name: {transaction.isPaid}</h4> */}
                                                <h4>Gcash Name: {transaction.inquiry_id && transaction.inquiry_id.freelancer.gcash_name}</h4>
                                                <h4>Gcash Number: {transaction.inquiry_id && transaction.inquiry_id.freelancer.gcash_num}</h4>
                                            </div>
                                            <div className='forty' style={{ width: '40%', backgroundColor: 'transparent', alignContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>

                                                <img
                                                    src={transaction.inquiry_id && transaction.inquiry_id.freelancer.qrCode.url}
                                                    style={{ height: '250px', width: '250px', border: '5px solid', margin: '10px' }}


                                                />
                                                <h4>Gcash QR Code</h4>
                                            </div>


                                        </div>









                                    </div>
                                )}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" >Payment Done</button>


                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </Fragment>


            {/* RATE SERVICE MODAL */}
            <Fragment>
                <div className="modal fade" id="RateServiceModal" tabIndex="-1" role="dialog" aria-labelledby="RateServiceModalTitle" aria-hidden="true" >
                    <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '800px' }}>
                        <div className="modal-content" >
                            <div className="modal-header">
                                <h5 className="modal-title" id="RateServiceModalTitle">Rate Service</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <form className="a" onSubmit={submitRateHandler} encType='multipart/form-data' >

                                <div className="modal-body">

                                    <div style={{ padding: '10px 10px' }}>
                                        {loadings ? <Loader /> : (
                                            <div style={{ display: 'block' }}>
                                                <div>
                                                    <span>
                                                        <div style={{ display: 'block' }}></div>
                                                        <div className='imagePriceColumn'>
                                                            <div className='picFrame' style={{ border: '1px solid #e1e1e1', background: '#e1e1e1' }}>
                                                                <div style={{ position: 'relative' }}>

                                                                    <div>
                                                                        <img src={transaction.inquiry_id && transaction.inquiry_id.service_id.image} className='picFrame' />
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div>

                                                            </div>
                                                        </div>

                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        <p>Service Rating: </p>
                                        <ul className="stars" >
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                        </ul>

                                        <label>Comments: </label>
                                        <textarea
                                            name="comment"
                                            id="comment" className="form-control mt-3"
                                            style={{ minHeight: '200px' }}
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        >
                                        </textarea>
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
        </Fragment>
    )
}

export default MyTransactions