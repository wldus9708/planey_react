import React, { useEffect } from "react";
import "./about.css";


// import 비디오 =>>>>>>>>>>>>>>>>>>>>>>>>>>>
import video from "../../Assets/여행영상.mp4";

import Aos from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <section className="about section">
      <div className="secContainer">
        
        <div className="videoCard container">
          <div className="cardContent grid">
            <div className="cardText">
              <h2 data-aos="zoom-out">광고</h2>
              <p data-aos="zoom-in" data-aos-duration="3300">
                광고멘트  광고멘트광고멘트광고멘트광고멘트
              </p>
            </div>

            <div data-aos="zoom-in" className="cardVideo">
              <video src={video} autoPlay loop muted typeof="video/mp4"></video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
