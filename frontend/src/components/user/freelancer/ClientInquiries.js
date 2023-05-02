import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Route, Link, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import Loader from '../../layout/Loader'
import swal from 'sweetalert';
import { getSingleInquiry } from '../../../actions/inquiryActions'
import { SINGLE_INQUIRY_RESET } from '../../../constants/inquiryConstants'

import { updateStatus } from '../../../actions/inquiryActions'

import { newTransaction, clearErrors } from '../../../actions/transactionActions';
import { NEW_TRANSACTION_RESET } from '../../../constants/transactionConstants'
import $ from 'jquery';
// import swal from 'sweetalert'

const MyInquiries = (inquiries) => {
    const { user } = useSelector(state => state.auth)
    const { inquiry, loading } = useSelector(state => state.singleInquiry)

    const dispatch = useDispatch();
    const { transaction, error, success } = useSelector(state => state.transaction)

    const [tungak, setInquiry_id] = useState('')
    let navigate = useNavigate();
    useEffect(() => {


        // console.log(service.user._id)

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {

            swal("Success!", "Transaction created successfully", "success");

            navigate('/')
            dispatch({ type: NEW_TRANSACTION_RESET })

            // navigate('/');
            // alert.success('Transaction created successfully');
            // dispatch({ type: NEW_TRANSACTION_RESET })
        }


    }, [dispatch, alert, navigate, error, success])

    const viewDetailsHandler = (id) => {
        dispatch(getSingleInquiry(id))



        console.log(inquiry)
    }
    const submitHandler = (e) => {
        e.preventDefault();

        //   alert('gawin mo na to ken')
        const formData = new FormData();
        const statusData = new FormData();

        formData.set('inquiry_id', inquiry._id);
        statusData.set('status', 'accepted');
        dispatch(updateStatus(tungak, statusData));
        dispatch(newTransaction(formData));
        //   ('#exampleModalCenter').modal({ backdrop: 'static', keyboard: false })
        $('.modal-backdrop').hide();
        $('body').removeClass('modal-open');
        //   $('#exampleModalCenter').modal('hide');
        //   $('#<%=hfImg.ClientID%>').val("");
    }
    //   console.log(inquiries)
    return (

        <Fragment>
            <div>




                <div className="card" id='card-rectangle' style={{ justifyContent: 'space-between', display: 'flex' }}>
                    <img className='imgcard' src={inquiries.inquiry.customer.avatar.url}></img>
                    {/* {users && users.map((user, index) => (

service.user_id === users[index]._id && (

    <div className='freelancer-info'>
        <img
            src={user.avatar && user.avatar.url}
            alt={users && users.name}
            key={service._id}
            className="rounded-img"
        />
       
        <a className='black-name'>{user.name}</a>
        
    </div>
)

))} */}
                    {/* <div className="card__label">{inquiries.inquiry.service_id.category.name}</div> */}
                    <div className="card__inqcontent">

                        <h4 className="card__info">Service: {inquiries.inquiry.service_id.name}</h4>
                        {/* <p>{service.title}</p> */}

                        {/* <p><span className="fw7">sserse</span></p> */}

                        {/* picture and name */}
                        <h5 className="card__info">Status: {inquiries.inquiry.status}</h5>
                        <div className='row' style={{ display: 'flex', flexDirection: 'row', flex: '50%' }}><center>Freelancer: </center>
                            <div style={{
                                width: 25,
                                height: 25,
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: 50,
                                backgroundColor: 'gainsboro',
                            }}>
                                <img src={inquiries.inquiry.service_id.user.avatar.url} style={{
                                    height: 25,
                                    width: 'auto'
                                }}></img>
                            </div>
                            <center className="justified" href="" style={{ fontSize: '20px' }}>{inquiries.inquiry.service_id.user.name}</center>

                        </div>
                        <h5 className="card__info">Date inquired: 02/13/2023</h5>
                        {/* end picture and name */}

                    </div>
                    <div className="card__btn-container">





                        <button className="card__btn" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => viewDetailsHandler(inquiries.inquiry._id)}>


                            {/* <Link data-toggle="tooltip" data-placement="bottom" title={inquiries.inquiry._id}>  */}
                            View Details
                            {/* </Link>  */}
                        </button>


                        <button className="card__btn">



                            <Link to={''} data-toggle="tooltip" data-placement="bottom" title="Cancel Inquiry">

                                Message
                            </Link>
                        </button>
                    </div>
                </div>











            </div>


            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered" role="document">

                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Inquiry Details</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>



                        <form className="a" onSubmit={submitHandler} encType='multipart/form-data' >

                            {loading ? <Loader /> : (
                                <Fragment>

                                    <div className="modal-body">

                                        <div className="form-group">

                                            <label htmlFor="email_field">Instruction: {inquiry.instruction}</label>
                                            {/* <label htmlFor="email_field">Instruction: {inquiry.instruction}</label> */}
                                            {/* <textarea
                type="text"
                placeholder="Instruction for the freelancer"
                className="form-control"
                value={itoyun.instruction}
                readOnly
                // onChange={(e) => setInstruction(e.target.value)}
            /> */}
                                            {/* <p>{itoyun.instruction}</p> */}

                                        </div>










                                    </div>



                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        {(inquiry && inquiry.status === 'pending') && (
                                            <button type="submit" className="btn btn-primary" onClick={() => setInquiry_id(inquiry._id)} >Accept Inquiry & Start</button>
                                        )}
                                        {/* onClick={() => viewDetailsHandler(inquiries.inquiry._id)} */}

                                    </div>
                                </Fragment>
                            )
                            }

                        </form>


                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default MyInquiries;