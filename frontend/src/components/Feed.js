
import React, { Fragment, useState, useEffect } from 'react'
// import Pagination from 'react-js-pagination';
import { useParams, useNavigate } from "react-router-dom";
import MetaData from './layout/MetaData';
import Request from './Request';
import Loader from './layout/Loader';

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';

// import { allUsers } from '../actions/userActions'
// import Slider from 'rc-slider'
// import 'rc-slider/assets/index.css'
import { getCategories } from '../actions/categoryActions';
import { getRequests, clear } from '../actions/requestActions';
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
    // const { loadings, detailserror, transaction } = useSelector(state => state.transactionDetails);
    const { user, isAuthenticated } = useSelector(state => state.auth)
    // const [currentPage, setCurrentPage] = useState(1)


    const [category, setCategory] = useState('');
    let { categoryId } = useParams();

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




    }, [dispatch, alert, error, category]);

    // function setCurrentPageNo(pageNumber) {
    //     setCurrentPage(pageNumber)
    // }
    // let count = servicesCount;

    // if (keyword) {
    //     count = filteredServicesCount
    // }


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

                                    <Request key={request._id} request={request} />
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

        </Fragment >
    );
}
export default Feed
