import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment/moment'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'


import Swal from 'sweetalert2';
import $ from 'jquery';


import { getTransactions, clearErrors, SingleTransaction, PaymentReceived, PaymentSent, TransactionDone, RateDone, ReportDone } from '../../../actions/transactionActions'

const Transaction = ({ transaction }) => {
    // console.log(users)

    const { user, isAuthenticated } = useSelector(state => state.auth)
    // const { loadings, detailserror, transaction } = useSelector(state => state.transactionDetails);
    const dispatch = useDispatch();

    const alert = useAlert();
    const [rating, setRating] = useState(0);

    useEffect(() => {
        // dispatch(allUsers())

        // if (error) {
        //     alert.error(error);
        //     dispatch(clearErrors())
        // }

        // if (isDeleted) {
        //     alert.success('Animal deleted successfully');
        //     navigate('/animals');
        //     dispatch({ type: DELETE_ANIMALS_RESET })
        // }
        // for (let index = 0; index < 3; index++) {

        //     if (service.user_id == users[index]._id) {
        //         const i = index;
        //         console.log(i)
        //     }


        // }

    }, [dispatch, alert])

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

    return (
        <Fragment>

            <div className='servicecontainer'>
                {/* 1st div */}
                <div>
                    <div style={{ padding: '12px 24px', background: '#fff' }}>
                        <div className='firsthalf'>

                            {transaction.inquiry_id && !transaction.offer_id && (


                                <div className='firstColumn'>


                                    <img className='small-circle' src={transaction.inquiry_id.freelancer.user_id.avatar.url} />




                                    <div className='freelancer'>
                                        {transaction.inquiry_id.freelancer.gcash_name}
                                    </div>



                                    <div style={{ margin: '0 0 0 8px' }}>

                                        <Link to={`/service/details/${transaction.inquiry_id.service_id._id}`}>
                                            <button className='viewShop'>view Service</button></Link>
                                    </div>



                                </div>
                            )}

                            {transaction.offer_id && !transaction.inquiry_id && (


                                <div className='firstColumn'>


                                    <div className='pictureDapat'>
                                        <img className='small-circle' src={transaction.offer_id.offered_by.avatar.url} />
                                    </div>



                                    <div className='freelancer'>
                                        {transaction.offer_id.offered_by.name}
                                    </div>



                                    <div style={{ margin: '0 0 0 8px' }}>

                                        <Link to={`/service/details/${transaction.offer_id.service_id}`}>
                                            <button className='viewShop'>view Service</button></Link>
                                    </div>


                                </div>
                            )}

                            {transaction.inquiry_id && transaction.offer_id && (


                                <div className='firstColumn'>


                                    <img className='small-circle' src={transaction.inquiry_id.freelancer.user_id.avatar.url} />




                                    <div className='freelancer'>
                                        {transaction.inquiry_id.freelancer.gcash_name}
                                    </div>



                                    <div style={{ margin: '0 0 0 8px' }}>

                                        <Link to={`/service/details/${transaction.inquiry_id.service_id._id}`}>
                                            <button className='viewShop'>view Service</button></Link>
                                    </div>



                                </div>
                            )}


                            <div>
                                <div style={{ padding: '0 0 0 10px', display: 'flex', alignItems: 'center' }}>
                                    <div style={{ display: 'block' }}>
                                        {/* <div>  parcel has been delivered </div> */}
                                        {/* <div>? </div> */}
                                    </div>
                                    <div className='statusDescription'>
                                        {transaction.status}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='dividerLine'></div>
                        <a>
                            <div style={{ display: 'block' }}>
                                <div>
                                    <span>
                                        <div style={{ display: 'block' }}></div>
                                        <div className='imagePriceColumn'>
                                            <div className='picFrame' style={{ border: '1px solid #e1e1e1', background: '#e1e1e1' }}>
                                                <div style={{ position: 'relative' }}>

                                                    <div>
                                                        {transaction.inquiry_id && !transaction.offer_id && (
                                                            <img src={transaction.inquiry_id.service_id.image} className='picFrame' />
                                                        )}
                                                        {transaction.offer_id && !transaction.inquiry_id && (
                                                            <img src={transaction.offer_id.service_id.image} className='picFrame' />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div>

                                            </div>
                                        </div>

                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                {/* 2nd div */}
                <div className='circlecut'>
                    <div style={{ left: '0', transform: 'translate(-50%,-50%)' }}></div>
                    <div style={{ right: '0', transform: 'translate(50%,-50%)' }}></div>
                </div>

                <div className='buttoncontainer'>
                    <div className='bottomInfo'>Date Created: {moment(transaction.created_At).format('MMM/DD/yy')}</div>
                    <div style={{ display: 'flex', overflow: 'hidden' }}>
                        {transaction && transaction.transaction_done.client === 'true' && transaction.isRated === 'false' && (
                            <div className='inTransDiv'>
                                <button className='buttonInTrans' style={{ border: '1px solid transparent', backgroundColor: '#ee4d2d', color: '#fff' }} data-toggle="modal" data-target="#RateServiceModal" onClick={() => { setUserRatings(transaction._id); }}>Rate</button>
                            </div>
                        )}
                        {transaction.paymentSent === 'false' && (
                            <div className='inTransDiv'>
                                <button className='buttonInTrans' style={{ border: '1px solid transparent', backgroundColor: '#0fa0dc', color: '#fff' }} data-toggle="modal" data-target="#PaymentDetailsModal" onClick={() => transactionDetailsHandler(transaction._id)}>Make Payment</button>
                            </div>
                        )}
                        {transaction && transaction.paymentSent === 'true' && transaction.transaction_done.freelancer === 'true' && transaction.status === 'processing' && (
                            <div className='inTransDiv'>
                                <button className='buttonInTrans' style={{ border: '1px solid transparent', backgroundColor: '#0fa0dc', color: '#fff' }} data-toggle="tooltip" data-placement="bottom" title="Confirm if the transaction is done" onClick={() => confirmTransactionHandler(transaction._id, transaction.transaction_done.workCompleted)}>Transction Done</button>
                            </div>
                        )}

                        <div className='inTransDiv'>
                            <button className='buttonInTrans' style={{ border: '1px solid rgba(0,0,0,.09)', color: '#555' }}>Contact Freelancer</button>
                        </div>
                        {transaction && transaction.transaction_done.client === 'false' && (
                            <div className='inTransDiv'>
                                <button className='buttonInTransCircle' style={{ backgroundColor: 'transparent', color: 'red' }}> <i className="fas fa-exclamation-circle" data-toggle="tooltip" data-placement="bottom" title='Report this Freelancer'></i></button>
                            </div>
                        )}
                    </div>
                </div>

            </div>




        </Fragment>
    )
}
export default Transaction