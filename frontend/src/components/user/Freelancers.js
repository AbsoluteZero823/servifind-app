import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
// import Sidebar from '../admin/Sidebar'


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allFreelancers, deleteUser, activateUser, deactivateUser, clearErrors } from '../../actions/userActions'
import { DELETE_USER_RESET, ACTIVATE_USER_RESET, DEACTIVATE_USER_RESET } from '../../constants/userConstants'


const Freelancers = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, users } = useSelector(state => state.users);
    const { isUpdated } = useSelector(state => state.user);
    const { isDeleted } = useSelector(state => state.updelUser);
    // const { user } = useSelector(state => state.auth)
    // const {id} = useParams();
    useEffect(() => {
        dispatch(allFreelancers());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Freelancer deleted successfully');
            navigate('/all/freelancers');
            dispatch({ type: DELETE_USER_RESET })
        }
        if (isUpdated) {
            alert.success('Freelancer Updated successfully');
            navigate('/all/freelancers');
            dispatch({ type: ACTIVATE_USER_RESET })
            dispatch({ type: DEACTIVATE_USER_RESET })
        }

    }, [dispatch, alert, error, isDeleted, isUpdated, navigate])


    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }
    const activateUserHandler = (id) => {
        dispatch(activateUser(id))

    }
    const deactivateUserHandler = (id) => {
        dispatch(deactivateUser(id))
    }
    const setUsers = () => {
        const data = {
            columns: [

                {
                    label: 'Avatar',
                    field: 'avatar'

                },

                // {
                //     label: 'User ID',
                //     field: 'id',
                //     sort: 'asc'
                // },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Age',
                    field: 'age',
                    sort: 'asc'
                },
                {
                    label: 'Gender',
                    field: 'gender',
                    sort: 'asc'
                },
                {
                    label: 'Contact Number',
                    field: 'contact',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                },
                {
                    label: 'Role',
                    field: 'role',
                },
                {
                    label: 'Status',
                    field: 'status',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        users.forEach(customer => {
            data.rows.push({
                avatar: <Fragment>

                    <img
                        className="anim"
                        src={customer.avatar.url}
                        alt="profile"
                    />

                </Fragment>,
                // id: customer._id,
                name: customer.name,
                age: customer.age,
                gender: customer.gender,
                contact: customer.contact,
                email: customer.email,
                role: customer.role,
                status: customer.status,

                actions: <Fragment>
                    {/* <Link to={`/user/${user._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link> */}
                    {customer.status !== 'activated' && (
                        //     <Link to={`/user/${user._id}`} className="btn btn-success py-1 px-2">
                        //     <i className="fa fa-lock"></i>
                        // </Link>

                        <button className="btn btn-warning py-1 px-2 ml-2" onClick={() => activateUserHandler(customer._id)}>
                            <i className="fa fa-lock"></i>
                        </button>
                    )}

                    {customer.status === 'activated' && (
                        //     <Link to={`/user/${user._id}`} className="btn btn-warning py-1 px-2">
                        //     <i className="fa fa-unlock"></i>
                        // </Link>
                        <button className="btn btn-success py-1 px-2 ml-2" onClick={() => deactivateUserHandler(customer._id)}>
                            <i className="fa fa-unlock"></i>
                        </button>
                    )}

                    {users && users.role === 'admin' && (
                        <Link to={`/user/${customer._id}`} className="btn btn-primary py-1 px-2 ml-2">
                            <i className="fa fa-pencil"></i>
                        </Link>
                    )}
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(customer._id)}>
                        <i className="fa fa-trash"></i>
                    </button>

                </Fragment>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <MetaData title={'All Users'} />



            <Fragment>
                <div className='forTable'>
                    <h1>All Freelancers
                        <span> <Link to="/create" className="btn update-btn fa fa-plus">
                        </Link> </span>
                    </h1>

                    {loading ? <Loader /> : (
                        <MDBDataTable
                            data={setUsers()}
                            className="px-3"
                            bordered
                            striped
                            hover
                            scrollY
                            maxHeight='48vh'
                        />
                    )}
                </div>
            </Fragment>



        </Fragment>
    )
}

export default Freelancers