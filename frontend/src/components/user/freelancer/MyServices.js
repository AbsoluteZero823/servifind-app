import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../../layout/MetaData'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import Loader from '../../layout/Loader';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from "react-router-dom";

import { getFreelancerServices } from '../../../actions/serviceActions';

const MyServices = () => {
    const { user, isAuthenticated } = useSelector(state => state.auth)
    const { services, loading } = useSelector(state => state.services)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {


        if (user) {
            dispatch(getFreelancerServices(user.freelancer_id._id))
        }
    }, [])

    const isPremium = () => {
        // Swal.fire(
        //     'Information',
        //     'Basic Account are limited to one service only. Try to upgrade your account to premium',
        //     'info',

        // )
        Swal.fire({
            title: 'Go to Premium Application Page?',
            text: "Basic Account are limited to one service only. Try to upgrade your account to premium",
            icon: 'info',
            showCancelButton: true,
            cancelButtonText: "Later",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: 'gray',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/premium`)
            }
        })
    }
    const setTableData = () => {

        const data = {
            columns: [

                {
                    label: 'Image',
                    field: 'images'

                },
                {
                    label: 'Name',
                    field: 'name'

                },
                {
                    label: 'category',
                    field: 'category',
                    sort: 'asc'
                },

                {
                    label: 'Price Starts At',
                    field: 'priceStarts_At',
                    sort: 'asc'
                },
                // {
                //     label: 'Created At',
                //     field: 'created_At'

                // },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }


        services.forEach(service => {

            data.rows.push({


                images: <Fragment>

                    <img
                        className="anim"
                        src={service.images.url}
                    />

                </Fragment>,
                name: service.name,
                category: service.category.name,
                priceStarts_At:
                    <Fragment>
                        <p>₱{service.priceStarts_At}</p>
                    </Fragment>
                ,

                // created_At: moment(freelancer.user_id.created_At).format('MMM/DD/yy'),

                actions: <Fragment>

                    <div className='action'>
                        <Link to='' className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil-alt"></i>
                        </Link>
                        <button className="btn btn-danger py-1 px-2 ml-2" >
                            <i className="fa fa-trash"></i>
                        </button>
                        {/* <Link to={''} className="btn btn-success py-1 px-2" onClick={() => approveApplicationHandler(freelancer._id)}>
                            <div data-toggle="tooltip" title='Approve Application'>
                                <i className="fa fa-check" ></i>
                            </div>
                        </Link>
                        <Link to={''} className="btn btn-danger py-1 px-2" onClick={() => rejectApplicationHandler(freelancer._id)}>
                            <div data-toggle="tooltip" title='Reject Application'>
                                <i className="fa fa-times"></i>
                            </div>
                        </Link> */}



                    </div>

                </Fragment>
            })
        })

        return data;
    }
    return (
        <Fragment>

            <div className='forTable'>

                <div style={{ padding: '0', margin: '0', display: 'flex', justifyContent: 'space-between' }}>
                    <h1 style={{ padding: '0 !important', margin: '0 !important' }}>My Services</h1>
                    {user && user.freelancer_id.isPremium ? (
                        <h3 style={{ margin: 'auto 0px' }}>Add Service
                            <span> <Link to="/service/new" className="btn update-btn fa fa-plus">
                            </Link> </span>
                        </h3>
                    ) : (
                        <h3 style={{ margin: 'auto 0px' }}>Add Service
                            <span> <button className="btn update-btn fa fa-plus" onClick={() => isPremium()}>
                            </button> </span>
                        </h3>
                    )
                    }

                </div>

                <Fragment>
                    <MetaData title={'My Services'} />




                    {user && user.role === 'freelancer' && (
                        <Fragment>


                            {loading ? <Loader /> : (
                                <MDBDataTable
                                    data={setTableData()}
                                    className="px-3"
                                    bordered
                                    striped
                                    hover
                                    scrollY

                                    maxHeight='48vh'
                                />
                            )}

                        </Fragment>

                    )}








                </Fragment>




            </div >

        </Fragment>

    )
}

export default MyServices