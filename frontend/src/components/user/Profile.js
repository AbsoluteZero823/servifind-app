import React, { Fragment } from 'react'
import {
    Link
    // , useNavigate 
} from 'react-router-dom'
import {
    useSelector
    // , useDispatch 
} from 'react-redux'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

// import { getAdopt } from '../../actions/animalActions'
const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)
    // let navigate = useNavigate();
    // const dispatch = useDispatch();

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'My Profile'} />
                    <div style={{height:"calc(100vh - 100px)", display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <div className="profile-card">
                        <h1 className="profile-header">Profile Information</h1>
                        <div className="profile-info__container">
                            <img src={user && user.avatar.url} alt="" />
                            <div className="profile-info">
                                <div className="name">{user && user.name}</div>
                                <div className="emailaddress">{user && user.email}</div>
                                <div className="gender"><i className="fa-solid fa-user"></i>{user && user.gender}</div>
                                {/* <div className="address"><i className="fa-solid fa-location-dot"></i> #24 Ilang-ilang Street Purok 6-C Lower
                                    Bicutan Taguig City</div> */}
                                <div className="phonenum"><i className="fa-solid fa-phone"></i>{user && user.contact}</div>
                                <div className="profile-button">
                                    <Link to="/me/update" id="edit_profile">
                                        Edit Profile
                                    </Link>
                                    <Link to="/password/update">
                                        Change Password
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    {/* <h2 className="mt-5 ml-5">My Profile</h2>
                    <div className="flex-container space-between">
                        <div className="col card" id='profile-div'>
                            <figure className='img-placeholder'>
                                <img className="rounded-circle img-fluid" src={user && user.avatar.url} alt={user.name} />
                            </figure>

                            <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                                Edit Profile
                            </Link>

                        </div>

                        <div className="fa-solid fa-user">
                            <div className="row">
                                <div className="col-3">
                                    <h4>Full Name</h4>
                                    <p>{user.name}</p>
                                </div>

                                <div className="col-3">
                                    <h4>Age</h4>
                                    <p>{user.age}</p>
                                </div>


                                <div className="col-5">
                                    <h4>Gender</h4>
                                    <p>{user.gender}</p>
                                </div>

                                <div className="col-4">
                                    <h4>Contact Number</h4>
                                    <p>{user.contact}</p>
                                </div>

                                <div className="fa-solid fa-paper-plane">
                                    <h4>Email Address</h4>
                                    <p>{user.email}</p>
                                </div>

                                <div className="col-13">
                                    <h4>Joined On</h4>
                                    <p>{String(user.createdAt).substring(0, 10)}</p>
                                </div>
                            </div>
                      

                            <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                                Change Password
                            </Link>
                        </div>
                    </div> */}
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile