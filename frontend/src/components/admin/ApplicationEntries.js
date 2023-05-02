import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { MDBDataTable } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment/moment'
import Swal from 'sweetalert2';
import $ from 'jquery';

import { getApplicationEntries, clearErrors, approveApplication, rejectApplication } from '../../actions/freelancerActions'
import { APPROVE_APPLICATION_RESET, REJECT_APPLICATION_RESET } from '../../constants/freelancerConstants'

const ApplicationEntries = () => {

    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector(state => state.auth)
    const { applyingfreelancers, success, error, loading } = useSelector(state => state.applying)
    const { freelancer, isUpdated } = useSelector(state => state.updateFreelancer)

    const [resume, setResume] = useState('')
    const [schoolID, setSchoolID] = useState('')

    useEffect(() => {
        dispatch(getApplicationEntries());
        if (success) {
            console.log(applyingfreelancers)
        }

        if (isUpdated) {
            dispatch({ type: APPROVE_APPLICATION_RESET })
            dispatch({ type: REJECT_APPLICATION_RESET })
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, error, success, isUpdated])


    const approveApplicationHandler = (id) => {
        Swal.fire({
            title: 'Are you Sure?',
            text: "Accepting this Application will make this student acquire a freelancer role.",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Approve'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(approveApplication(id))


                Swal.fire(
                    'Success',

                    'success'
                )
                //closes the modal
                $('.close').click();

            }
        })



    }
    const rejectApplicationHandler = (id) => {

        Swal.fire({
            title: 'Are you Sure?',
            text: "Rejecting this Application will prohibit this student to become a freelancer.",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Reject'
        }).then((result) => {
            if (result.isConfirmed) {

                dispatch(rejectApplication(id))

                Swal.fire(
                    'Reject Success',

                    'success'
                )
                //closes the modal
                $('.close').click();

            }
        })

    }

    const setTableData = () => {

        const data = {
            columns: [

                {
                    label: 'Name',
                    field: 'name'

                },
                {
                    label: 'Course',
                    field: 'course'

                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },

                {
                    label: 'Contact Number',
                    field: 'contact',
                    sort: 'asc'
                },
                {
                    label: 'School ID',
                    field: 'schoolID',
                    sort: 'asc'
                },
                {
                    label: 'Resume',
                    field: 'resume',
                    sort: 'asc',

                },
                {
                    label: 'Joined At',
                    field: 'created_At'

                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }


        applyingfreelancers.forEach(freelancer => {

            data.rows.push({


                name: freelancer.user_id.name,
                course: freelancer.course,
                email: freelancer.user_id.email,
                contact: freelancer.user_id.contact,

                created_At: moment(freelancer.user_id.created_At).format('MMM/DD/yy'),

                schoolID: <Fragment>
                    <div className='centerTD'>
                        <img
                            className="anim"
                            src={freelancer.schoolID ? freelancer.schoolID.url : "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"}
                            style={{ margin: 'auto', display: 'flex' }}
                        />
                        <div className="overlay" data-toggle="modal" data-target="#SchoolIDModal" onClick={() => setSchoolID(freelancer.schoolID.url)}>
                            <a className="icon" title="Eye" >
                                <i className="fa fa-eye fa-2xl" style={{ color: 'white' }}></i>
                            </a>
                        </div>
                    </div>

                </Fragment>,
                resume: <Fragment>
                    <div className='centerTD'>
                        <img
                            className="anim"
                            src={freelancer.resume.url}
                            style={{ margin: 'auto', display: 'flex' }}
                        />
                        <div className="overlay" data-toggle="modal" data-target="#ResumeModal" onClick={() => setResume(freelancer.resume.url)}>
                            <a className="icon" title="Eye" >
                                <i className="fa fa-eye" style={{ color: 'white' }}></i>
                            </a>
                        </div>
                    </div>
                </Fragment>,
                actions: <Fragment>

                    <div className='action'>

                        <Link to={''} className="btn btn-success py-1 px-2" onClick={() => approveApplicationHandler(freelancer._id)}>
                            <div data-toggle="tooltip" title='Approve Application'>
                                <i className="fa fa-check" ></i>
                            </div>
                        </Link>
                        <Link to={''} className="btn btn-danger py-1 px-2" onClick={() => rejectApplicationHandler(freelancer._id)}>
                            <div data-toggle="tooltip" title='Reject Application'>
                                <i className="fa fa-times"></i>
                            </div>
                        </Link>



                    </div>

                </Fragment>
            })
        })

        return data;
    }

    return (
        <Fragment>

            <div className='forTable'>

                <div style={{ padding: '0', margin: '0' }}>
                    <h1 style={{ padding: '0 !important', margin: '0 !important' }}>Applications for Freelancer</h1>
                </div>

                <Fragment>
                    <MetaData title={'Application Entries'} />




                    {user && user.role === 'admin' && (
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
                            <form className="a" encType='multipart/form-data' >

                                <div className="modal-body">

                                    <div className='row' >


                                        <div className='sixty' style={{ width: '60%', backgroundColor: 'transparent', padding: '10px' }}>
                                            <img
                                                // src={transaction.inquiry_id && transaction.inquiry_id.freelancer.user_id.avatar.url}
                                                // alt={service.user && service.user.name}
                                                // key={service._id}
                                                // src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                                                className="rounded-img-big"


                                            />
                                            <h4>Amount to pay: 100</h4>
                                            {/* <h4>Gcash Name: {transaction.isPaid}</h4> */}
                                            <h4>Gcash Name: </h4>
                                            <h4>Gcash Number: </h4>
                                        </div>
                                        <div className='forty' style={{ width: '40%', backgroundColor: 'transparent', alignContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>

                                            <img
                                                // src={transaction.inquiry_id && transaction.inquiry_id.freelancer.qrCode.url}
                                                style={{ height: '250px', width: '250px', border: '5px solid', margin: '10px' }}


                                            />
                                            <h4>Gcash QR Code</h4>
                                        </div>


                                    </div>









                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" >Payment Done</button>


                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </Fragment>

            {/* SchoolID MODAL */}
            <Fragment>
                <div className="modal fade" id="SchoolIDModal" tabIndex="-1" role="dialog" aria-labelledby="SchoolIDModalTitle" aria-hidden="true" >
                    <div className="modal-dialog modal-dialog-centered" role="document" style={{ height: 'auto', width: 'auto', maxWidth: '80vw' }}>
                        <div className="modal-content" style={{ maxHeight: '90vh' }}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="SchoolIDModalTitle">School ID</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <img
                                src={schoolID}
                                style={{ padding: '20px', objectFit: 'contain', maxHeight: '83vh' }}
                            />

                        </div>
                    </div>
                </div>
            </Fragment>

            {/* Resume MODAL */}
            <Fragment>
                <div className="modal fade" id="ResumeModal" tabIndex="-1" role="dialog" aria-labelledby="ResumeModalTitle" aria-hidden="true" >
                    <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '40vw', maxHeight: '95vh' }}>
                        <div className="modal-content" style={{ maxHeight: '95vh' }}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="ResumeModalTitle">Resume</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <img
                                src={resume}
                                style={{ padding: '20px', objectFit: 'contain', maxHeight: '85vh' }}

                            />

                        </div>
                    </div>
                </div>
            </Fragment>


        </Fragment>


    )
}

export default ApplicationEntries