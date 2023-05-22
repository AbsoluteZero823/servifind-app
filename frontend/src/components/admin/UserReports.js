import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import Swal from 'sweetalert2'
import moment from 'moment/moment'
// import Sidebar from '../admin/Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getUserReports, clearErrors } from '../../actions/reportActions'
// import { DELETE_SERVICES_RESET } from '../../constants/serviceConstants'

const Reports = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let { id } = useParams();

    const { loading, error, reports } = useSelector(state => state.reports);
    // const { isDeleted } = useSelector(state => state.updelService)

    useEffect(() => {
        dispatch(getUserReports(id));

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

    const setReports = () => {
        const data = {
            columns: [
                {
                    label: 'Reported By',
                    field: 'reported_by',

                },
                {
                    label: 'Reason',
                    field: 'reason',

                },
                {
                    label: 'Description',
                    field: 'description',

                },
                {
                    label: 'Date Reported',
                    field: 'created_At',

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
                reported_by: <Fragment>

                    <img
                        className="anim"
                        src={report.reported_by.avatar.url}
                    />

                </Fragment>,
                reason: report.reason,
                description: report.description,
                created_At: moment(report.created_At).format('MMM/DD/yy'),

                actions: <Fragment>
                    <Link to={``} className="btn btn-primary py-1 px-2">
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
                            // theadStyle={headStyles}
                            style={tableStyles}

                        />
                    )}

                </Fragment>
            </div>



        </Fragment>
    )
}

export default Reports