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


        <div className="card" style={{}}>
            <img className='imgcard' src={service.image} style={{ maxWidth: '160px' }}></img>


            {/* <div className='freelancer-info'>
        <img
            src={service.user.avatar && service.user.avatar.url}
            alt={service.user && service.user.name}
            key={service._id}
            className="rounded-img"
        />
    
        <a className='black-name'>{service.user.name}</a>
        
    </div> */}

            <div className="card__content">
                <div className="card__label" style={{ fontSize: '12px' }}>{service.category.name}</div>
                <h4><a href="https://konrad.design" className="card__link" target="_blank">services</a></h4>
                {/* <p>{service.title}</p> */}

                <p><span className="fw7">{service.name}</span></p>

                {/* picture and name */}
                <div className='row' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between !important' }}>
                    <div style={{
                        width: 25,
                        height: 25,
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: 50,
                        backgroundColor: 'gainsboro',
                    }}>
                        <img src={service.user.avatar ? service.user.avatar.url : "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"} style={{
                            height: 25,
                            width: 'auto'
                        }}></img>
                    </div>
                    <center className="justified" href="" style={{ fontSize: '10px' }}>{service.user.name}</center>
                </div>

                {/* end picture and name */}
                <div className="card__cta-container">
                    <button className="card__cta">
                        {(!user && !isAuthenticated) &&
                            <Link to={`/login`}>View Details</Link>
                        }
                        {(user && isAuthenticated) &&
                            <Link to={`/service/details/${service._id}`}>View Details</Link>
                        }
                    </button>
                </div>
            </div>
        </div>

    )
}
export default Service