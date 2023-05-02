import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../layout/Loader';

import Swal from 'sweetalert2';
import $ from 'jquery';

import { availPremium } from '../../../actions/freelancerActions';
const Premium = () => {

    const dispatch = useDispatch();

    const [receipt, setReceipt] = useState('')
    const [receiptName, setReceiptName] = useState('')

    const { freelancer, isUpdated } = useSelector(state => state.updateFreelancer)

    const OnChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {

                setReceipt(reader.result)
                setReceiptName(e.target.files[0].name)

            }
        }

        reader.readAsDataURL(e.target.files[0])

    }

    const submitHandler = (e) => {
        e.preventDefault();
        const freelancerData = new FormData();
        freelancerData.set('premiumReceipt', receipt);
        Swal.fire({
            title: 'is Payment Done?',
            text: "",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, payment is done'
        }).then((result) => {
            if (result.isConfirmed) {

                dispatch(availPremium(freelancerData));

                Swal.fire(
                    'Payment Sent!',
                    'Wait for the admin to verify your payment',
                    'success'
                )
                //closes the modal
                $('.close').click();

            }
        })


    }


    return (
        <Fragment>
            <div className="subscription__plan-container">
                <h1>Pricing</h1>
                <div className="subscription__wrapper-card">
                    <div className="subscription__card-basic">
                        <div className="subscription-header">
                            <h2>Basic</h2>
                            <h2>₱0
                                {/* <span>/ Month</span> */}
                            </h2>
                        </div>
                        <p>
                            <img src="images/iconmonstr-check-mark-7-24 (1).png" alt="" />
                            All time links
                        </p>
                        <p>
                            <img src="images/iconmonstr-check-mark-7-24 (1).png" alt="" />
                            Basic Features
                        </p>
                        <p>
                            <img src="images/iconmonstr-check-mark-7-24 (1).png" alt="" />
                            No unlimited features
                        </p>
                        <p>
                            <img src="images/iconmonstr-check-mark-7-24 (1).png" alt="" />
                            Limited functions
                        </p>
                        <button disabled>Current Plan</button>
                    </div>
                    <div className="subscription__card-premium">
                        <div className="subscription-header">
                            <h2>Premium</h2>
                            <h2>₱50
                                {/* <span>/ Month</span> */}
                            </h2>
                        </div>
                        <p>
                            <img src="images/iconmonstr-check-mark-7-24 (1).png" alt="" />
                            All time links
                        </p>
                        <p>
                            <img src="images/iconmonstr-check-mark-7-24 (1).png" alt="" />
                            Basic Features
                        </p>
                        <p>
                            <img src="images/iconmonstr-check-mark-7-24 (1).png" alt="" />
                            No unlimited features
                        </p>
                        <p>
                            <img src="images/iconmonstr-check-mark-7-24 (1).png" alt="" />
                            Limited functions
                        </p>
                        <button data-toggle="modal" data-target="#PaymentDetailsModal">Choose Plan</button>
                    </div>
                </div>
            </div>

            {/* PAYMENT MODAL */}
            <Fragment>
                <div className="modal fade" id="PaymentDetailsModal" tabIndex="-1" role="dialog" aria-labelledby="PaymentDetailsModalTitle" aria-hidden="true" >
                    <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '900px' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="PaymentDetailsModalTitle">Payment</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form className="a" onSubmit={submitHandler} encType='multipart/form-data' >
                                {/* {loadings ? <Loader /> : ( */}
                                <div className="modal-body">

                                    <div className='row' >


                                        <div className='sixty' style={{ width: '60%', backgroundColor: 'transparent', padding: '10px' }}>
                                            {/* <img
                                                // src={transaction.inquiry_id && transaction.inquiry_id.freelancer.user_id.avatar.url}
                                                // alt={service.user && service.user.name}
                                                // key={service._id}
                                                // src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                                                className="rounded-img-big"


                                            /> */}
                                            <h4>Amount to pay: ₱50</h4>
                                            {/* <h4>Gcash Name: {transaction.isPaid}</h4> */}
                                            <h4>Gcash Name: Kendrick Galan</h4>
                                            <h4>Gcash Number: 09705684000</h4>

                                            <div className='form-group'>
                                                <br />
                                                <label htmlFor="email_field">GCash Receipt</label>
                                                <div className='d-flex align-items-center'>
                                                    {/* <div>
                        <figure className='avatar mr-3 item-rtl'>
                            <img
                                // src={avatarPreview}
                                className='rounded-circle'
                                alt='Avatar Preview'
                            />
                        </figure>
                    </div> */}
                                                    <div className='custom-file'>
                                                        <input
                                                            type='file'
                                                            name='avatar'
                                                            className='custom-file-input'
                                                            id='customFile'
                                                            accept='image/*'
                                                            required
                                                            onChange={OnChange}
                                                        />

                                                        {receiptName ? (
                                                            <label className='custom-file-label' htmlFor='customFile'>

                                                                {receiptName}

                                                            </label>

                                                        ) : (
                                                            <label className='custom-file-label' htmlFor='customFile'>

                                                                Attach screenshot

                                                            </label>

                                                        )
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='forty' style={{ width: '40%', backgroundColor: 'transparent', alignContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>

                                            <img
                                                src='https://res.cloudinary.com/dawhmjhu1/image/upload/v1681745281/servifind/photo1681745194_ad8slz.jpg'
                                                style={{
                                                    height: '50vh',
                                                    width: '35vh', border: '5px solid', margin: '10px'
                                                }}


                                            />
                                            <h4>Gcash QR Code</h4>
                                        </div>


                                    </div>







                                </div>
                                {/* )} */}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" >Payment Done</button>


                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </Fragment>
        </Fragment>
    )
}

export default Premium