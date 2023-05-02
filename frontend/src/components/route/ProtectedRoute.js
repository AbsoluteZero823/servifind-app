import React, { Fragment } from 'react'
import { Route, Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from "../layout/Loader";

const ProtectedRoute = ({ isAdmin = false, adminOnly = false, children }) => {
    const { isAuthenticated, loading, user } = useSelector(state => state.auth)
    console.log(children.type.name, isAuthenticated, loading, user)
    let navigate = useNavigate();

    if (loading === false) {
        //console.log(isAuthenticated)
        if (isAuthenticated === undefined || isAuthenticated === false) {

            return <Navigate to='/login' />;
        }

        if (isAdmin === true && user.role === 'adopter') {
            return <Navigate to='/' />;
        }

        if (adminOnly === true && user.role !== 'admin') {
            return <Navigate to='/' />;
        }
        return children;
    }
    return <Loader />
}

export default ProtectedRoute