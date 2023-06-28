import React, { Fragment, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import Swal from 'sweetalert2';
import $ from 'jquery';
import moment from 'moment/moment'
import socket from '../Context/socket';
import Loader from './layout/Loader';

import { getServices } from '../actions/serviceActions';
// import { getFreelancerServices } from '../actions/serviceActions';
import { SingleRequest } from '../actions/requestActions';


// import { newOffer } from '../actions/offerActions'

const Request = ({ request, services, setSelectedRequest }) => {




    const alert = useAlert();
    const dispatch = useDispatch();


    // const { users } = useSelector(state => state.users)
    // const { loading, services, error, servicesCount, resPerPage, filteredServicesCount } = useSelector(state => state.services);

    // const { services } = useSelector(state => state.freelancerServices);
    // const { loading, error, transactions } = useSelector(state => state.transactions);
    const { loadings, detailserror, transaction } = useSelector(state => state.transactionDetails);
    const { error, singlerequest } = useSelector(state => state.requestDetails);

    const { user, isAuthenticated } = useSelector(state => state.auth)

    // const [service_id, setServiceId] = useState('');
    // const [description, setDescription] = useState('');
    // const [price, setPrice] = useState('');
    // const [request_id, setRequestId] = useState('');

    useEffect(() => {
        if (error) {

            return alert.error(error)
        }


        // if(request_id){
        //     setRequestId(request_id);
        // }

        //     if(user.role === 'freelancer'){
        //         dispatch(getFreelancerServices(user.freelancer_id._id));
        //    }

    }, [dispatch, alert, error]);

    // useEffect(() => {

    //     if(user.role === 'freelancer'){
    //         dispatch(getFreelancerServices(user.freelancer_id._id));
    //    }

    // }, []);

    // const requestDetailsHandler = (id) => {
    //     dispatch(SingleRequest(id))



    // }


    const SwalAlert = () => {
        Swal.fire(
            'This is your own request',
            'You cant offer on your request',
            'warning'
        )
    }


    // const MyServices = services.filter(function (service) {
    //     return service.user._id === user._id;

    // });

    return (

        <Fragment>

            <div className="card post" style={{ margin: 'auto', margin: "10px 0px", flexDirection: 'column' }}>
                <div className="post-header">
                    <div className="post-author-info">
                        <img src={request.requested_by.avatar.url} />
                        <div>
                            <div>
                                <div className="card__label-right" style={{ fontSize: '12px' }}>{request.category.name}</div>
                                <span className="author-name">{request.requested_by.name}</span>
                                <i className="verified-icon"></i>
                            </div>
                            <div className="details">
                                <span>{moment(request.created_At).fromNow()}</span>
                                <span> · </span>
                                <i className="post-settings-icon"></i>
                            </div>
                        </div>
                    </div>
                    <i className="post-menu-icon"></i>
                </div>

                <p className="post-body">{request.description}</p>

                <div className="post-reactions">

                </div>
                <div className='dividerLine'></div>
                {user.role === 'freelancer' && (
                    <div className="post-actions">
                        <div className="actions">
                            {request.requested_by._id === user._id && (
                                <div className="action" onClick={() => SwalAlert()}>
                                    {/* <i className="like-icon"></i> */}
                                    <a href="#">
                                        <span>Make an Offer</span>
                                    </a>

                                </div>

                            )}
                            {request.requested_by._id !== user._id && (
                                <div name={request._id} className="action" data-toggle="modal" data-target="#MakeOfferModal" onClick={() => setSelectedRequest(request._id)}>
                                    {/* <i className="like-icon"></i> */}
                                    <a href="#">
                                        <span>Make an Offer</span>
                                    </a>

                                </div>

                            )}
                        </div>

                    </div>
                )}


            </div>


        </Fragment>

    );
}
export default Request
