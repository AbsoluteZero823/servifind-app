import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { updateProfile, loadUser, clearErrors } from '../../../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../../constants/userConstants'

import Loader from '../../layout/Loader'
// import MetaData from '../../layout/MetaData'

function BasicInfo({ formData, setFormData }) {

    // const [name, setName] = useState('')
    // const [age, setAge] = useState('')
    // const [gender, setGender] = useState('')
    // const [contact, setContact] = useState('')
    // // const [email, setEmail] = useState('')
    // const [avatar, setAvatar] = useState('')

    // const [avatarName, setAvatarName] = useState('')

    const { user, loading } = useSelector(state => state.auth)
    const { error, isUpdated } = useSelector(state => state.user)
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    useEffect(() => {



        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('User updated successfully')
            dispatch(loadUser());

            navigate('/application', { replace: true })

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }

    }, [dispatch, alert, error, navigate, user, isUpdated])


    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <div className="basic-info-container">


                        <div className='center'>
                            <figure className='profile-pic mr-3 item-rtl'>
                                <img
                                    src={user.avatar.url}
                                    className='rounded-circle'
                                    id='profile-pic'
                                    alt='Avatar Preview'
                                />
                            </figure>
                        </div>

                        <h5 style={{ color: "red" }} >*Make sure your details is correct</h5>
                        <div className='room'>
                            <div className='contents'>
                                <label htmlFor="email_field">Name: {user.name}</label>
                                <label htmlFor="email_field">Age: {user.age}</label>
                                <label htmlFor="email_field">Gender: {user.gender}</label>
                                <label htmlFor="email_field">Contact Number: {user.contact}</label>
                                {/* <label htmlFor="email_field">Email: {user.email}</label> */}
                            </div>
                        </div>


                        <button type="button" className="btn btn-primary" id='edit-right' data-toggle="modal" data-target="#exampleModalCenter">
                            edit <i className="fa fa-pencil-square-o"></i>
                        </button>
                        <br></br>
                    </div>





                </Fragment>
            )
            }
        </Fragment >
    );
}

export default BasicInfo;