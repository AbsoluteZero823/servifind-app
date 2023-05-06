import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'



const Service = ({ service }) => {
    // console.log(users)

    const { user, isAuthenticated } = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const alert = useAlert();


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
        // for (let index = 0; index < 3; index++) {

        //     if (service.user_id == users[index]._id) {
        //         const i = index;
        //         console.log(i)
        //     }


        // }

    }, [dispatch, alert])



    return (

        <div className="services-card">
            <div className="services-info-profile">
                <img className="services-profile" src={service && service.user.avatar.url} alt="" />
            </div>
            <img className="services-photo" src={service.images.url} alt="" />
            <div className="card-content">
                <h4 className="freelancer-name">Kendrick Galan</h4>
                <div className="services-title">
                    <span>{service.category.name}</span>
                </div>
                <div className="services-body">
                    - {service.name}
                </div>
                <div className="services-footer">
                    <div>
                        <div className='rating' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className="ratings mt-auto">
                                <div className="rating-outer">
                                    <div className="rating-inner" style={{ width: `${(service.avgRating / 5) * 100}%` }}></div>
                                </div>

                            </div>


                            <span style={{ paddingLeft: 10 }}>{service.avgRating}/5</span>
                        </div>
                        <span id="no_of_reviews">{service.ratingCount} client {service.ratingCount === 1 ? 'review' : 'reviews'} </span>

                    </div>
                    {(!user && !isAuthenticated) &&
                        <Link to={`/login`} style={{ color: 'white' }}>
                            <button>View Details</button>
                        </Link>
                    }


                    {(user && isAuthenticated) &&
                        <Link to={`/service/details/${service._id}`} style={{ color: 'white' }}>
                            <button>View Details</button>
                        </Link>
                    }


                    {/* <a href="#">More Info</a> */}
                </div>
                <div style={{ padding: '0px 30px' }}>


                </div>
            </div>
        </div>

        // <div className="card" style={{}}>
        //     <img className='imgcard' src={service.images.url} style={{ maxWidth: '160px' }}></img>



        //     <div className="card__content">
        //         <div className="card__label" style={{ fontSize: '12px' }}>{service.category.name}</div>
        //         <h4><a href="https://konrad.design" className="card__link" target="_blank">services</a></h4>


        //         <p><span className="fw7">{service.name}</span></p>


        //         <div className='row' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between !important' }}>
        //             <div style={{
        //                 width: 25,
        //                 height: 25,
        //                 position: 'relative',
        //                 overflow: 'hidden',
        //                 borderRadius: 50,
        //                 backgroundColor: 'gainsboro',
        //             }}>
        //                 <img src={service.user.avatar ? service.user.avatar.url : "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"} style={{
        //                     height: 25,
        //                     width: 'auto'
        //                 }}></img>
        //             </div>
        //             <center className="justified" href="" style={{ fontSize: '10px' }}>{service.user.name}</center>
        //         </div>


        //         <div className="card__cta-container">
        //             <button className="card__cta">
        //                 {(!user && !isAuthenticated) &&
        //                     <Link to={`/login`}>View Details</Link>
        //                 }
        //                 {(user && isAuthenticated) &&
        //                     <Link to={`/service/details/${service._id}`}>View Details</Link>
        //                 }
        //             </button>
        //         </div>
        //     </div>
        // </div>

    )
}
export default Service