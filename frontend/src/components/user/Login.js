import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { isAuthenticated, error, loading, success, user } = useSelector(state => state.auth);


    useEffect(() => {

        // if (isAuthenticated) {
        //     navigate('/')
        // }

        if (error) {
            return alert.error(error);
            swal()
            dispatch(clearErrors());
        }
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

    }, [dispatch, alert, isAuthenticated, error, navigate, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))


        // alert.success('Logged in successfully.')
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Login'} />

                    <div className="row wrapper">
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

                                {/* NOT FINISHED YET */}
                                {/* <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link> */}

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
                    </div>


                </Fragment>
            )}
        </Fragment>
    )
}

export default Login