import React, { useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"


const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <i className='fa fa-long-arrow-alt-right' style={{display: 'flex',
    justifyContent: 'center',
    fontSize: '25px'
    }}></i>
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <i className='fa fa-long-arrow-alt-left' style={{display: 'flex',
    justifyContent: 'center',
    fontSize: '25px'
    }}></i>
      </button>
    </div>
  )
}
const FlashCard = ({ services }) => {
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  return (
    <>
      <Slider {...settings}>
        {services.map((service) => {
          return (
            <div className='box'>
              <div className='product mtop'>
                <div className='img'>
                  <span className='discount'>{service.category.name}</span>
                  <img src={service.images.url} alt='' style={{ objectFit: 'contain', width:'200px', margin:'auto'}}/>
                  <div className='product-like'>
                    <label>{count}</label> <br />
                    <i className='fa-regular fa-heart' onClick={increment}></i>
                  </div>
                </div>
                
                <div className='product-details mtop'>
                <div className="services-avatar">
                    <img src={service.user.avatar.url} alt=""/>
                    <div className="avatar-name" style={{color:'black', display:'flex'}}>
                        <div className="avatar-name-title" style={{color:'black'}}></div>
                        {service.user.name}
                    </div>
                </div>
                <h3 style={{color:'black', marginTop:'20px'}}  >
                    Service: 
                    </h3>
                  <h3 style={{color:'black'}}>
                    {service.name}
                    </h3>
                  <div className='rate'>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                  </div>
                  <div className='price'>
                    <h4>Starting Price: ₱{service.
priceStarts_At}.00 </h4>
                    {/* step : 3  
                     if hami le button ma click garryo bahne 
                    */}
                    <button >
                      <i className='fa fa-plus'></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </Slider>
    </>
  )
}

export default FlashCard