import React, { Fragment, useRef, useState } from 'react'
import { Route, Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'


import swal from 'sweetalert';
import moment from 'moment/moment'

const MyInquiries = (inquiries) => {
  const { user, loading } = useSelector(state => state.auth)

  //   console.log(inquiries)
  return (

    <Fragment>
      <div style={{}}>




        <div className="card" id='card-rectangle' style={{ justifyContent: 'space-between', display: 'flex' }}>
          <img className='imgcard' src={inquiries.inquiry.service_id.image}></img>
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
          <div className="card__label">{inquiries.inquiry.service_id.category.name}</div>
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
            <h5 className="card__info">Date: {moment(inquiries.created_At).format('MMM/DD/yy')}</h5>
            {/* end picture and name */}

          </div>
          <div className="card__btn-container">
            <button className="card__btn">



              <Link to={`/service/details/${inquiries.inquiry.service_id._id}`}>Details</Link>

            </button>

            {(inquiries.inquiry.status == 'pending')
              &&
              <button className="card__btn">




                <Link to={''} data-toggle="tooltip" data-placement="bottom" title="Cancel Inquiry">

                  Cancel
                </Link>

              </button>
            }
          </div>
        </div>











      </div>
    </Fragment>
  )
};

export default MyInquiries;