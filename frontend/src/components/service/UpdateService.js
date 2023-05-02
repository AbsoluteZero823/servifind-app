import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom";

import MetaData from '../layout/MetaData'
// import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateService, getServiceDetails, clearErrors } from '../../actions/serviceActions'
import { UPDATE_SERVICES_RESET } from '../../constants/serviceConstants'

const UpdateService = () => {

    const [name, setName] = useState('')


    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector(state => state.updelService);
    const { service } = useSelector(state => state.serviceDetails)
    // const { loading, error, services } = useSelector(state => state.services);
    const { id } = useParams();

    useEffect(() => {


        if (service && service._id !== id) {
            dispatch(getServiceDetails(id))
        } else {
            setName(service.name);

        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Service updated successfully')

            navigate('/services')

            dispatch({
                type: UPDATE_SERVICES_RESET,

            })
        }

    }, [dispatch, alert, error, navigate, isUpdated, id, service])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);

        // formData.set('status', status);

        dispatch(updateService(service._id, formData))
    }

    // const onChange = e => {

    //         const reader = new FileReader();

    //         reader.onload = () => {
    //             if (reader.readyState === 2) {
    //                 setImagesPreview(reader.result)
    //                 setImages(reader.result)
    //             }
    //         }

    //         reader.readAsDataURL(e.target.files[0])
    // }


    return (
        <Fragment>
            <MetaData title={`Update Service`} />




            <div className="row wrapper">
                <div className="col-10 col-lg-4">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update Service</h1>



                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>


                        {/* <div className="form-group">
                                            <label htmlFor="email_field">Age</label>
                                            <input
                                                type="age"
                                                id="age_field"
                                                className="form-control"
                                                name='age'
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                            />
                                        </div> */}

                        {/*                                    
                                        <div className="form-group">
                                            <label htmlFor="email_field">Gender</label>
                                            <select id="gender_field" className="form-control" name='gender' value={gender} onChange={(e) => setGender(e.target.value)} >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div> */}

                        {/*                                   
                                        <div className="form-group">
                                            <label htmlFor="contact_field">Breed</label>
                                            <input
                                                type="breed"
                                                id="breed_field"
                                                className="form-control"
                                                name='breed'
                                                value={breed}
                                                onChange={(e) => setBreed(e.target.value)}
                                            />
                                        </div> */}


                        {/* <div className="form-group">
                                            <label htmlFor="address_field">Type</label>
                                            <select id="type_field" className="form-control" name='type' value={type} onChange={(e) => setType(e.target.value)} >
                                                <option value="Cat">Cat</option>
                                                <option value="Dog">Dog</option>
                                            </select>
                                        </div> */}


                        {/* <div className='form-group'>
                                        <label htmlFor='images_upload'>Image</label>
                                        <div className='d-flex align-items-center'>
                                            <div>
                                                <figure className='avatar mr-3 item-rtl'>
                                                    <img
                                                        src={imagesPreview}
                                                        className='rounded-circle'
                                                        alt='Images Preview'
                                                    />
                                                </figure>
                                            </div>
                                            <div className='custom-file'>
                                                <input
                                                    type='file'
                                                    name='images'
                                                    className='custom-file-input'
                                                    id='customFile'
                                                    accept='image/*'
                                                    onChange={onChange}
                                                />
                                                <label className='custom-file-label' htmlFor='customFile'>
                                                    Upload Image
                                                </label>
                                            </div>
                                    </div>
                                </div> */}


                        {/* ////////////////////////// */}
                        {/* <div className="col-4">
                                        <div className="form-group">
                                            <label htmlFor="status_field">Status</label>
                                            <select id="status_field" className="form-control" name='status' value={status} onChange={(e) => setStatus(e.target.value)} >
                                                <option value="" disabled hidden>Select Status</option>
                                                <option value="Unhealthy">Unhealthy</option>
                                                <option value="Healthy">Healthy</option>
                                            </select>
                                        </div>
                                    </div> */}
                        {/* ////////////////////// */}

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false} >Update</button>
                        {/* <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button> */}
                        <Link to="/services" className="btn update-btn btn-block mt-4 mb-3">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>



        </Fragment>
    )
}

export default UpdateService