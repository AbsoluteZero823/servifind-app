
import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination';
import { useParams } from "react-router-dom";
import MetaData from '../../layout/MetaData';
import Offers from './Offers'
import Loader from '../../layout/Loader';

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';

import { RequestOffer } from '../../../actions/offerActions';
// import { allUsers } from '../actions/userActions'
// import Slider from 'rc-slider'
// import 'rc-slider/assets/index.css'


const FreelancerOffers = () => {

    // const { createSliderWithToolTip } = Slider;
    // const Range = createSliderWithToolTip(Slider.Range);


    const alert = useAlert();
    const dispatch = useDispatch();


    // const { users } = useSelector(state => state.users)
    // const { loading, services, error, servicesCount, resPerPage, filteredServicesCount } = useSelector(state => state.services);
    const { loading, requestoffers, error } = useSelector(state => state.requestoffers)

    // const [currentPage, setCurrentPage] = useState(1)
    const { request_id } = useParams();


    useEffect(() => {
        if (error) {
            alert.success('success')
            return alert.error(error)
        }

        dispatch(RequestOffer(request_id));


    }, [dispatch, alert, error, request_id]);

    // const requestOffers = offers.filter(function (o) {
    //     return o.request_id === request_id;

    // });

    if (requestoffers) {
        console.log(requestoffers);
        console.log(request_id);
    }
    else {
        console.log('no');
    }





    return (
        <Fragment>


            {loading ? <Loader /> : (
                <Fragment>
                    <div className='containerz'>
                        <MetaData title={'Offers'} />

                        <h1 id="animals_heading">Offers</h1>
                        <section id="services" className="containerz mt-5">
                            <div className="row" style={{ justifyContent: 'space-between' }}>
                                {requestoffers && requestoffers.map(offer => (

                                    <Offers key={offer._id} offer={offer} />
                                ))}
                            </div>
                        </section>
                    </div>
                    {/* 
                    <h1 id="animals_heading">Latest Animals</h1>
                    <section id="animals" className="container mt-5">
                        <div className="row">
                            {animals && animals.map(animal => (
                                <Animal key={animal._id} animal={animal} />
                            ))}
                        </div>
                    </section> */}

                    {/* {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={animalsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )} */}

                </Fragment>
            )
            }
        </Fragment >
    );
}
export default FreelancerOffers
