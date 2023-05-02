import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData'
// import Sidebar from '../admin/Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newUser, clearErrors } from '../../actions/userActions'
import { NEW_USERS_RESET } from '../../constants/userConstants'



const Create = () => {

    const [user, setUser] = useState({
        name: '',
        age: '',
        gender: '',
        contact: '',
        role: '',
        email: '',
        password: '',
    })

    const { name, age, gender, contact, role, email, password } = user;

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { error, loading, success } = useSelector(state => state.addUser);

    useEffect(() => {

        if (success) {
            navigate('/users');
            alert.success('User created successfully');
            dispatch({ type: NEW_USERS_RESET })
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, alert, success, error, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('age', age);
        formData.set('gender', gender);
        formData.set('contact', contact);
        formData.set('role', role);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);

        dispatch(newUser(formData))
        alert.success('User Created successfully.')
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

            <MetaData title={'New User'} />


            <div className="row wrapper col-13 col-md-10">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" id='formz' onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-3">Create User</h1>

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
                            <label htmlFor="email_field">Role</label>
                            <select
                                type="role"
                                id="role_field"
                                className="form-control"
                                name='role'
                                value={role}
                                onChange={onChange} placeholder="Select Role">
                                <option value="" disabled hidden>Select Role</option>
                                <option value="customer">Customer</option>
                                <option value="freelancer">Freelancer</option>


                            </select>
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
                            id="create_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            CREATE
                        </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Create
