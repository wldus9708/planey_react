import React from 'react'
import './Hero.css'
// import  from "./Asset/arrow_btn.png"
import arrow_btn from "./Asset/play_icon.png"
import pause_icon from "./Asset/pause_icon.png"

const Hero = ({heroData,setHeroCount,heroCount,setPlayStatus,playStatus}) => {
  return (
    <div className='hero'>
        <div className='hero-text'>
            <p>{heroData.text1}</p>
            <p>{heroData.text2}</p>
        </div>
        <div className="hero-explore">
            <p>Explore the features</p>
            <img src={arrow_btn} alt=''/>
        </div>
        <div className='hero-dot-play'>
            <ul className='hero-dots'>
                <li onClick={()=>setHeroCount(0)} className={heroCount===0?"hero-dot orange":"hero-dot"}></li>
                <li onClick={()=>setHeroCount(1)} className={heroCount===1?"hero-dot orange":"hero-dot"}></li>
                <li onClick={()=>setHeroCount(2)} className={heroCount===2?"hero-dot orange":"hero-dot"}></li>
                <li onClick={()=>setHeroCount(3)} className={heroCount===3?"hero-dot orange":"hero-dot"}></li>
            </ul>
        </div>
    </div>
  )
}

export default Hero