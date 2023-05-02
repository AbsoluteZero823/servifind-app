import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";

import MetaData from '../layout/MetaData'
// import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newService, clearErrors } from '../../actions/serviceActions'
import { NEW_SERVICES_RESET } from '../../constants/serviceConstants'
import { getCategories } from '../../actions/categoryActions';

const NewService = () => {
    // const [name, setName] = useState('')
    const { user } = useSelector(state => state.auth)
    const { categories } = useSelector(state => state.categories);

    const alert = useAlert();
    const dispatch = useDispatch();

    let navigate = useNavigate();



    const [name, setName] = useState('');
    const [priceStarts_At, setPriceStarts_At] = useState('');
    const [category, setCategory] = useState('')
    const [imageName, setImageName] = useState('')
    const [image, setImage] = useState('')

    const { loading, error, success } = useSelector(state => state.addService);

    useEffect(() => {
        dispatch(getCategories())
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            navigate(`/services/${user.freelancer_id._id}`);
            alert.success('Service created successfully');
            dispatch({ type: NEW_SERVICES_RESET })
        }

    }, [dispatch, alert, error, success, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('category', category);
        formData.set('priceStarts_At', priceStarts_At);
        formData.set('images', image)


        dispatch(newService(formData))
    }

    const OnChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {

                setImage(reader.result)
                setImageName(e.target.files[0].name)

            }
        }
        // console.log(freelancerData.schoolID)
        reader.readAsDataURL(e.target.files[0])

    }

    return (
        <Fragment>

            <MetaData title={'Create Service'} />




            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-3">Create Service</h1>







                        <div className="service-info-container">

                            <label htmlFor="email_field">Select Category</label>

                            <select
                                name="category"
                                id="category"
                                className='form-control'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>


                                {categories.map((category) => (
                                    <option value={category._id} key={category._id}>{category.name}</option>

                                ))}



                            </select>
                            <br />
                            <label htmlFor="email_field">Service Name</label>
                            <input
                                type="text"
                                placeholder="I will ...... for you"
                                name='name'
                                className="form-control"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />

                            <br />
                            <label>Price Starts in (₱)</label>
                            <input
                                className="form-control"
                                placeholder="Price Starts At"
                                type="number"
                                id="priceStarts_At"
                                name="priceStarts_At"
                                min="5"
                                onChange={(e) => {
                                    setPriceStarts_At(e.target.value);
                                }}
                                value={priceStarts_At}
                            />

                            <div className='form-group'>
                                <br />
                                <label htmlFor="email_field">Image</label>
                                <div className='d-flex align-items-center'>
                                    {/* <div>
                        <figure className='avatar mr-3 item-rtl'>
                            <img
                                // src={avatarPreview}
                                className='rounded-circle'
                                alt='Avatar Preview'
                            />
                        </figure>
                    </div> */}
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='avatar'
                                            className='custom-file-input'
                                            id='customFile'
                                            accept='image/*'
                                            onChange={OnChange}
                                        />

                                        {imageName ? (
                                            <label className='custom-file-label' htmlFor='customFile'>

                                                {imageName}

                                            </label>

                                        ) : (
                                            <label className='custom-file-label' htmlFor='customFile'>

                                                Attach Service Image

                                            </label>

                                        )
                                        }

                                    </div>
                                </div>
                            </div>




                        </div>









                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            Create
                        </button>
                        <Link to={`/services/${user.freelancer_id._id}`} className="btn btn-danger btn-block py-3">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default NewService