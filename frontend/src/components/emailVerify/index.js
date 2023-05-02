import { useState, useEffect } from 'react'
// import styles from './style.css'
import { useParams, Link } from 'react-router-dom';
// import { ServerStyleSheet } from 'styled-components';

// import { Fragment } from 'react'

import axios from "axios";
import success from "../../images/success.png"
import { Fragment } from "react/cjs/react.production.min";

const EmailVerify = () => {

    const [validUrl, setValidUrl] = useState(false);
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:3000/api/v1/user/${param.id}/verify/${param.token}`;
                const { data } = await axios.get(url);
                console.log(data);
                setValidUrl(true)
            } catch (error) {
                console.log(error)
                // setValidUrl(false)
            }
        };

        verifyEmailUrl();


    }, [param])

    return (
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
                    <Link to="/login">
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
                    </Link>
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


                }}>404 not found</h1>
            )}
        </Fragment>
    );
};
export default EmailVerify;

