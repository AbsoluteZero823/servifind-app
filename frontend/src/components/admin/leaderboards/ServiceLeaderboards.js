import React, { Fragment, useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

// import { getServiceLeaderboards,clearErrors } from '../../../actions/transactionActions';
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader';

const ServiceLeaderboards = ({ loading, error, sortedService }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    // const { loading, error, sortedService } = useSelector(state => state.serviLeaderboards);

    // useEffect(() => {
    //     dispatch(getServiceLeaderboards());

    //     if (error) {
    //         alert.error(error);
    //         dispatch(clearErrors())
    //     }

    // }, [dispatch, alert, error])

    return (
        <Fragment>
            <MetaData title={'Dashboard'} />
            {loading || loading === undefined ? <Loader /> : (
                <div className="col-md-6"
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 0 15px 1px rgba(0, 0, 0, 0.4)',
                        flex: '0 0 48%',
                        margin: '25px 0px',
                        padding: 0
                    }} >
                    <div className='board' style={{ minHeight: 500 }}>
                        <h2 className='leaderboard' style={{ fontSize: '1.5rem', backgroundColor: '#67abf4', padding: 20, borderRadius: '7px 7px 0px 0px' }}>Top Services </h2>

                        <div style={{ backgroundColor: 'gainsboro', minWidth: '85%', borderRadius: 10, padding: '12px 20px', margin: '10px', display: 'flex', justifyContent: 'space-between' }}>
                            <p>Service Category</p>
                            <p>Count</p>
                        </div>
                        <div style={{ padding: '10px 50px 10px 25px' }}>
                            {sortedService.map((data) =>
                                <div className='profile-leaderboards'>
                                    <div className='flex' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        {/* <div className='item'> */}
                                        {/* <h3 className='text-dark'>{data.title}</h3> */}
                                        <h3 className='text-dark'>{data.service}</h3>
                                        {/* </div> */}

                                        <div className='item'>
                                            {/* <span>{data.count}</span> */}
                                            <h3>{data.count}</h3>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}
export default ServiceLeaderboards
