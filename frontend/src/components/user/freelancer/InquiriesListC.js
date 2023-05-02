
import React, { Fragment, useState, useEffect } from 'react'
// import Pagination from 'react-js-pagination';
// import { useParams } from "react-router-dom";
import MetaData from '../../layout/MetaData';
import ClientInquiries from './ClientInquiries';
import Loader from '../../layout/Loader';

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getClientInquiries } from '../../../actions/inquiryActions';
// import { allUsers } from '../../../actions/userActions';
// import Slider from 'rc-slider'
// import 'rc-slider/assets/index.css'


const InquiriesListC = () => {

    // const { createSliderWithToolTip } = Slider;
    // const Range = createSliderWithToolTip(Slider.Range);
    const { user } = useSelector(state => state.auth)

    const alert = useAlert();
    const dispatch = useDispatch();


    // const { users } = useSelector(state => state.users)
    const { loading, inquiries, error } = useSelector(state => state.inquiries);


    // const [currentPage, setCurrentPage] = useState(1)
    // let { keyword } = useParams();

    useEffect(() => {
        // dispatch(allUsers())

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

        dispatch(getClientInquiries())


    }, [dispatch, alert, error]);

    const clientinquiries = inquiries.filter(function (cinquiries) {
        return cinquiries.freelancer.user_id._id === user._id;

    });



    return (
        <Fragment>


            {loading ? <Loader /> : (
                <Fragment>
                    <div className='containerz'>
                        <MetaData title={'Client Inquiries'} />

                        <h1 id="animals_heading">Client Inquiries</h1>
                        <section id="services" className="containerz mt-5">

                            <div className="row" style={{ justifyContent: 'center' }}>
                                {console.log(clientinquiries)}
                                {clientinquiries && clientinquiries.map(inquiry => (

                                    <ClientInquiries key={inquiry._id} inquiry={inquiry} />
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
export default InquiriesListC
