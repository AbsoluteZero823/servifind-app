import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom";

import axios from 'axios'
import MetaData from '../layout/MetaData'
// import Sidebar from './Sidebar'
import Loader from '../layout/Loader';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateService, getServiceDetails, clearErrors } from '../../actions/serviceActions'
// import inquiry from '../../../../backend/models/inquiry';
import { newInquiry } from '../../actions/inquiryActions';
import { addMessage } from '../../actions/messageActions'
// import { UPDATE_SERVICES_RESET } from '../../constants/serviceConstants'
import { NEW_INQUIRY_RESET } from '../../constants/inquiryConstants'
import $ from 'jquery';
import moment from 'moment/moment'

const SingleService = () => {

    const [instruction, setInstruction] = useState('')
    const [service_id, setService_id] = useState('')
    const [customer, setCustomer] = useState('')
    const [freelancer, setFreelancer] = useState('')
    const [newChat, setNewChat] = useState('')
    const [serviceRatings, setServiceRatings] = useState([])

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    // const { error, isUpdated } = useSelector(state => state.updelService);
    const { service, loading, serviceDetailsSuccess } = useSelector(state => state.serviceDetails)
    const { user, isAuthenticated } = useSelector(state => state.auth)

    const { inquiry, error, success } = useSelector(state => state.inquiry)
    // const { loading, error, services } = useSelector(state => state.services);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getServiceDetails(id))
        // if (service && service._id !== id) {

        // }
        if (serviceDetailsSuccess) {
            setServiceRatings(service.ratings)
            console.log(service.ratings)
        }


        setInstruction(instruction);
        setService_id(id);
        setCustomer(user && user._id);

        // console.log(service.user._id)

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            // navigate('/');
            const chatData = new FormData();

            chatData.set('userId', service.user._id);
            chatData.set('inquiryId', inquiry._id);
            chatData.set('chatName', service.name);
            // console.log(chatData);
            accessChat(chatData);
            alert.success('Inquiry created successfully');
            dispatch({ type: NEW_INQUIRY_RESET })
        }



    }, [dispatch, alert, navigate, error, success, serviceDetailsSuccess])

    const accessChat = async (chatData) => {

        console.log(chatData);
        try {
            // setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                    // Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(`/api/v1/chat`, chatData, config);
            console.log(data.FullChat._id);

            setNewChat(data);
            // if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            // setSelectedChat(data);
            // setLoadingChat(false);
            // onClose();
            sendMessage(data.FullChat._id)

        } catch (error) {
            console.log(error)
        }
    };


    const sendMessage = (id) => {

        const messageData = new FormData();


        messageData.set('content', inquiry.instruction);

        // console.log(inquiry.instruction)
        messageData.set('chatId', id);
        console.log(inquiry)
        if (inquiry.instruction) {




            dispatch(addMessage(messageData));


            navigate(`/chat`)
        }
        else {
            return false;
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setFreelancer(service.user._id)
        // console.log(service.user && service.user._id)
        const formData = new FormData();
        formData.set('instruction', instruction);
        formData.set('service_id', service_id);
        formData.set('customer', customer);
        formData.set('freelancer', service.freelancer_id._id);
        // formData.set('attachments', attachments);

        // console.log(service.user._id);

        dispatch(newInquiry(formData))




        $('.modal-backdrop').hide();
        $('body').removeClass('modal-open');


        // $('#exampleModalCenter').modal('hide');
        // $('#<%=hfImg.ClientID%>').val("");
    }



    return (
        <Fragment>


            {loading ? <Loader /> : (
                <Fragment>
                    <div className='row ey' style={{ paddingLeft: '-10 !important' }}>
                        <div className='first' style={{ backgroundColor: "white", width: "30%", paddingLeft: '-5px', height: 'calc(100vh - 100px)' }}>

                            <center style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)', justifyContent: 'space-between' }}>
                                <div>
                                    <img
                                        src={service.user && service.user.avatar.url}
                                        alt={service.user && service.user.name}
                                        key={service._id}
                                        className="rounded-img-big"

                                        style={{ marginTop: '30px' }}
                                    />

                                    <div className="profile-info" style={{ fontSize: '20px', margin: '30px 30px' }}>
                                        <h4 style={{ textAlign: 'left' }}>Profile Information:</h4>
                                        <div className="info" style={{ marginLeft: 0 }}>Name: {service.user && service.user.name}</div>
                                        <div className="info" style={{ marginLeft: 0 }}>Age: {service.user && service.user.age}</div>
                                        <div className="info" style={{ marginLeft: 0 }}>Gender: {service.user && service.user.gender}</div>
                                        <div className="info" style={{ marginLeft: 0 }}>Email: {service.user && service.user.email}</div>
                                        <div className="info" style={{ marginLeft: 0 }}>Contact Number: {service.user && service.user.contact}</div>

                                        <div className="info" style={{ marginLeft: 0 }}>Freelancer Since: {service.freelancer_id && moment(service.freelancer_id.approved_date).format('MMM/DD/yy')}</div>

                                    </div>
                                </div>
                                <div className='row' style={{ justifyContent: 'space-around', paddingTop: '10px' }}>
                                    <button className="custom-btn btn-5" data-toggle="modal" data-target="#exampleModalCenter" ><span style={{ margin: '10px' }} >Inquire</span></button>
                                    <button className="custom-btn btn-5" ><span>Read More</span></button>

                                </div>
                                {service.freelancer_id && service.freelancer_id.availability ? (
                                    <div style={{ minWidth: 50, border: '2px solid', borderRadius: 10, borderColor: 'lightgreen', padding: 10, margin: '20px' }}>
                                        This Freelancer is Available Right Now
                                    </div>

                                ) : (
                                    <div style={{ minWidth: 50, border: '2px solid', borderRadius: 10, borderColor: 'red', padding: 10, margin: '20px' }}>
                                        This Freelancer is not available right now, and not accepting inquiries at the moment
                                    </div>
                                )}

                                <div>

                                </div>
                            </center>

                        </div>
                        <div className='second' style={{ backgroundColor: "transparent", width: "70%", height: 'calc(100vh - 100px)', padding: '30px', overflowY: 'scroll' }}>
                            <div className="forSecond">
                                <h1 style={{ textAlign: 'center' }}>{service.category && service.category.name}</h1>
                                <div className="list-of-service__container">
                                    <div className="list-of-service" style={{ display: 'flex' }}>
                                        {/* <h2>List of Services</h2> */}
                                        <ul style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <li style={{ fontSize: '30px' }}>Service: {service.name}</li>
                                            <li style={{ fontSize: '30px' }}>Description: {service.name}</li>
                                            {/* <li>Handspa and Footspa</li>
                                        <li>Hand and Foot Paraffine</li>
                                        <li>Waxing</li>
                                        <li>Gel Polish</li>
                                        <li>Nail Arts</li> */}
                                        </ul>


                                    </div>
                                    <div className="customer-ratings">
                                        <img src={service.images && service.images.url}

                                            key={service._id}
                                            // className="rounded-img-big"

                                            style={{ marginTop: '30px' }} />

                                    </div>
                                </div>
                                <div style={{ padding: '0px 30px 30px 30px', borderBottom: ' 2px solid rgba(0, 0, 0, 0.09)' }}>
                                    <h2>Client reviews</h2>
                                    <div className="ratings mt-auto">
                                        <div className="rating-outer">
                                            <div className="rating-inner" style={{ width: `${(service.avgRating / 5) * 100}%` }}></div>
                                        </div>
                                        <span style={{ paddingLeft: 10 }}>{service.avgRating} out of 5</span>
                                    </div>
                                    <span id="no_of_reviews">{service.ratingCount} client {service.ratingCount === 1 ? 'review' : 'reviews'} </span>
                                </div>
                                {/* REVIEWS FROM CLIENTS/ */}
                                <div className="comment-wrapper pt--40">
                                    <div className="section-title">
                                        <h5 className="mb--25">Reviews</h5>
                                    </div>
                                    {/* array.forEach(element => {
    
}); */}
                                    {/* <div className="edu-comment">
                                        <div className="thumbnail"> <img src="images/student-1.png" alt="Comment Images" /> </div>
                                        <div className="comment-content">
                                            <div className="comment-top">
                                                <h6 className="title">CSS Tutorials</h6>
                                                <div className="rating"> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i> </div>
                                            </div>
                                            <span className="subtitle">“ Outstanding Review Design ”</span>
                                            <p>{rating.comment}</p>
                                        </div>
                                    </div> */}

                                    {serviceRatings.map((rating) => (
                                        <div className="edu-comment" key={rating._id}>
                                            <div className='thumbnailAndContent'>
                                                <div className="thumbnail"> <img src={rating.user.avatar.url} alt="Comment Images" /> </div>
                                                <div className="comment-content">
                                                    <div className="comment-top">
                                                        <div style={{ display: "flex" }}>
                                                            <h6 className="title">{rating.user.name}</h6>
                                                            <div className="ratings">
                                                                <div className="rating-outer">
                                                                    <div className="rating-inner" style={{ width: `${(rating.rating / 5) * 100}%` }}></div>
                                                                </div>
                                                                {/* <span style={{ paddingLeft: 10 }}>{rating.rating}</span> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <span className="subtitle">“ Outstanding Review Design ”</span> */}
                                                    <p>{rating.comment}</p>
                                                </div>
                                            </div>
                                            <p>{moment(rating.created_At).format('MMM/DD/yy')}</p>
                                        </div>

                                    ))}

                                    {/* <div className="edu-comment">
                                        <div className="thumbnail"> <img src="images/student-1.png" alt="Comment Images" /> </div>
                                        <div className="comment-content">
                                            <div className="comment-top">
                                                <h6 className="title">HTML CSS Tutorials</h6>
                                                <div className="rating"> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i> </div>
                                            </div>
                                            <span className="subtitle">“ Nice Review Design ”</span>
                                            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam.</p>
                                        </div>
                                    </div> */}
                                </div>
                                {/* REVIEWS FROM CLIENTS END/ */}


                            </div>
                        </div>


                    </div>


                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalCenterTitle">Inquire</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form className="a" onSubmit={submitHandler} encType='multipart/form-data' >
                                    <div className="modal-body">

                                        <div className="form-group">
                                            <label htmlFor="email_field">Inquire Message</label>
                                            <textarea
                                                type="text"
                                                // placeholder="Instruction for the freelancer"
                                                className="form-control"
                                                value={instruction}
                                                onChange={(e) => setInstruction(e.target.value)}
                                            />
                                        </div>

                                        {/* <label>Attachments</label><br></br>
                                        <input type="file" id="exampleInputFile" name="my_file"></input> */}







                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary" >Submit</button>


                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* <div className="profile-container">
                        <div className="profile-content">
                            <img
                                src={service.user && service.user.avatar.url}
                                alt={service.user && service.user.name}
                                key={service._id}
                            className="rounded-img-big"

                            style={{ marginTop: '30px' }}
                            />

                            <div className="profile-info">
                                <h4>Profile Information:</h4>
                                <div className="name">Name: {service.user && service.user.name}</div>
                                <div className="age">Age: {service.user && service.user.age}</div>
                                <div className="gender">Gender: {service.user && service.user.gender}</div>
                                <div className="address">Address: Mansanas St. Taguig City</div>
                                <div className="contact">09221213534</div>
                            </div>
                            <div className="button-profile">
                                <button>Inquire</button>
                                <button>Read More</button>
                            </div>
                        </div>
                        <div className="service-details">
                            <h1>Nail Treatments</h1>
                            <div className="list-of-service__container">
                                <div className="list-of-service">
                                    <h2>List of Services</h2>
                                    <ul>
                                        <li>Manicure and Pedicure</li>
                                        <li>Handspa and Footspa</li>
                                        <li>Hand and Foot Paraffine</li>
                                        <li>Waxing</li>
                                        <li>Gel Polish</li>
                                        <li>Nail Arts</li>
                                    </ul>
                                </div>
                                <div className="customer-ratings">
                                    <img src="chelson-tamares-vtQHwU4F13s-unsplash.jpg" alt="" />
                                    <h2>Customer reviews</h2>
                                    <div className='rating'>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star"></span>
                                        <span className="fa fa-star"></span>
                                    </div>
                                    <span>6 customer ratings</span>
                                </div>
                            </div>

                        </div>
                    </div> */}

                </Fragment>
            )
            }
        </Fragment >

    )
}

export default SingleService