import { useState, useEffect } from 'react'
// import styles from './style.css'
import { useParams, Link } from 'react-router-dom';
// import { ServerStyleSheet } from 'styled-components';

// import { Fragment } from 'react'

import axios from "axios";
import success from "../../images/success.png"
import { Fragment } from "react/cjs/react.production.min";
import Loader from '../layout/Loader';
import { getUserDetails } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const EmailVerify = () => {
    const dispatch = useDispatch();
    const [validUrl, setValidUrl] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const param = useParams();
    const { user, loading } = useSelector(state => state.userDetails)

    useEffect(() => {
        dispatch(getUserDetails(param.id))

    }, [param, validUrl])

    useEffect(() => {

        const verifyEmailUrl = async () => {
            try {
                const url = `http://10.0.2.15:3000/api/v1/user/${param.id}/verify/${param.token}`; //localhost
                // const url = `https://servifind-app.onrender.com/api/v1/user/${param.id}/verify/${param.token}`; //website
                const { data } = await axios.get(url);
                console.log(data);
                setValidUrl(true)
            } catch (error) {
                console.log(error)
                setValidUrl(false);
                console.log(validUrl)
            }
        };


        if (user && user.verified === true) {
            setIsVerified(true);
            console.log("verified")
        }
        if (user && user.verified === false) {
            verifyEmailUrl();

        }




    }, [param._id, param.token, dispatch, validUrl, loading])



    return (
        <Fragment>
            {/* {loading ? <Loader /> : ( */}


            <Fragment>

                {validUrl ? (
                    <div style={{
                        width: '100vw',
                        height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        backgroundColor: 'beige',
                        position: 'absolute',
                        zIndex: '10000'


                    }}>
                        <img src={success} alt='success_img' />
                        <h1>Email verified successfully</h1>
                        {/* <Link to="/login">
                        <button style={{
                            border: 'none',
                            outline: 'none',
                            padding: '12px 0',
                            backgroundColor: '#3bb19b',
                            borderRadius: '20px',
                            width: '180px',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            cursor: 'pointer'
                        }}>Login</button>
                    </Link> */}
                    </div>
                ) : (
                    <Fragment>
                        {loading ? (<div style={{
                            width: '100vw',
                            height: '100vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            backgroundColor: 'beige',
                            position: 'absolute',
                            zIndex: '10000'


                        }}>
                            <Loader />

                        </div>) : (


                            <Fragment>

                                {(isVerified === true) ?
                                    (
                                        <div style={{
                                            width: '100vw',
                                            height: '100vh',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            backgroundColor: 'beige',
                                            position: 'absolute',
                                            zIndex: '10000'


                                        }}>
                                            <img src={success} alt='success_img' />
                                            <h1>Email verified successfully</h1>

                                        </div>
                                    ) : (

                                        <h1 style={{
                                            width: '100vw',
                                            height: '100vh',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            backgroundColor: 'beige',
                                            position: 'absolute',
                                            zIndex: '10000'


                                        }}>
                                            Invalid Url
                                        </h1>

                                    )}
                            </Fragment>
                        )}
                    </Fragment>
                )}
            </Fragment>

        </Fragment>
    );
};
export default EmailVerify;

