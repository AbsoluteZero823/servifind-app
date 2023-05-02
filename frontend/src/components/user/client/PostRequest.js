
import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination';
import { Link, useParams } from "react-router-dom";
import MetaData from '../../layout/MetaData';
// import Animal from './animal/Animal'
// import Loader from './layout/Loader'
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getCategories, clearErrors, newCategory } from '../../../actions/categoryActions';
import { newRequest } from '../../../actions/requestActions';
import { useNavigate } from 'react-router-dom';
import { NEW_CATEGORY_RESET } from '../../../constants/categoryConstants';
// import React, { useEffect, useState } from 'react'

const PostRequest = () => {


    const alert = useAlert();
    const dispatch = useDispatch();

    let navigate = useNavigate();


    const { loading, error, categories } = useSelector(state => state.categories);
    const { user, isAuthenticated } = useSelector(state => state.auth)

    const { success } = useSelector(state => state.addRequest);

    const [category_id, setId] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        dispatch(getCategories())

        if (success) {
            navigate('/manage-requests');
            // alert.success('Service created successfully');
            Swal.fire(
                'Request Successfully Created!',
                '',
                'success'
            )
            dispatch({ type: NEW_CATEGORY_RESET })
        }

    }, [dispatch, alert, error, success, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        const requestData = new FormData();
        requestData.set('category', category_id);
        requestData.set('description', description);
        requestData.set('requested_by', user._id)
        // categoryData.set('service_id', transaction.inquiry_id.service_id._id);
        // categoryData.set('user', user._id)
        // categoryData.set('transaction_id', transaction._id)

        // dispatch(RateDone(transaction._id));
        dispatch(newRequest(requestData));




        // TODO:
        //         KEN INAVIGATE MO DAPAT SA MANAGE REQUEST AFTER MAG SUCCESS TO




        // dispatch(updateProfile(formData))

    }
    return (
        <Fragment>
            <MetaData title={'Post Request'} />
            <div className='newstyle'>
                <div className='mainsection'>
                    <div className='firstsection'>
                        <h3 className=''>Post Request</h3>
                        <img src='https://peopleintouch.com/wp-content/uploads/2019/11/illustratie-partner-compact.png' style={{ height: '50%', width: '100%' }}></img>
                    </div>
                    {/* forms */}
                    <div className='secondsection'>
                        <div style={{ padding: '10px 10px' }}>

                            {/* populate the service of the logged in freelancer */}


                            <form onSubmit={submitHandler}>
                                <br />
                                <label>What are you looking for? </label>
                                <textarea
                                    name="description"
                                    id="description" className="form-control mt-3"
                                    style={{ minHeight: '200px' }}
                                    placeholder='compose a detailed description of your request'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </textarea>
                                <br />
                                <label htmlFor="category">Category that best fit for your request</label>
                                <select
                                    name="reason"
                                    id="reason"
                                    className='form-control'
                                    value={category_id}
                                    onChange={(e) => setId(e.target.value)}
                                >
                                    <option value="">Select Category</option>


                                    {categories.map((category) => (
                                        <option value={category._id}>{category.name}</option>
                                        //   <li key={season.id}>{season}</li>
                                    ))}
                                    {/* categories.forEach(category => {
                    
                                        <option value={category._id}>{category.name}</option>
                                      

  
}) */}

                                </select>
                                <div style={{ paddingTop: '50px', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button className='nav-button' type="submit">Submit Request</button>
                                </div>
                            </form>
                            {/* <button>Submit</button> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <section id='cm-intro'>
                <div className='intro'>
                    <div className='welcome' style={{ padding: '0px 100px' }}>

                        <h3 className='firstTitle'>Who are Eligible?</h3>

                        <div className='infoBody' style={{ display: 'flex', }}>
                            <div className='thirtyfive-percent'>
                                <img src='../images/students-college.png' ></img>
                            </div>
                            <div style={{ width: '65%', paddingLeft: '110px', display: 'flex', flexDirection: 'column', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <div style={{ color: 'white', }}>
                                    <h3 className='' style={{ paddingBottom: '10px' }}>To apply for freelancer, user must:</h3>

                                    <h3 className=''>— Currently enrolled at Technological University of the Philippines Taguig Branch.</h3>
                                    <h3 className=''>— Uses a verified TUP email account.</h3>
                                    <h3 className=''>— Pass the requirements needed.</h3>

                                 

                                </div>
                                <div style={{ paddingTop: '50px', display: 'flex', justifyContent: 'flex-start' }}>
                                    <Link to='/application'><button className='nav-button'>Become a Freelancer</button></Link>
                                </div>
                            </div>
                        </div>



                    </div>
                    <img id='home' className='bg-pic' src='../images/TUPT.jpg'></img>

                </div>

            </section> */}


        </Fragment >
    );
}
export default PostRequest
