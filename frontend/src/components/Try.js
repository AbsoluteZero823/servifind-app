
import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination';
import { useParams } from "react-router-dom";
import MetaData from './layout/MetaData'
import Service from './service/Service'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getServicesToDisplay } from '../actions/serviceActions'
// import { allUsers } from '../actions/userActions'
// import Slider from 'rc-slider'
// import 'rc-slider/assets/index.css'


const Try = () => {

    // const { createSliderWithToolTip } = Slider;
    // const Range = createSliderWithToolTip(Slider.Range);


    const alert = useAlert();
    const dispatch = useDispatch();


    // const { users } = useSelector(state => state.users)
    const { loading, services, error, servicesCount, resPerPage, filteredServicesCount } = useSelector(state => state.services);


    const [currentPage, setCurrentPage] = useState(1)
    let { keyword } = useParams();

    useEffect(() => {


        // if (error) {
        //     alert.error(error);
        //     dispatch(clearErrors())
        // }

        // if (isDeleted) {
        //     alert.success('Animal deleted successfully');
        //     navigate('/animals');
        //     dispatch({ type: DELETE_ANIMALS_RESET })
        // }


    }, [dispatch, alert])

    useEffect(() => {
        if (error) {
            alert.success('success')
            return alert.error(error)
        }

        dispatch(getServicesToDisplay(keyword))


    }, [dispatch, alert, error, keyword]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }
    let count = servicesCount;

    if (keyword) {
        count = filteredServicesCount
    }
    return (
        <Fragment>


            {loading ? <Loader /> : (
                <Fragment>
                    <div className='containerz'>
                        <MetaData title={'Services'} />

                        {/* <h1 id="animals_heading">Services</h1> */}
                        <section id="services" className="containerz mt-5">
                            <div className="row" style={{ justifyContent: 'space-between' }}>
                                {services && services.map(service => (

                                    <Service key={service._id} service={service} />
                                ))}
                            </div>
                        </section>
                    </div>


                </Fragment>
            )
            }
        </Fragment >
    );
}
export default Try
