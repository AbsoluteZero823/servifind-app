import React, { Fragment, useRef, useState } from 'react'
import { Route, Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/userActions'



import swal from 'sweetalert';
import Search from './Search'

import 'mdbreact/dist/css/mdb.css'
import '../../App.css'
import { ChatState } from '../../Context/ChatProvider'


// import Header from "./Header";

const Header = () => {
    const [isMobile, setIsMobile] = useState(false);
    const alert = useAlert();
    const dispatch = useDispatch();

    const { notification, SetNotification } = ChatState();

    const { user, loading, isAuthenticated } = useSelector(state => state.auth)


    const logoutHandler = () => {
        dispatch(logout());
        // alert.success('Logged out successfully.')
        swal("Success!", "Logged Out Succesfully!", "success");
    }
    return (
        <div>
            <nav className="navbar" style={{ zIndex: '6' }}>

                <div className='fifteen-percent'>
                    {(!user || user.role === 'admin') &&
                        <a className='logo' href="/">

                            <img className='servi_logo' src="../images/ServiFind.png" />
                        </a>
                    }
                    {(user && user.role !== 'admin') &&
                        <a className='logo' href="/all">

                            <img className='servi_logo' src="../images/ServiFind.png" />
                        </a>
                    }
                </div>
                <div className="thirtyfive-percent">
                    <Search />
                </div>

                <ul className={isMobile ? "nav-links-mobile" : "nav-links"} onClick={() => setIsMobile(false)}>
                    {/* <ul className="nav-links"> */}
                    {/* <a href="/">
                    <li>HOME</li>
                </a> */}
                    {/* <Link to="/#our-team" href="#our-team"> */}

                    {!user && (
                        <a href="/#our-team">

                            <li>ABOUT</li>
                        </a>
                    )}
                    {!user && (
                        <a href="/#features">

                            <li>FEATURES</li>
                        </a>
                    )}
                    {!user && (
                        <a href="/#our-team">

                            <li>TERMS & CONDITION</li>
                        </a>
                    )}
                    {!user && (
                        <Link to="/all">
                            <li>SERVICES</li>
                        </Link>
                    )}
                    {user && user.role === "admin" && (
                        <Link to="/all">
                            <li>SERVICES</li>
                        </Link>
                    )}

                    {/* </Link> */}
                    {/* <Link to="/contact">
                    <li>CONTACT US</li>
                </Link> */}
                    {/* <Link to="/contact">Meet Our Team</Link> */}

                    {!user && (
                        <Link to="/register">
                            <li>SIGN UP</li>
                        </Link>
                    )}

                    {user ? (
                        <Fragment>
                            {/* <div className="btn text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-envelope"></i>

                                <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                    <Link className="dropdown-item" to="/me">Profile</Link></div>
                            </div> */}
                            <div className="ml-4 dropdown d-inline">

                                <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                    <figure className="avatar avatar-nav">
                                        <img
                                            src={user.avatar && user.avatar.url}
                                            alt={user && user.name}
                                            className="rounded-circle"
                                        />
                                    </figure>
                                    <span>{user && user.name}</span>
                                </Link>




                                <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                    {user && user.role === 'admin' && (
                                        <Link className="dropdown-item" to="/">Dashboard</Link>
                                    )}

                                    <Link className="dropdown-item" to="/me">Profile</Link>
                                    <Link className="dropdown-item" to="/chat">Inbox</Link>
                                    <Link className="dropdown-item" to="/manage-requests">Manage Request</Link>
                                    <Link className="dropdown-item" to="/post-request">Post a Request</Link>
                                    <hr></hr>
                                    {user && user.role === 'customer' && (
                                        <Link className="dropdown-item" to="/become-freelancer">Become a Freelancer</Link>
                                    )}
                                    {/* <Link className="dropdown-item" to="/orders/me">Orders</Link> */}
                                    {user && user.role === 'customer' && (
                                        <hr></hr>
                                    )}

                                    {user && user.role === 'freelancer' && !user.freelancer_id.isPremium && (
                                        <Fragment>
                                            <Link className="dropdown-item" to="/premium">Upgrade to Premium</Link>
                                            <hr></hr></Fragment>
                                    )}
                                    <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>Sign Out</Link>
                                    {/* <Link className="dropdown-item text-danger" to="/" >
                                    Logout
                                </Link> */}

                                </div>


                            </div>
                        </Fragment>
                    ) : !loading && <Link to="/login"><li><button className='nav-button'>SIGN IN</button></li></Link>}

                </ul>

                <button className="mobile-menu-icon" onClick={() => setIsMobile(!isMobile)}>
                    {isMobile ? (<i ><FaTimes></FaTimes></i>)
                        :
                        (<i ><FaBars></FaBars></i>)}
                </button>
            </nav>
            <nav className='navbar' style={{ position: 'static' }}></nav>
        </div>
    )
};

export default Header;