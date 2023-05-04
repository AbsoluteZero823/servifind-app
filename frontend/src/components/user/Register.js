import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/userActions'
import { REGISTER_USER_RESET } from '../../constants/userConstants';
// import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'

import swal from 'sweetalert';

const Register = () => {

    const [user, setUser] = useState({
        name: '',
        age: '',
        gender: '',
        contact: '',
        email: '',
        password: '',
    })

    // const [msg, setMsg] = useState("")

    const { name, age, gender, contact, email, password } = user;

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { error, loading, success } = useSelector(state => state.addUser);

    useEffect(() => {


        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            swal("Success!", "Registered successfully. A verification email have been sent to your gmail", "success");
            // alert.success('Registered successfully. wait to be accepted')
            navigate('/login')
            dispatch({ type: REGISTER_USER_RESET })
        }

    }, [dispatch, alert, error, navigate, success])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('age', age);
        formData.set('gender', gender);
        formData.set('contact', contact);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);

        dispatch(register(formData))

        // setMsg(res.message)
    }

    const onChange = e => {
        if (e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>

                    <MetaData title={'Sign Up'} />
                    <div style={{ background: 'white', height: 'calc(100vh - 100px)', width: '100vw', paddingTop: '80px' }}>
                        <div className="header__container">


                            <div className="content" style={{ justifyContent: 'space-evenly' }}>
                                <div className="container__login">
                                    <div className="messenger__head-text">
                                        <h1
                                            style={{ backgroundImage: 'linear-gradient(83.84deg, #0088FF -6.87%, #A033FF 26.54%, #FF5C87 58.58%' }}

                                        >
                                            Welcome! <br /> to Servifind
                                        </h1>
                                    </div>
                                    <div className="messenger-text">
                                        Where you can find the best service in the right time on the right person.
                                    </div>


                                    {/* <div className="keepmesignedin">
                                        <input type="checkbox" name="radio" id="radio" />
                                        <span>Keep me signed in</span>
                                    </div> */}
                                    {/* <div className="download-buttons">
                                        <img src="images/apple.svg" alt="" />
                                        <img src="images/microsoft.svg" alt="" />
                                    </div> */}
                                </div>
                                <div >
                                    <h1 style={{ padding: 10, fontWeight: '10px' }}>Sign Up</h1>
                                    <form onSubmit={submitHandler} encType='multipart/form-data'>
                                        <input
                                            type="text"
                                            name="name"
                                            id="emailaddress"
                                            value={name}
                                            onChange={onChange}
                                            placeholder="Firstname Lastname" />



                                        <input
                                            type="number"
                                            name="age"
                                            id="password"
                                            value={age}
                                            onChange={onChange}
                                            placeholder="Age"
                                        />

                                        <select
                                            type="gender"
                                            id="password"

                                            name='gender'
                                            value={gender}
                                            onChange={onChange} placeholder="Select Sex"
                                        >
                                            <option value="" disabled hidden style={{ color: 'gray' }}>Select Sex</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>

                                        <input
                                            type="number"
                                            name='contact'
                                            value={contact}
                                            onChange={onChange}
                                            id="password"
                                            placeholder="Contact Number"
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            id="emailaddress"
                                            placeholder="Email"

                                            value={email}
                                            onChange={onChange}
                                        />
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="password"
                                            value={password}
                                            onChange={onChange}
                                        />

                                        <div className='form-group'>

                                            <div className='d-flex align-items-center'>
                                                <div>
                                                    <figure className='avatar mr-3 item-rtl'>
                                                        <img
                                                            src={avatarPreview}
                                                            className='rounded-circle'
                                                            alt='Avatar Preview'
                                                        />
                                                    </figure>
                                                </div>
                                                <div className='custom-file' id='emailaddress' style={{ width: '254px' }}>
                                                    <input
                                                        type='file'
                                                        name='avatar'
                                                        className='custom-file-input'
                                                        id='customFile'
                                                        accept="images/*"
                                                        onChange={onChange}
                                                    />
                                                    <label className='custom-file-label' htmlFor='customFile'>
                                                        Choose Avatar
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="login__button">
                                            <button
                                                id="login_button"
                                                type="submit"
                                                disabled={loading ? true : false}
                                            >
                                                Sign Up
                                            </button>
                                            {/* <a href="#">Forgot your password?</a> */}
                                        </div>



                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" id="formz" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-3">Sign Up</h1>

                                <div className="form-group">
                                    <label htmlFor="email_field">Name</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name='name'
                                        value={name}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email_field">Age</label>
                                    <input
                                        type="age"
                                        id="age_field"
                                        className="form-control"
                                        name='age'
                                        value={age}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email_field">Gender</label>
                                    <select
                                        type="gender"
                                        id="gender_field"
                                        className="form-control"
                                        name='gender'
                                        value={gender}
                                        onChange={onChange} placeholder="Select Gender">
                                        <option value="" disabled hidden>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email_field">Contact Number</label>
                                    <input
                                        type="contact"
                                        id="contact_field"
                                        className="form-control"
                                        name='contact'
                                        value={contact}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name='email'
                                        value={email}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        name='password'
                                        value={password}
                                        onChange={onChange}

                                    />

                                </div>


                                <div className='form-group'>
                                    <label htmlFor='avatar_upload'>Avatar</label>
                                    <div className='d-flex align-items-center'>
                                        <div>
                                            <figure className='avatar mr-3 item-rtl'>
                                                <img
                                                    src={avatarPreview}
                                                    className='rounded-circle'
                                                    alt='Avatar Preview'
                                                />
                                            </figure>
                                        </div>
                                        <div className='custom-file'>
                                            <input
                                                type='file'
                                                name='avatar'
                                                className='custom-file-input'
                                                id='customFile'
                                                accept="iamges/*"
                                                onChange={onChange}
                                            />
                                            <label className='custom-file-label' htmlFor='customFile'>
                                                Choose Avatar
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    id="register_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    REGISTER
                                </button>
                            </form>
                        </div>
                    </div> */}

                </Fragment>
            )
            }
        </Fragment>
    )
}

export default Register
