import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
// import Sidebar from '../admin/Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getServices, deleteService, clearErrors } from '../../actions/serviceActions'
import { DELETE_SERVICES_RESET } from '../../constants/serviceConstants'

const Services = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, services } = useSelector(state => state.services);
    const { isDeleted } = useSelector(state => state.updelService)

    useEffect(() => {
        dispatch(getServices());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Service deleted successfully');
            navigate('/services');
            dispatch({ type: DELETE_SERVICES_RESET })
        }

    }, [dispatch, alert, error, isDeleted, navigate])


    const deleteUserHandler = (id) => {
        dispatch(deleteService(id))
    }

    const setServices = () => {
        const data = {
            columns: [

                {
                    label: 'Service ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },

                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        services.forEach(service => {
            data.rows.push({

                id: service._id,
                name: service.name,

                // status: animal.status,

                actions: <Fragment>
                    <Link to={`/service/${service._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil-alt"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(service._id)}>
                        <i className="fa fa-trash"></i>
                    </button>

                </Fragment>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <MetaData title={'All Services'} />






            <div className="Details col-13 col-md-9">
                <div className='forTable'>
                    <Fragment>
                        {/* <h1 className="my-5">ALL Services</h1> */}
                        {/* <h3>Add Services
                            <span> <Link to="/service/new" className="btn update-btn fa fa-plus">
                            </Link> </span>
                        </h3> */}

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setServices()}
                                className="px-3"
                                bordered
                                striped
                                hover
                                scrollY
                                maxHeight='48vh'
                            />
                        )}

                    </Fragment>
                </div>
            </div>


        </Fragment>
    )
}

export default Services