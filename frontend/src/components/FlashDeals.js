import React from "react"
import FlashCard from "./FlashCard"


const FlashDeals = ({ services }) => {
  return (
    <>
      <section className='flash'>
        <div className='container'>
          <div className='heading f_flex'>
            <i className='fa fa-bolt'></i>
            <h1>Featured Services</h1>
          </div>
          <FlashCard services={services} />
        </div>
      </section>
    </>
  )
}

export default FlashDeals