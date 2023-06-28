
import React, { Fragment, useState, useEffect } from 'react'
// import Pagination from 'react-js-pagination';
import { useParams, useNavigate } from "react-router-dom";
import MetaData from './layout/MetaData';
import Request from './Request';
import Loader from './layout/Loader';
import $ from 'jquery';
import socket from '../Context/socket';

import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';

// import { allUsers } from '../actions/userActions'
// import Slider from 'rc-slider'
// import 'rc-slider/assets/index.css'
import { getFreelancerServices } from '../actions/serviceActions';
import { getCategories } from '../actions/categoryActions';
import { getRequests, clear } from '../actions/requestActions';
import { newOffer } from '../actions/offerActions';
import { NEW_OFFER_RESET } from '../constants/offerConstants';


var selectedChatCompare;

// import { getTransactions, clearErrors, SingleTransaction, PaymentReceived, PaymentSent, TransactionDone } from '../../../actions/transactionActions';
// import { UPDATE_PSENT_RESET, UPDATE_PRECEIVED_RESET, UPDATE_TRANSACTIONDONE_RESET } from '../../../actions/transactionActions';
const Feed = () => {

    // const { createSliderWithToolTip } = Slider;
    // const Range = createSliderWithToolTip(Slider.Range);

    let navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();


    // const { users } = useSelector(state => state.users)
    // const { loading, services, error, servicesCount, resPerPage, filteredServicesCount } = useSelector(state => state.services);

    const { loading, error, requests } = useSelector(state => state.requests);
    const { categories } = useSelector(state => state.categories);
    const { services } = useSelector(state => state.freelancerServices);
    const { offer, success, newOfferLoading } = useSelector((state) => state.addOffer);
    // const { loadings, detailserror, transaction } = useSelector(state => state.transactionDetails);
    const { user, isAuthenticated } = useSelector(state => state.auth)
    // const [currentPage, setCurrentPage] = useState(1)

    const [selectedRequest, setSelectedRequest] = useState('');
    const [category, setCategory] = useState('');
    let { categoryId } = useParams();

    const [service_id, setServiceId] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');



    useEffect(() => {
        if (error) {
            alert.success('success')
            return alert.error(error)
        }
        dispatch(getCategories())
        dispatch(getRequests(categoryId))
        // if (user) {
        //     console.log(user._id);
        // }




    }, [dispatch, alert, error, success]);
    useEffect(() => {

        if (user.role === 'freelancer') {
            dispatch(getFreelancerServices(user.freelancer_id._id));
        }

    }, []);

    useEffect(() => {
        console.log(selectedRequest)


    }, [selectedRequest]);
    useEffect(() => {


        if (success) {
            socket.emit("new offer", offer);
            dispatch({ type: NEW_OFFER_RESET });
            console.log('bakit ako')
            Swal.fire("Offer sent Successfully!", "", "success");

        }
    }, [success]);


    // function setCurrentPageNo(pageNumber) {
    //     setCurrentPage(pageNumber)
    // }
    // let count = servicesCount;

    // if (keyword) {
    //     count = filteredServicesCount
    // }

    const submitOfferHandler = (e) => {
        e.preventDefault();
        // console.log(e)
        // const { requestId } = e.target;
        const offerData = new FormData();


        offerData.set('service_id', service_id);
        offerData.set('description', description);
        offerData.set('price', price);
        // offerData.set('offered_by', user._id);
        offerData.set('request_id', selectedRequest);


        dispatch(newOffer(offerData));
        // Swal.fire(
        //     'Offer sent Successfully!',
        //     '',
        //     'success'
        // )
        //closes the modal
        $('.close').click();




        // dispatch(updateProfile(formData))

    }

    const categoryHandler = (id) => {
        if (id && id !== "") {
            navigate(`/feed/category/${id}`)
            // window.location.reload()
        }
        else if (id === "") {
            navigate(`/feed`)
        }
    }
    // const categoryHandler => {
    //     if (category && category != "") {
    //         navigate(`/feed/category/${category}`)
    //         // window.location.reload()
    //     }
    //     else if (category === "") {
    //         navigate(`/feed`)
    //     }
    // }
    let sortedRequests = requests.filter(function (myrequest) {
        return myrequest.request_status === 'waiting';

    });
    sortedRequests = sortedRequests.sort((a, b) => {
        let da = new Date(a.created_At),
            db = new Date(b.created_At);
        return db - da;
    });
    return (

        <Fragment>

            <MetaData title={'Feed'} />

            <Fragment>
                <div className='firstcontainer' style={{ paddingTop: '25px', boxShadow: 'none' }}>
                    <div className='secondcontainer' style={{ display: 'flex' }}>


                        {/* sa mga transaction na */}
                        {loading ? <Loader /> : (
                            <div style={{ width: '70%', padding: '0px 10px' }}>
                                {/* dito nagsimula ang isang service */}

                                {sortedRequests && sortedRequests.map(request => (

                                    <Request key={request._id} request={request} services={services} setSelectedRequest={setSelectedRequest} />
                                ))}



                            </div>
                        )}
                        <div style={{ width: '30%' }}>
                            <div className='card filter' style={{}}>
                                <a style={{ paddingBottom: '10px' }}>My Offers</a>
                                <p style={{ fontSize: '20px' }}>Category Filter</p>

                                <form>
                                    <label className="filterContainer">All
                                        <input type="radio" defaultChecked="checked" name="category" value="" onClick={() => setCategory("")} onChange={() => categoryHandler("")} />
                                        <span className="checkmark"></span>
                                    </label>
                                    {categories.map((category) => (
                                        <label className="filterContainer" key={category._id} >{category.name}

                                            <input
                                                type="radio"
                                                name="category"
                                                value={category._id}
                                                key={category._id}
                                                onClick={() => setCategory(category._id)}
                                                onChange={() => categoryHandler(category._id)}

                                            />

                                            <span className="checkmark"></span>
                                        </label>
                                        // <option value={category._id}>{category.name}</option>

                                    ))}


                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>
            {/* MAKE OFFER MODAL */}

            <div className="modal fade" id="MakeOfferModal" tabIndex="-1" role="dialog" aria-labelledby="MakeOfferModalTitle" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '700px' }}>
                    <div className="modal-content" >
                        <div className="modal-header">
                            <h5 className="modal-title" id="MakeOfferModalTitle">Make Offer</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <form className="a" onSubmit={submitOfferHandler} encType='multipart/form-data' >
                            <div className="modal-body">

                                <div style={{ padding: '10px 10px' }}>
                                    {/* populate the service of the logged in freelancer */}
                                    <label htmlFor="service_id">Service to offer:</label>

                                    <select
                                        name="service_id"
                                        id="service_id"
                                        className='form-control'
                                        value={service_id}
                                        onChange={(e) => setServiceId(e.target.value)}
                                    >
                                        <option value="">Select Service</option>

                                        {services.map((service) => (
                                            <option key={service._id} value={service._id}>{service.name}</option>
                                            //   <li key={season.id}>{season}</li>
                                        ))}
                                        {/* <option value="spam">service1</option>
                                        <option value="harassment">service2</option>
                                        <option value="inappropriate-content">service3</option> */}
                                    </select>
                                    <br />
                                    <label>Description: </label>
                                    <textarea
                                        name="description"
                                        id="description" className="form-control mt-3"
                                        style={{ minHeight: '200px' }}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    >
                                    </textarea>

                                    <div className="form-group">
                                        <label htmlFor="stock_field">Price</label>
                                        <input
                                            type="number"
                                            id="stock_field"
                                            className="form-control"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>


                                </div>








                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" >Submit</button>


                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </Fragment >
    );
}
export default Feed
