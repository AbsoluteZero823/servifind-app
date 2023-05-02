import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Swal from 'sweetalert2';
import $ from 'jquery';

import Loader from '../../layout/Loader';

import { availabilityUpdate, completeFreelancerSetup } from '../../../actions/freelancerActions';
import { getFreelancerServices } from '../../../actions/serviceActions';

import { AVAILABILITY_UPDATE_RESET, FREELANCER_SETUP_RESET } from '../../../constants/freelancerConstants';

const Dashboard = () => {
    const { user } = useSelector(state => state.auth)
    const { isUpdated } = useSelector(state => state.updateFreelancer)
    const { services } = useSelector(state => state.services)

    const dispatch = useDispatch()

    const [activeSlider, setActiveSlider] = useState(0);
    const [gcash_name, setGcashName] = useState('');
    const [gcash_num, setGcashNum] = useState('');
    const [qrCodeName, setQRCodeName] = useState('')
    const [qrCode, setQRCode] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        if (user.freelancer_id.availability === 'true') {
            console.log('available')
            $("#myCheck").prop("checked", true);
            setActiveSlider(0)
        }
        else {
            console.log('else')
            $("#myCheck").prop("checked", false);
            setActiveSlider(1)
        }

    }, [])
    useEffect(() => {
        if (user) {
            dispatch(getFreelancerServices(user.freelancer_id._id))
        }

        if (isUpdated) {

            Swal.fire(
                'Success',
                'Update Successfully',
                'success'
            )
            $('.modal-backdrop').hide();
            $("#setupModal").hide();
            dispatch({ type: AVAILABILITY_UPDATE_RESET })
            dispatch({ type: FREELANCER_SETUP_RESET })
            setLoading(false)
        }

    }, [dispatch, isUpdated])


    const OnChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {

                setQRCode(reader.result)

                setQRCodeName(e.target.files[0].name)
                // console.log(avatarName)
            }
        }

        reader.readAsDataURL(e.target.files[0])

    }

    const submitHandler = (e) => {
        e.preventDefault();

        const freelancerData = new FormData();
        freelancerData.set('gcash_name', gcash_name);
        freelancerData.set('gcash_num', gcash_num);
        freelancerData.set('qrCode', qrCode);

        dispatch(completeFreelancerSetup(freelancerData))
        setLoading(true);
        //     dispatch(updateUser(user._id, formData))
    }
    const clickedSliderHandler = (e) => {
        // console.log(e.target);
        var checkBox = document.getElementById("myCheck");
        if (checkBox.checked === false) {

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
                    // dispatch(approveApplication(id))
                    setActiveSlider(1);
                    console.log(activeSlider);
                    $("#myCheck").prop("checked", false);
                    dispatch(availabilityUpdate());
                    Swal.fire(
                        'Success',
                        'Status set to "not available"',
                        'success'
                    )
                    //closes the modal
                    // $('.close').click();

                } else {
                    $("#myCheck").prop("checked", true);
                }
            })


        } else {

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
                    const freelancerData = new FormData();

                    setActiveSlider(0);
                    console.log(activeSlider);
                    $("#myCheck").prop("checked", true);
                    dispatch(availabilityUpdate());
                    Swal.fire(
                        'Success',
                        'Status set to "available"',
                        'success'
                    )
                    //closes the modal


                } else {
                    $("#myCheck").prop("checked", false);
                }
            })


            // console.log(FreelancerTransactions)
        }


        // const { value } = e.target;
        // setActiveSlider(1);
        // console.log(activeButton);
    };


    const notSetupSliderHandler = (e) => {
        // console.log(e.target);
        // var checkBox = document.getElementById("myCheck");
        Swal.fire(
            'Warning',
            'Please Complete your payment details first. Click "Complete Setup" button to setup your Payment Details',
            'info'
        )

        // Swal.fire({
        //     title: 'Warning?',
        //     text: 'Please Complete your payment details first. Click "Complete Setup" button to setup your Payment Details',
        //     icon: 'info',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Approve'
        // })





        // const { value } = e.target;
        // setActiveSlider(1);
        // console.log(activeButton);
    };
    return (
        <Fragment>
            <div className='containerDashboardFull' >
                <div className='dashboard'>


                    <div className='dashboardContent'>

                        <div className='premiumCard' >
                            <div className='content'>
                                <h1>Go Premium</h1>
                                <p>Post more Services and Earn more with lifetime mermbership</p>
                                <Link to="/premium" ><button className='premiumBtn'><span>Connect Now</span> </button></Link>
                            </div>
                            <div className='picContainer' >
                                <img className='pic' src='../images/8-03.png' />
                            </div>
                        </div>

                        <div className='charts' >
                            <div className='smallCardContainer' style={{ marginRight: '10px' }}>
                                <h5>Progress</h5>
                                <div className='smallCard' >

                                </div>
                            </div>
                            <div className='smallCardContainer' style={{ marginLeft: '10px' }}>
                                <h5>Progress</h5>
                                <div className='smallCard' >

                                </div>
                            </div>
                        </div>

                        <div className='runningCourses' >
                            <h5 style={{ paddingBottom: '10px' }}>Progress</h5>
                            <div className='bigCardContainer'>

                                <div className='wideCard' >

                                </div>
                                <div className='notClickedCard' >

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className='dashboardProfile'>

                        <div style={{ marginBottom: '25px' }}>
                            <p style={{ fontWeight: 'bold' }}>Profile</p>
                        </div>
                        <div style={{ display: 'flex', borderBottom: '2px solid rgba(0, 0, 0, .09)', justifyContent: 'space-around' }}>
                            <div className='picContainer'>
                                <img
                                    src={user.avatar.url}
                                    className='rounded-pic'
                                />
                            </div>
                            <div className='profileInfo'>
                                <h3>{user.name}</h3>
                                <p>{user.role}</p>
                                {user.role === 'freelancer' && user.freelancer_id.gcash_num && (
                                    <a name='' className={activeSlider === 1 ? `selection` : "selection active"} >Availability
                                        <label className="switch" style={{ justifyContent: 'center', margin: '0px 5px' }}>
                                            <input type="checkbox" id='myCheck' onClick={clickedSliderHandler} />
                                            <span className="slider round" ></span>
                                        </label>

                                    </a>
                                )}

                                {user.role === 'freelancer' && !user.freelancer_id.gcash_num && (
                                    <a name='' className='selection'  >Availability
                                        <label className="switch" style={{ justifyContent: 'center', margin: '0px 5px' }}>
                                            <div onClick={notSetupSliderHandler}>
                                                <input type="checkbox" id='myCheck' onClick={notSetupSliderHandler} /></div>
                                            <span className="slider round" ></span>
                                        </label>

                                    </a>
                                )}
                            </div>
                        </div>
                        <div className='paymentDetails'>
                            <p style={{ fontWeight: 'bold', marginTop: "20px" }}>Payment Details</p>
                            <div className='completeSetup'>
                                {/* {user.freelancer_id && (

)} */}
                                <p>GCash Name: {user.freelancer_id && user.freelancer_id.gcash_name}</p>
                                <p>GCash Number: {user.freelancer_id && user.freelancer_id.gcash_num}</p>
                                {!user.freelancer_id.gcash_name && (
                                    <div className='flexCenter'><button className='profileBtn' data-toggle="modal" data-target="#setupModal">Complete Setup</button></div>
                                )}

                            </div>
                        </div>
                        <div className='servicesDisplay'>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4 style={{ fontWeight: 'bold', marginTop: "20px" }}>My Services</h4>
                                <Link to={`/services/${user.freelancer_id._id}`} style={{ marginTop: '20px' }} ><a >see all</a></Link>

                            </div>
                            <div className='servicesContainer'>

                                {/* <div className='wideCard' >

                                </div> */}
                                {services && services.map(service => (

                                    // <ClientInquiries key={inquiry._id} inquiry={inquiry} />

                                    <div className='serviceCard' >
                                        <img
                                            className='rounded-img'
                                            src={service.images.url}
                                            style={{ margin: 'auto 20px auto 0px' }}
                                        />
                                        <div className='serviceCardInfo'>
                                            <p style={{ fontWeight: 'bold' }}>{service.category.name}</p>
                                            <p className='limitTextLength'>{service.name}</p>
                                            <p>₱{service.priceStarts_At}</p>
                                        </div>
                                    </div>
                                ))}





                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SETUP INFORMATION MODAL */}
            <div className="modal fade" id="setupModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Payment Details</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form className="a" onSubmit={submitHandler} encType='multipart/form-data'>
                            <div className="modal-body">

                                <div className="form-group">
                                    <label htmlFor="email_field">GCash Name</label>
                                    <input
                                        type="text"
                                        id="gcash_name"
                                        className="form-control"
                                        name='gcash_name'
                                        placeholder='Your gcash name'
                                        required
                                        value={gcash_name}
                                        onChange={(e) => setGcashName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email_field">GCash Number</label>
                                    <input
                                        type="number"
                                        id="gcash_num"
                                        className="form-control"
                                        name='gcash_num'
                                        placeholder='Your Gcash registered number'
                                        required
                                        value={gcash_num}
                                        onChange={(e) => setGcashNum(e.target.value)}
                                    />
                                </div>


                                <label htmlFor="email_field">GCash QRCode</label>
                                <div className='d-flex align-items-center'>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='qrCode'
                                            className='custom-file-input'
                                            id='customFile'
                                            accept='image/*'
                                            onChange={OnChange}
                                        />

                                        {qrCodeName ? (
                                            <label className='custom-file-label' htmlFor='customFile'>

                                                {qrCodeName}

                                            </label>

                                        ) : (
                                            <label className='custom-file-label' htmlFor='customFile'>

                                                attach GCash QRCode

                                            </label>

                                        )
                                        }

                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" >Save changes</button>


                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* {loading ? <Loader /> : (
                <Fragment>



                    <div className='containerDashboard'>
                        <button data-toggle="modal" data-target="#setupModal">Complete Setup</button>

                        {user.role === 'freelancer' && user.freelancer_id.gcash_num && (
                            <a name='' className={activeSlider === 1 ? `selection` : "selection active"} style={{ borderLeft: '3px solid' }} >Availability
                                <label className="switch" style={{ justifyContent: 'center', margin: '0px 5px' }}>
                                    <input type="checkbox" id='myCheck' onClick={clickedSliderHandler} />
                                    <span className="slider round" ></span>
                                </label>
                              
                            </a>
                        )}

                        {user.role === 'freelancer' && !user.freelancer_id.gcash_num && (
                            <a name='' className='selection'  >Availability
                                <label className="switch" style={{ justifyContent: 'center', margin: '0px 5px' }}>
                                    <div onClick={notSetupSliderHandler}>
                                        <input type="checkbox" id='myCheck' onClick={notSetupSliderHandler} /></div>
                                    <span className="slider round" ></span>
                                </label>
                            
                            </a>
                        )}
                    </div>

             

                </Fragment>
            )} */}
        </Fragment>
    )
}

export default Dashboard