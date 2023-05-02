
import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination';
import { Link, useParams } from "react-router-dom";
import MetaData from './layout/MetaData'
// import Animal from './animal/Animal'
import Loader from './layout/Loader'
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
// import { getAnimals } from '../actions/animalActions'
import { getFreelancers } from '../actions/freelancerActions';

// import Slider from 'rc-slider'
// import 'rc-slider/assets/index.css'


const Become = () => {

  // const { createSliderWithToolTip } = Slider;
  // const Range = createSliderWithToolTip(Slider.Range);


  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector(state => state.auth)
  const { freelancers, success } = useSelector(state => state.freelancers)
  const [isTupEmail, setIsTupEmail] = useState();
  const [isApplied, setIsApplied] = useState();




  // THIS FUNCTION VALIDATES IF EMAIL IS TUP EMAIL


  const validateEmail = () => {
    var regex = /^[^\s@]+@tup\.edu.ph$/;
    var result = regex.test(user && user.email);
    if (result == true) {
      //Proceed further
      console.log(result)
      setIsTupEmail(result)
    }
    else {
      console.log("Email address is not TUP email")
    }
  }

  const validateIfApplied = () => {
    freelancers.forEach((freelancer) => {
      if (user._id === freelancer.user_id) {
        setIsApplied(true)
      }
    });

  }

  useEffect(() => {
    dispatch(getFreelancers());

    if (success) {
      validateEmail();
      validateIfApplied();
    }


  }, [dispatch, success]);

  const NotTUPEmail = () => {
    Swal.fire(
      'Your Email is not TUP Email',
      'Only TUP students can apply for a freelancer',
      'warning'
    )
  }

  const AlreadyApplied = () => {
    Swal.fire(
      'You already sent an Application',
      'Please wait for a while, your application is on verification process',
      'info'
    )
  }

  return (
    <Fragment>
      <section id='cm-intro'>
        <MetaData title={'Become a Freelancer'} />
        <div className='intro'>
          <div className='welcome' style={{ padding: '0px 100px' }}>

            <h3 className='firstTitle'>Who are Eligible?</h3>

            <div className='infoBody' style={{ display: 'flex', }}>
              <div className='thirtyfive-percent'>
                <img src='../images/students-college.png' ></img>
              </div>
              <div style={{ width: '65%', paddingLeft: '110px', display: 'flex', flexDirection: 'column', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{ color: 'white', }}>
                  <h3 className='' style={{ paddingBottom: '10px' }}>To apply for freelancer, user must:</h3>

                  <h3 className=''>— Currently enrolled at Technological University of the Philippines Taguig Branch.</h3>
                  <h3 className=''>— Uses a verified TUP email account.</h3>
                  <h3 className=''>— Pass the requirements needed.</h3>

                  {/* <h3 className=''>Any student currently enrolled at Technological University of the Philippines Taguig Branch</h3> */}

                </div>

                <div style={{ paddingTop: '50px', display: 'flex', justifyContent: 'flex-start' }}>
                  {isTupEmail && !isApplied && (
                    <Link to='/application'><button className='nav-button'>Become a Freelancer</button></Link>
                  )}
                  {isTupEmail && isApplied && (
                    <button className='nav-button' onClick={AlreadyApplied}>Become a Freelancer</button>
                  )}
                  {/* <Link to='/application'><button className='nav-button'>Become a Freelancer</button></Link> */}
                  {!isTupEmail && (
                    <button className='nav-button' onClick={NotTUPEmail}>Become a Freelancer</button>
                  )}
                </div>
              </div>
            </div>
            {/* <h4 className='firstTitle' style={{ fontSize: "80px" }}>Want to Become a Freelancer?</h4> */}

            {/* <p>WHERE YOU CAN FIND THE BEST SERVICE IN THE RIGHT TIME ON THE RIGHT PERSON
            </p> */}



          </div>
          <img id='home' className='bg-pic' src='../images/TUPT.jpg'></img>

        </div>

      </section>


    </Fragment >
  );
}
export default Become
