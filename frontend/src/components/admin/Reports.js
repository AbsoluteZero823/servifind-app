import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import Swal from 'sweetalert2'
import moment from 'moment/moment'
// import Sidebar from '../admin/Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getReports, clearErrors } from '../../actions/reportActions'
// import { DELETE_SERVICES_RESET } from '../../constants/serviceConstants'

const Reports = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, reports } = useSelector(state => state.reports);
    // const { isDeleted } = useSelector(state => state.updelService)

    useEffect(() => {
        dispatch(getReports());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        // if (isDeleted) {
        //     alert.success('Report deleted successfully');
        //     navigate('/reports');
        //     dispatch({ type: DELETE_REPORTS_RESET })
        // }

    }, [dispatch, alert, error, navigate])


    // const deleteUserHandler = (id) => {
    //     dispatch(deleteService(id))
    // }

    const setReports= () => {
        const data = {
            columns: [

                {
                    label: 'Reported',
                    field: 'user_reported',
               
                },
                {
                    label: 'Name',
                    field: 'name',
                   
                },
                {
                    label: 'Role',
                    field: 'role',
                   
                },
                {
                    label: 'Contact Number',
                    field: 'contact',
                   
                },
                {
                    label: 'Email',
                    field: 'email',
                   
                },
                {
                    label: 'Joined Date',
                    field: 'createdAt',
                   
                },
                {
                    label: 'Reports',
                    field: 'reports',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        reports.forEach(report => {
            data.rows.push({

                // user_reported: report.user_reported.avatar.url,
                user_reported: <Fragment>

                <img
                    className="anim"
                    src={report.avatar.url}
                />

            </Fragment>,
                name: report.name,
                role: report.role,
                contact: report.contact,
                email: report.email,
                createdAt: moment(report.createdAt).format('MMM/DD/yy'),
                // status: animal.status,
                reports: <Fragment>
    
                    {report.reportCount > 0 && (
                        <Link className='offers' to={`/user-reports/${report._id}`}>
                            <a href="#" className="notification">
                                <span style={{ color: 'white' }}>Reports</span>
                                <span className="badge">{report.reportCount}</span>
                                {/* <i className="fa fa-pencil-alt"></i> */}
                            </a>
                        </Link>
                    )}
            </Fragment>,
                actions: <Fragment>
                    <Link to={`/report/${report._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil-alt"></i>
                    </Link>
                    {/* <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(report._id)}>
                        <i className="fa fa-trash"></i>
                    </button> */}

                </Fragment>
            })
        })

        return data;
    }

    const headStyles = {
        whiteSpace: 'nowrap',
      };

      const tableStyles = {
        maxHeight: '48vh',
        overflowY: 'auto',
      };
    return (
        <Fragment>
            <MetaData title={'All Reports'} />






           
                <div className='forTable'>
                    <Fragment>
                        {/* <h1 className="my-5">ALL Services</h1> */}
                        {/* <h3>Add Services
                            <span> <Link to="/service/new" className="btn update-btn fa fa-plus">
                            </Link> </span>
                        </h3> */}

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setReports()}
                                // className="px-3"
                                className="custom-table"
  bordered
  striped
  hover
  responsive
  scrollY
//   width= "100%"
  scrollX
                                maxHeight='48vh'
                                theadStyle={headStyles}
                                style={tableStyles}
                                
                            />
                        )}

                    </Fragment>
                </div>
          


        </Fragment>
    )
}

export default Reports