import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { useParams,  } from "react-router-dom";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import socket from '../../../Context/socket'
import Swal from 'sweetalert2'
import { NEW_CHAT_RESET } from '../../../constants/chatConstants'

import { UPDATE_OFFER_RESET } from '../../../constants/offerConstants'

import { CancelOtherOffer, AcceptOffer } from '../../../actions/offerActions'
import { newTransaction, clearErrors } from '../../../actions/transactionActions';
import { accessChat } from '../../../actions/chatActions';

const Offers = ({ offer, setSelectedOffer }) => {
    // console.log(users)

    const { user, isAuthenticated } = useSelector(state => state.auth)
    const { success } = useSelector(state => state.newChat)
    const { offer: updatedOffer, updateloading, success: isUpdated } = useSelector((state) => state.updateoffer);

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const alert = useAlert();








    return (


        <Fragment>
            {/* <div style={{}}>




                <div className="card" id='card-rectangle' style={{ justifyContent: 'space-between', display: 'flex' }}>
                    <img className='imgcard' ></img>

                    <div className="card__label">{offer.offer_status}</div>
                    <div className="card__inqcontent">

                        <h4 className="card__info">Service: {offer.offer_status}</h4>
                       
                        <h5 className="card__info">Status: {offer.offer_status}</h5>
                        <div className='row' style={{ display: 'flex', flexDirection: 'row', flex: '50%' }}><center>Freelancer: </center>
                            <div style={{
                                width: 25,
                                height: 25,
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: 50,
                                backgroundColor: 'gainsboro',
                            }}>
                                <img style={{
                                    height: 25,
                                    width: 'auto'
                                }}></img>
                            </div>
                            <center className="justified" href="" style={{ fontSize: '20px' }}>{offer.offer_status}</center>

                        </div>
                        <h5 className="card__info">Date inquired: 02/13/2023</h5>
                       

                    </div>
                    <div className="card__btn-container">
                        <button className="card__btn">



                            <Link to={`/service/details/${offer.offer_status}`}>Details</Link>

                        </button>


                        &&
                        <button className="card__btn">




                            <Link to={''} data-toggle="tooltip" data-placement="bottom" title="Cancel Inquiry">

                                Cancel
                            </Link>

                        </button>

                    </div>
                </div>

                
            </div> */}
            <div className='servicecontainer' style={{ width: '100%' }}>
                {/* 1st div */}
                <div>
                    <div style={{ padding: '12px 24px', background: '#fff' }}>
                        <div className='firsthalf'>
                            <div className='firstColumn'>
                                {/* // */}
                                <div className="post-author-info">
                                    <img src={offer.offered_by.avatar.url} />
                                    <div>
                                        <div>
                                            {/* <div className="card__label-right" style={{ fontSize: '12px' }}>{offer.offered_by.name}</div> */}
                                            <span className="author-name">{offer.offered_by.name}</span>
                                            <i className="verified-icon"></i>
                                        </div>
                                        {/* <div className="details">
                                            <span>{moment(request.created_At).fromNow()}</span>
                                            <span> · </span>
                                            <i className="post-settings-icon"></i>
                                        </div> */}
                                    </div>
                                </div>
                                {/* // */}
                                <div className='freelancer'>
                                    {offer.offer_status}
                                </div>
                                <div style={{ margin: '0 0 0 8px' }}>
                                    <button className='viewShop'>view Service</button>
                                </div>

                            </div>
                            <div>
                                <div style={{ padding: '0 0 0 10px', display: 'flex', alignItems: 'center' }}>
                                    <div style={{ display: 'block' }}>
                                        {/* <div>  parcel has been delivered </div> */}
                                        {/* <div>? </div> */}
                                    </div>
                                    <div className='statusDescription'>
                                        ₱{offer.price}
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
                                            <p>{offer.description}</p>
                                            {/* <div className='picFrame' style={{ border: '1px solid #e1e1e1', background: '#e1e1e1' }}>
                                                <div style={{ position: 'relative' }}>

                                                    <div>
                                                        <img className='picFrame' />
                                                    </div>
                                                </div>
                                            </div> */}
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
                    <div className='bottomInfo'></div>
                    <div style={{ display: 'flex', overflow: 'hidden' }}>
                        <div className='inTransDiv'>
                            <button className='buttonInTrans' style={{ border: '1px solid transparent', backgroundColor: '#ee4d2d', color: '#fff' }} onClick={() => setSelectedOffer(offer)} >Accept</button>
                        </div>
                        {/* <div className='inTransDiv'>
                            <button className='buttonInTrans' style={{ border: '1px solid rgba(0,0,0,.09)', color: '#555' }}>Contact Seller</button>
                        </div> */}
                        <div className='inTransDiv'>
                            <button className='buttonInTransCircle' style={{ backgroundColor: 'transparent', color: 'red' }}> <i className="fas fa-exclamation-circle" data-toggle="tooltip" data-placement="bottom" title='Report this Freelancer'></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>

    )
}
export default Offers