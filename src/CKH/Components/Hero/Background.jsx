import React from "react";
import "./Background.css";
import video1 from "./Asset/Air.mp4";
import image01 from "./../Home/image/airport.jpg";
import image02 from "./../Home/image/car.jpg";
import image03 from "./../Home/image/hotel.jpg";
import image04 from "./../Home/image/tour.jpg";

const Background = ({ playStatus, heroCount }) => {
  if (playStatus) {
    return (
      <video className="background1" autoPlay loop muted>
        <source src={video1} type="video/mp4" />
      </video>
    );
  } else if (heroCount === 0) {
    return <img src={image01} className="background1" alt="" />;
  } else if (heroCount === 1) {
    return <img src={image02} className="background1" alt="" />;
  } else if (heroCount === 2) {
    return <img src={image03} className="background1" alt="" />;
  } else if (heroCount === 3) {
    return <img src={image04} className="background1" alt="" />;
  }
};

export default Background;
