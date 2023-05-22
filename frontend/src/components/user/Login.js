import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Swal from 'sweetalert2'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { isAuthenticated, error, loading, success, user, message } = useSelector(state => state.auth);


    useEffect(() => {

        // if (isAuthenticated) {
        //     navigate('/')
        // }
        if (message) {
            swal("Email Sent!", message, "success")
        }

        // if (error) {

        //     swal("Error", error, "error")

        // }
        if (success) {

            swal("Success!", "Logged in Successfully!", "success");
            if (user.role === 'admin') {
                navigate('/dashboard')
            }
            else if (user.role === 'freelancer') {
                navigate('/freelancer/dashboard')
            }
            else {
                navigate('/all')
            }

            // dispatch({ type: NEW_SERVICES_RESET })
        }

    }, [dispatch, isAuthenticated, error, navigate, success, message])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))



    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Login'} />
                    <div style={{ background: 'white', height: 'calc(100vh - 100px)', width: '100vw', paddingTop: '35px' }}>
                        <div className="header__container">
                            {/* <header>
                            <img src="./images/messenger-icon.png" alt="" />
                            <ul>
                                <li><a href="#">Features</a></li>
                                <li><a href="#">Desktop App</a></li>
                                <li><a href="#">Privacy & Safety</a></li>
                                <li><a href="#">For Developers</a></li>
                            </ul>
                        </header> */}

                            <div className="content">
                                <div className="container__login">
                                    <div className="messenger__head-text">
                                        <h1
                                            style={{ backgroundImage: 'linear-gradient(83.84deg, #0088FF -6.87%, #A033FF 26.54%, #FF5C87 58.58%' }}
                                        // style="background-image: linear-gradient(83.84deg, #0088FF -6.87%, #A033FF 26.54%, #FF5C87 58.58%);"
                                        >
                                            Welcome! <br /> to Servifind
                                        </h1>
                                    </div>
                                    <div className="messenger-text">
                                        Where you can find the best service in the right time on the right person.
                                    </div>
                                    <form onSubmit={submitHandler}>
                                        <input
                                            type="email"
                                            name="emailaddress"
                                            id="emailaddress"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email or phone number" />



                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} />



                                        <div className="login__button">
                                            <button
                                                id="login_button"
                                                type="submit"

                                            >
                                                Sign In
                                            </button>
                                            {/* <a href="#">Forgot your password?</a> */}
                                        </div>


                                    </form>

                                    {/* <div className="keepmesignedin">
                                        <input type="checkbox" name="radio" id="radio" />
                                        <span>Keep me signed in</span>
                                    </div> */}
                                    {/* <div className="download-buttons">
                                        <img src="images/apple.svg" alt="" />
                                        <img src="images/microsoft.svg" alt="" />
                                    </div> */}
                                </div>
                                <div className="section-img">
                                    <img src="images/welcome.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" id='formz' onSubmit={submitHandler}>
                                <h1 className="mb-3">Login</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                NOT FINISHED YET
                                <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                >
                                    LOGIN
                                </button>

                                <Link to="/register" className="float-right mt-3">New User?</Link>
                            </form>
                        </div>
                    </div> */}


                </Fragment>
            )}
        </Fragment>
    )
}

export default Login