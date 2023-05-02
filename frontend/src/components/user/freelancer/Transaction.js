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

    const dispatch = useDispatch();

    const alert = useAlert();


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

    return (


        <div className='servicecontainer'>
            {/* 1st div */}
            <div>
                <div style={{ padding: '12px 24px', background: '#fff' }}>
                    <div className='firsthalf'>
                        {transaction.inquiry_id && !transaction.offer_id && (
                            <div className='firstColumn'>

                                <img className='small-circle' src={transaction.inquiry_id.customer.avatar.url} />

                                <div className='freelancer'>
                                    {transaction.inquiry_id.customer.name}
                                </div>

                                <div style={{ margin: '0 0 0 8px' }}>

                                </div>

                            </div>
                        )}
                        {transaction.offer_id && !transaction.inquiry_id && (
                            <div className='firstColumn'>



                                <img className='small-circle' src={transaction.offer_id.request_id.requested_by.avatar.url} />




                                <div className='freelancer'>
                                    {transaction.offer_id.request_id.requested_by.name}
                                </div>

                                <div style={{ margin: '0 0 0 8px' }}>

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
                                                    {transaction.inquiry_id && transaction.offer_id && (
                                                        <img src={transaction.inquiry_id.service_id.image} className='picFrame' />
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
                    {/* {transaction && transaction.transaction_done.client === 'true' && transaction.isRated === 'false' && (
                <div className='inTransDiv'>
                    <button className='buttonInTrans' style={{border:'1px solid transparent', backgroundColor:'#ee4d2d', color:'#fff'}}>Rate</button>
                </div>
            )} */}
                    {/* {transaction.paymentSent === 'false' && (
                    <div className='inTransDiv'>
                    <button className='buttonInTrans' style={{border:'1px solid transparent', backgroundColor:'#0fa0dc', color:'#fff'}}>Make Payment</button>
                </div>
                )} */}
                    {transaction.transaction_done && transaction.transaction_done.freelancer === 'false' && (
                        <div className='inTransDiv'>
                            <button className='buttonInTrans' style={{ border: '1px solid transparent', backgroundColor: '#0fa0dc', color: '#fff' }} onClick={() => workDoneHandler(transaction._id)} data-toggle="tooltip" data-placement="bottom" title="is Work done?">Work Done</button>
                        </div>
                    )}
                    {transaction && transaction.paymentReceived === 'false' && transaction.paymentSent === 'true' && (
                        <div className='inTransDiv'>
                            <button className='buttonInTrans' style={{ border: '1px solid transparent', backgroundColor: '#0fa0dc', color: '#fff' }} data-toggle="tooltip" data-placement="bottom" title="Confirm if client is Paid" onClick={() => (paymentReceivedHandler(transaction._id))}>Payment Received</button>
                        </div>
                    )}
                    <div className='inTransDiv'>
                        <button className='buttonInTrans' style={{ border: '1px solid rgba(0,0,0,.09)', color: '#555' }}>Contact Client</button>
                    </div>
                    {transaction && transaction.transaction_done.client === 'false' && (
                        <div className='inTransDiv'>
                            <button className='buttonInTransCircle' style={{ backgroundColor: 'transparent', color: 'red' }}> <i className="fas fa-exclamation-circle" data-toggle="tooltip" data-placement="bottom" title='Report this Freelancer'></i></button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Transaction