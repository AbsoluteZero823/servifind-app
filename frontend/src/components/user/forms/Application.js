import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MetaData from '../../layout/MetaData'

import { useAlert } from 'react-alert'
import { useSelector, useDispatch } from 'react-redux'

import Loader from '../../layout/Loader'

import BasicInfo from "./BasicInfo";

import ServiceInfo from "./ServiceInfo";
import VerificationProof from './VerificationProof';
import { updateProfile, loadUser } from '../../../actions/userActions'

import { newFreelancer, clearErrors } from '../../../actions/freelancerActions'
import { newService } from '../../../actions/serviceActions';

import { NEW_FREELANCER_RESET } from '../../../constants/freelancerConstants'

const Application = () => {


    const dispatch = useDispatch()
    const alert = useAlert();
    let navigate = useNavigate();

    const [page, setPage] = useState(0);
    // const { error } = useSelector(state => state.addService);
    const [avatarName, setAvatarName] = useState('')
    const [avatar, setAvatar] = useState('')
    const { freelancer, error, success } = useSelector(state => state.addFreelancer);
    const { user, isAuthenticated } = useSelector(state => state.auth)
    const [avatarPreview, setAvatarPreview] = useState(user && user.avatar.url);

    const [freelancerData, setFreelancerData] = useState({


        // user_id: user && user._id,
        course:"",
        resume: "",
        schoolID: ""

    });

    const [serviceData, setServiceData] = useState({
        category: "",
        name: "",
        priceStarts_At: ""


    });

    const [formDatas, setFormData] = useState({

        name: user && user.name,
        age: user && user.age,
        gender: user && user.gender,
        contact: user && user.contact,
        // avatar: user && user.avatar,
        // avatarPreview: user && user.avatar.url

    });



    const FormTitles = ["Personal Info", "Your First Service", "Verification & Proof"];
    const { loading } = useSelector(state => state.auth)
    const PageDisplay = () => {
        if (page === 0) {
            return <BasicInfo />;
        } else if (page === 1) {
            return <ServiceInfo serviceData={serviceData} setServiceData={setServiceData} />;
        } else {
            return <VerificationProof freelancerData={freelancerData} setFreelancerData={setFreelancerData} />;
        }
    };
    // const [user, setUser] = useState({
    //     name: '',
    //     age: '',
    //     gender: '',
    //     contact: '',
    //     email: '',
    //     password: '',
    // })

    // const { name, age, gender, contact, email, password } = user;

    // const [avatar, setAvatar] = useState('')
    // const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

    // const alert = useAlert();
    // const dispatch = useDispatch();
    // let navigate = useNavigate();

    // const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    // useEffect(() => {



    //     if (error) {
    //         alert.error(error);
    //         dispatch(clearErrors());
    //     }

    // }, [dispatch, alert, isAuthenticated, error, navigate])

    useEffect(() => {

        if (user) {
            // setName(user.name);
            // setAge(user.age);
            // setGender(user.gender);
            // setContact(user.contact);
            // // setEmail(user.email);

            // setFormData({ ...formData, avatarPreview: user.avatar.url })
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            // navigate('/services');
            alert.success('Application sent successfully');
            // console.log(freelancer._id)

            createService(freelancer._id)
            // dispatch(newService(servicesData))

            dispatch({ type: NEW_FREELANCER_RESET });
        }

    }, [dispatch, alert, error, success, navigate, user])

    const submitHandler = (e) => {
        e.preventDefault();

        // console.log(freelancerData);
        // console.log(serviceData);
        const freelancersData = new FormData();
        freelancersData.set('course', freelancerData.course);
        freelancersData.set('resume', freelancerData.resume);
        freelancersData.set('schoolID', freelancerData.schoolID);



        // freelancersData.set('avatar', avatar);
        console.log(freelancersData)
        dispatch(newFreelancer(freelancersData));


        // alert.success('Registered successfully.')
    }

    const createService = (id) => {

        const servicesData = new FormData();
        servicesData.set('category', serviceData.category);
        servicesData.set('name', serviceData.name);
        servicesData.set('priceStarts_At', serviceData.priceStarts_At);
        servicesData.set('freelancer_id', id);
        // console.log(servicesData);
        dispatch(newService(servicesData));

    }

    const submitUpdateHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', formDatas.name);
        formData.set('age', formDatas.age);
        formData.set('gender', formDatas.gender);
        formData.set('contact', formDatas.contact);
        // formData.set('email', email);
        formData.set('avatar', avatar);

        document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));

        // console.log(formData)
        dispatch(updateProfile(formData))
    }


    const onChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                // setFormData({ ...formData, avatarPreview: reader.result })
                setAvatarPreview(reader.result);
                // setFormData({ ...formDatas, avatar: reader.result })
                setAvatar(reader.result)

                setAvatarName(e.target.files[0].name)
                // console.log(reader.result)
            }
        }
        // console.log(avatarPreview)
        reader.readAsDataURL(e.target.files[0])

    }
    // const onChange = e => {
    //     if (e.target.name === 'avatar') {

    //         const reader = new FileReader();

    //         reader.onload = () => {
    //             if (reader.readyState === 2) {
    //                 setAvatarPreview(reader.result)
    //                 setAvatar(reader.result)
    //             }
    //         }

    //         reader.readAsDataURL(e.target.files[0])

    //     } else {
    //         setUser({ ...user, [e.target.name]: e.target.value })
    //     }
    // }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>

                    <MetaData title={'Freelancer Application'} />





                    <form className="form" onSubmit={submitHandler} encType='multipart/form-data'>
                        <div className="progressbar">
                            <div
                                style={{ width: page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%" }}
                            ></div>
                        </div>
                        <div className="form-container">
                            <div className="fheader">
                                <h1>{FormTitles[page]}</h1>
                            </div>
                            <div className="fbody">{PageDisplay()}</div>
                            <div className="ffooter">
                                <button
                                    type='button'
                                    disabled={page === 0}
                                    onClick={() => {
                                        setPage((currPage) => currPage - 1);
                                    }}
                                >
                                    Prev
                                </button>
                                {page === FormTitles.length - 1 ? (

                                    <button
                                        type='submit'
                                    // type={page === FormTitles.length - 1 ? 'submit' : ''}
                                    // onClick={() => {
                                    //     if (page === FormTitles.length - 1) {
                                    //         // alert.success("FORM SUBMITTED");

                                    //         // console.log(freelancerData);
                                    //     } else {

                                    //     }
                                    // }}
                                    >
                                        Submit
                                    </button>
                                ) : (
                                    <Fragment>

                                        <button
                                            type='button'
                                            // type={page === FormTitles.length - 1 ? 'submit' : ''}
                                            onClick={() => {
                                                if (page === FormTitles.length - 1) {
                                                    // alert.success("FORM SUBMITTED");

                                                    // console.log(freelancerData);
                                                } else {
                                                    setPage((currPage) => currPage + 1);
                                                }
                                            }}
                                        >
                                            Next
                                        </button>
                                    </Fragment>
                                )}


                                {/* <button
                                    type={page === FormTitles.length - 1 ? 'submit' : ''}
                                    onClick={() => {
                                        if (page === FormTitles.length - 1) {
                                            // alert.success("FORM SUBMITTED");

                                            // console.log(freelancerData);
                                        } else {
                                            setPage((currPage) => currPage + 1);
                                        }
                                    }}
                                >
                                    {page === FormTitles.length - 1 ? "Submit" : "Next"}
                                </button> */}
                            </div>
                        </div>
                    </form>


                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalCenterTitle">Edit Info</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form className="a" onSubmit={submitUpdateHandler} encType='multipart/form-data'>
                                    <div className="modal-body">

                                        <div className="form-group">
                                            <label htmlFor="email_field">Name</label>
                                            <input
                                                type="name"
                                                id="name_field"
                                                className="form-control"
                                                name='name'
                                                value={formDatas.name}
                                                onChange={(e) => setFormData({ ...formDatas, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email_field">Age</label>
                                            <input
                                                type="age"
                                                id="age_field"
                                                className="form-control"
                                                name='age'
                                                value={formDatas.age}
                                                onChange={(e) => setFormData({ ...formDatas, age: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email_field">Sex</label>
                                            <select
                                                type="gender"
                                                id="gender_field"
                                                className="form-control"
                                                name='gender'
                                                value={formDatas.gender}
                                                onChange={(e) => setFormData({ ...formDatas, gender: e.target.value })}>
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
                                                value={formDatas.contact}
                                                onChange={(e) => setFormData({ ...formDatas, contact: e.target.value })}
                                            />
                                        </div>

                                        {/* <div className="form-group">
                                            <label htmlFor="email_field">Email</label>
                                            <input
                                                type="email"
                                                id="email_field"
                                                className="form-control"
                                                name='email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div> */}

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
                                                        accept='image/*'
                                                        onChange={onChange}

                                                    />
                                                    <label className='custom-file-label' htmlFor='customFile'>
                                                        {/* Choose Avatar */}
                                                        {avatarName}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary" >Save changes</button>


                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </Fragment>
            )
            }
        </Fragment >
    )
}

export default Application
