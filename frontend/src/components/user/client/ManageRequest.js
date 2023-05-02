
import React, { Fragment, useState, useEffect } from 'react'

import { Link, useParams } from "react-router-dom";
import MetaData from '../../layout/MetaData';

import Loader from '../../layout/Loader';
import Swal from 'sweetalert2';
import { MDBDataTable } from 'mdbreact'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getCategories, clearErrors, newCategory } from '../../../actions/categoryActions';
import { newRequest } from '../../../actions/requestActions';
import { useNavigate } from 'react-router-dom';
import { getRequests, clear } from '../../../actions/requestActions';
import { getOffers } from '../../../actions/offerActions';

import moment from 'moment/moment'



const ManageRequest = () => {


    const alert = useAlert();
    const dispatch = useDispatch();

    let navigate = useNavigate();


    // const { loading, error, categories } = useSelector(state => state.categories);
    const { user, isAuthenticated } = useSelector(state => state.auth)
    const { loading, error, requests } = useSelector(state => state.requests);
    const { offers } = useSelector(state => state.offers);
    // const { success } = useSelector(state => state.addRequest);



    useEffect(() => {

        dispatch(getRequests())
        dispatch(getOffers())
        // if (success) {
        //     navigate('/manage-request');
        //     // alert.success('Service created successfully');
        //     Swal.fire(
        //         'Request Successfully Created!',
        //         '',
        //         'success'
        //     )
        //     dispatch({ type: NEW_CATEGORY_RESET })
        // }

    }, [dispatch, alert, error, navigate])

    const getOffersHandler = (id) => {


        navigate(`/offers-request/${id}`);
        // const requestOffers = offers.filter(function (o) {
        //     return o.request_id === id;

        // });

        // if (requestOffers.length === 0) {
        //     console.log('no offers yet');
        // }
        // else {
        //     console.log(requestOffers);
        // }
        // return requestOffers;
    }


    const setOffers = () => {

        const data = {
            columns: [

                {
                    label: 'Date',
                    field: 'created_At'

                },

                {
                    label: 'Request/Description',
                    field: 'description',

                },
                {
                    label: 'Status',
                    field: 'request_status',


                },

                {
                    label: 'Offers',
                    field: 'offers',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        let MyRequests = requests.filter(function (myrequest) {
            return myrequest.requested_by._id === user._id;

        });
        MyRequests = MyRequests.sort((a, b) => {
            let fa = a.request_status.toLowerCase(),
                fb = b.request_status.toLowerCase();

            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0;
        });
        MyRequests.forEach(request => {
            const requestOffers = offers.filter(function (o) {
                return o.request_id === request._id;

            });

            const offersCount = requestOffers.length;
            // if (requestOffers.length === 0) {
            //     console.log('no offers yet');
            // }
            // else {
            //     console.log(requestOffers);
            // }
            data.rows.push({

                created_At: moment(request.created_At).format('MMM/DD/yy'),
                description: request.description,
                request_status: request.request_status,

                offers: <Fragment>
                    {offersCount === 0 && (
                        <div className='offers' onClick={() => Swal.fire('No offers yet',
                            'This request has empty offers',
                            'info'
                        )}>

                            <a href="#" className="notification">
                                <span style={{ color: 'white' }}>Offers</span>
                                {/* <span className="badge">{offersCount}</span> */}

                            </a>


                        </div>
                    )}
                    {offersCount > 0 && (
                        <div className='offers' onClick={() => getOffersHandler(request._id)}>
                            <a href="#" className="notification">
                                <span style={{ color: 'white' }}>Offers</span>
                                <span className="badge">{offersCount}</span>
                                {/* <i className="fa fa-pencil-alt"></i> */}
                            </a>
                        </div>
                    )}
                </Fragment>,

                actions: <Fragment>
                    <div className='action'>
                        <button className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil-alt"></i>
                        </button>
                        {/* <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(service._id)}> */}
                        <button className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </Fragment>

            })
        })

        return data;
    }



    return (

        <Fragment>
            <MetaData title={'Manage Requests'} />
            <div className='forTable'>
                <div className='container'>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '30px 0px' }}>
                        <div><h1 style={{ color: 'black' }}>Manage Requests</h1></div>
                        <div >
                            <Link to={'/post-request'}><button className='nav-button'>Post a Request</button></Link>
                        </div>
                    </div>
                </div>
                <Fragment>

                    {loading ? <Loader /> : (
                        <MDBDataTable
                            data={setOffers()}
                            className="px-3"
                            bordered
                            striped
                            hover
                            id='mdbtable'
                            scrollY
                            maxHeight='48vh'
                        />
                    )}

                </Fragment> </div>
        </Fragment>
    );
}
export default ManageRequest
