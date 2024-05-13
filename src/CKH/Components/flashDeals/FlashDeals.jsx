import React from "react"
import FlashCard_keyword from "./FlashCard_keyword"
import FlashCard_air from "./FlashCard_air"
import FlashCard_hotel from "./FlashCard_hotel"
import FlashCard_rent from "./FlashCard_rent"


import "./FlashCard.css"

const FlashDeals = ({ productItems, addToCart }) => {
  return (
    <>
      <section className='flash'>
        <div className='container'>
          <div className='heading f_flex'>
            <i className='fa fa-bolt'></i>
            <h1>키워드 패키지</h1>
          </div>
          <FlashCard_keyword productItems={productItems} addToCart={addToCart} />
          
          <div className='heading f_flex'>
            <i className='fa fa-bolt'></i>
            <h1>항공</h1>
          </div>
          <FlashCard_air productItems={productItems} addToCart={addToCart} />

          <div className='heading f_flex'>
            <i className='fa fa-bolt'></i>
            <h1>호텔</h1>
          </div>
          <FlashCard_hotel productItems={productItems} addToCart={addToCart} />

          <div className='heading f_flex'>
            <i className='fa fa-bolt'></i>
            <h1>렌트</h1>
          </div>
          <FlashCard_rent productItems={productItems} addToCart={addToCart} />

        </div>
      </section>
    </>
  )
}

export default FlashDeals
