
import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination';
import { useParams } from "react-router-dom";
import MetaData from './layout/MetaData'
// import Animal from './animal/Animal'
import Loader from './layout/Loader'
import Footer from './layout/Footer'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
// import { getAnimals } from '../actions/animalActions'

// import Slider from 'rc-slider'
// import 'rc-slider/assets/index.css'


const Home = () => {

  // const { createSliderWithToolTip } = Slider;
  // const Range = createSliderWithToolTip(Slider.Range);


  const alert = useAlert();
  const dispatch = useDispatch();



  // const { loading, animals, error, animalsCount, resPerPage, filteredAnimalsCount } = useSelector(state => state.animals);


  // const [currentPage, setCurrentPage] = useState(1)
  // let { keyword } = useParams();


  // useEffect(() => {
  //   if (error) {
  //     alert.success('success')
  //     return alert.error(error)
  //   }

  // dispatch(getAnimals(currentPage, keyword))


  // }, [dispatch, alert, error, currentPage, keyword]);

  // function setCurrentPageNo(pageNumber) {
  //   setCurrentPage(pageNumber)
  // }
  // let count = animalsCount;

  // if (keyword) {
  //   count = filteredAnimalsCount
  // }
  return (
    <Fragment>
      <MetaData title={'Home'} />
      <div className='landing-page_container'>
        <div className="hero-container">
          <div className="hero-greet">
            <div className="hero-greet_text">
              <h1>Welcome to ServiFind</h1>
              <p>Where you can find the best service in the right time on the right person</p>
              <a href="/login">Get Started <i className="fa fa-arrow-right"></i></a>
            </div>
          </div>
          <div className="mobile-version">
            <img className="mobile-ver-img" src="../images/mobile-servifind.png" alt="" />
            <a className="app-btn blu flex vert"
              href="https://expo.dev/artifacts/eas/764RGoPNVLqw33DgWvSQcf.apk">
              <img src="../images/android.png" alt="" />
              <p>Get it on <br /> <span className="big-txt">Google Play</span></p>
            </a>
          </div>
        </div>
        <div className="services-container">
          <h1>Our Services</h1>
          <div className="getry">
            <div className="trypotangina">
              <div className="services__one-info info-services">
                {/* <!-- <h1>01.</h1> --> */}
                <h2>Writing & Translation</h2>
              </div>
            </div>
            <div className="trypotangina1">
              <div className="services__one-info1 info-services">
                {/* <!-- <h1>02.</h1> --> */}
                <h2>Graphic Design & Multimedia</h2>
              </div>
            </div>
          </div>
          <div className="getry">
            <div className="trypotangina3">
              <div className="services__one-info info-services">
                {/* <!-- <h1>03.</h1> --> */}
                <h2>Programming & IT</h2>
              </div>
            </div>
            <div className="trypotangina4">
              <div className="services__one-info1 info-services">
                {/* <!-- <h1>04.</h1> --> */}
                <h2>Creative & Artistic</h2>
              </div>
            </div>
          </div>
          <div className="getry">
            <div className="trypotangina5">
              <div className="services__one-info info-services">
                {/* <!-- <h1>05.</h1> --> */}
                <h2>Engineering & Architecture</h2>
              </div>
            </div>
            <div className="trypotangina6">
              <div className="services__one-info1 info-services">
                {/* <!-- <h1>06.</h1> --> */}
                <h2>Education & Training</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="feature-container" id='features'>
          <h1>Features</h1>
          <div className="feature-card">
            <div className="fcard">
              <div className="feature-card-title">
                <img src="images/icons8-search-60.png" alt="" />
                Search
              </div>
              <div className="feature-text">
                The ServiFind application has a search function where users can search desired services.
              </div>
            </div>
            <div className="fcard">
              <div className="feature-card-title">
                <img src="images/icons8-chat-96.png" alt="" />
                Chat
              </div>
              <div className="feature-text">The ServiFind application come up with this feature for both users can
                communicate and
                negotiate to
                each other by
                sending a message or query about the said services and services that the freelancer wants to
                cater.
              </div>
            </div>
            <div className="fcard">
              <div className="feature-card-title">
                <img src="images/icons8-post-68.png" alt="" />
                Feed
              </div>
              <div className="feature-text">
                The ServiFind application has a 2-way post feed, both users can post on feed either finding
                a
                freelancer or a client.
              </div>
            </div>
            <div className="fcard">
              <div className="feature-card-title">
                <img src="images/icons8-payment-64.png" alt="" />
                Payment
              </div>
              <div className="feature-text">
                The ServiFind application primarily promotes the social distancing and paying online can be
                done
                at
                any place.
                Payment feature
                will be optional for
                users, either they want to transfer payment on <strong>GCash QR code</strong> or they want
                to
                transfer the
                payment personally.
              </div>
            </div>
          </div>
        </div>
        <div className="subscription__plan-container">
          <h1>Pricing</h1>
          <div className="subscription__wrapper-card">
            <div className="subscription__card-basic">
              <div className="subscription-header">
                <h2>Basic</h2>
                <h2>₱0 <span>/ Month</span></h2>
              </div>
              <p>
                <img src="../images/check.png" alt="" />
                All time links
              </p>
              <p>
                <img src="../images/check.png" alt="" />
                Basic Features
              </p>
              <p>
                <img src="../images/check.png" alt="" />
                No unlimited features
              </p>
              <p>
                <img src="../images/check.png" alt="" />
                Limited functions
              </p>
              <a href="#">Choose Plan</a>
            </div>
            <div className="subscription__card-premium">
              <div className="subscription-header">
                <h2>Premium</h2>
                <h2>₱50 <span>/ Month</span></h2>
              </div>
              <p>
                <img src="../images/check.png" alt="" />
                All time links
              </p>
              <p>
                <img src="../images/check.png" alt="" />
                Basic Features
              </p>
              <p>
                <img src="../images/check.png" alt="" />
                No unlimited features
              </p>
              <p>
                <img src="../images/check.png" alt="" />
                Limited functions
              </p>
              <a href="#">Choose Plan</a>
            </div>
          </div>
        </div>
        <div className="meet-team" id='our-team'>
          <h1>Meet Our Team</h1>
          <div className="meet-card-wrapper">
            <div className="meet-card">
              <img src="images/team1.jpg" alt="" />
              <h3>Cherry May Agustin</h3>
              <div className="teamrole">Paper Manager/ Web Designer</div>
            </div>
            <div className="meet-card">
              <img src="images/team2.jpg" alt="" />
              <h3>Kendrick Galan</h3>
              <div className="teamrole">Lead Developer/ Mobile Developer</div>

            </div>
            <div className="meet-card">
              <img src="images/team3.jpg" alt="" />
              <h3>Lenal Ladaga</h3>
              <div className="teamrole">Project Manager/ Web Designer</div>
            </div>
            <div className="meet-card">
              <img src="images/team4.jpg" alt="" />
              <h3>Marvin Olazo</h3>
              <div className="teamrole">External Relation Officer</div>
            </div>
            <div className="meet-card">
              <img src="images/team5.jpg" alt="" />
              <h3>Marwin Vislenio</h3>
              <div className="teamrole">External Relation Officer</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
    // <Fragment>
    //   <MetaData title={'Services'} />
    //   <section id='cm-intro'>
    //     <div className='intro'>
    //       <div className='welcome'>
    //         <h3 className='firstTitle'>WELCOME TO SERVIFIND</h3>
    //         <p>WHERE YOU CAN FIND THE BEST SERVICE IN THE RIGHT TIME ON THE RIGHT PERSON
    //         </p>
    //       </div>
    //       <img id='home' className='bg-pic' src='../images/bg.jpg'></img>
    //     </div>
    //   </section>
    //   <div className='containerz'>

    //     <section id='cm-servifind'>
    //       <div className='info' id='info'>
    //         <h3 className='h2-title'>What is ServiFind?</h3>
    //       </div>
    //     </section>
    //     <section id='cm-features'>
    //       <div className='features' id='features'>
    //         <h3 className='title'>FEATURES</h3>
    //       </div>
    //     </section>
    //     <div className="our-team" id='our-team'>
    //       <h1 className="heading"><span>meet </span>Our Team</h1>
    //       <br></br><br></br>
    //       <div className="profiles">
    //         <div className="profile">
    //           <img src="../images/team1.jpg" className="profile-img"></img>

    //           <h3 className="user-name">Cherry May Agustin</h3>
    //           <h5>Paper Manager / Web Designer</h5>
    //           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum eveniet soluta hic sunt sit reprehenderit.</p>
    //         </div>
    //         <div className="profile">
    //           <img src="../images/team2.jpg" className="profile-img"></img>

    //           <h3 className="user-name">Kendrick Galan</h3>
    //           <h5>Lead Developer / Mobile Developer</h5>
    //           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis sint quod.</p>
    //         </div>
    //         <div className="profile">
    //           <img src="../images/team3.jpg" className="profile-img"></img>

    //           <h3 className="user-name">Lenal Ladaga</h3>
    //           <h5>Project Manager / Web Designer </h5>
    //           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, eveniet!</p>
    //         </div>

    //       </div>
    //       <div className="profiles">
    //         <div className="profile">
    //           <img src="../images/team4.jpg" className="profile-img"></img>

    //           <h3 className="user-name">Marvin Olazo</h3>
    //           <h5>External Relation Officer</h5>
    //           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum eveniet soluta hic sunt sit reprehenderit.</p>
    //         </div>
    //         <div className="profile">
    //           <img src="../images/team5.jpg" className="profile-img"></img>

    //           <h3 className="user-name">Marwin Vislenio</h3>
    //           <h5>External Relation Officer</h5>
    //           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum eveniet soluta hic sunt sit reprehenderit.</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    // </Fragment>
  );
}
export default Home
