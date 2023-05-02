import React, { Fragment, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'




const Sidebar = () => {
    const { user, loading, isAuthenticated } = useSelector(state => state.auth)
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar" className='sidenav'>
                <ul className="list-unstyled components">
                    {user && user.role === "admin" && (
                        <li>
                            <Link to="/dashboard"><i className="fa fa-tachometer-alt" aria-hidden="true"></i> Dashboard</Link>
                        </li>
                    )}

                    {user && user.role === "freelancer" && (
                        <li>
                            <Link to="/freelancer/dashboard"><i className="fa fa-tachometer-alt" aria-hidden="true"></i> Dashboard</Link>
                        </li>
                    )}


                    {/* <li>
                        <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
                    </li> */}

                    {/* <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                    </li> */}

                    {user && user.role === "admin" && (
                        <li>
                            <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                                <i className="fa fa-users"></i> Users</a>
                            <ul className="collapse list-unstyled" id="productSubmenu">
                                <li>
                                    <Link to="/users"><i className="fa fa-clipboard"></i> All</Link>
                                </li>
                                <li>
                                    <Link to="/all/freelancers"><i className="fa fa-briefcase"></i> Freelancers</Link>
                                </li>
                                <li>
                                    <Link to="/application-entries"><i className="fa fa-briefcase"></i>Application for Freelancer</Link>
                                </li>
                                <li>
                                    <Link to="/application-premium"><i className="fa fa-briefcase"></i>Premium Application</Link>
                                </li>
                                <li>
                                    <Link to="/create"><i className="fa fa-plus"></i> Create</Link>
                                </li>
                            </ul>
                        </li>
                    )}
                    {user && user.role === "admin" && (
                        <li>
                            <Link to="/services"><i className="fa fa-cogs"></i>Services</Link>
                        </li>
                    )}
                    <li>
                        <Link to="/my-inquiries"><i className="fa fa-cogs"></i>My Inquiries</Link>
                    </li>
                    {user && user.role === 'freelancer' && (
                        <li>
                            <Link to="/client-inquiries"><i className="fa fa-cogs"></i>Client Inquiries</Link>
                        </li>

                    )}


                    <li>
                        <Link to="/chat"><i className="fa fa-envelope"></i>Messages</Link>
                    </li>
                    <li>
                        <Link to="/all"><i className="fa fa-cogs"></i>Available Services</Link>
                    </li>
                    <li>
                        <Link to="/my/transactions"><i className="fa fa-history"></i>Transactions</Link>
                    </li>
                    {/* <li>
                        <Link to="/admin/reviews"><i className="fa fa-star"></i> Reviews</Link>
                    </li> */}

                    {user && user.role === 'freelancer' && (
                        <li>
                            <Link to="/feed"><i className="fa fa-flag"></i>Requests Feed</Link>
                        </li>
                    )}
                    {user && user.role === 'admin' && (
                        <li>
                            <Link to="/admin/reviews"><i className="fa fa-flag"></i> Reports</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar