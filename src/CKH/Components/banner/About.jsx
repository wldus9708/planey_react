import React, { useEffect } from "react";
import "./about.css";
import axios from 'axios';


// import 비디오 =>>>>>>>>>>>>>>>>>>>>>>>>>>>
// import video from "../../Assets/여행영상.mp4";

import Aos from "aos";
import "aos/dist/aos.css";

const About = () => {

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = () => {
    axios.get('http://localhost:8988/api/banner/all')
      .then(response => {
        setBanners(response.data);
      })
      .catch(error => {
        console.error('데이터를 가져오는 중 오류가 발생했습니다.');
      });
  };


  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <section className="about section">
      <div className="secContainer">
        
        <div className="videoCard container">
          <div className="cardContent grid">
            <div className="cardText">
            <img src={`http://localhost:8988/api/banner/image/${banner.image}`} alt={banner.title} width="100" />
              <h2 data-aos="zoom-out">광고</h2>
              <p data-aos="zoom-in" data-aos-duration="3300">
                광고멘트  광고멘트광고멘트광고멘트광고멘트
              </p>
            </div>

            {/* <div data-aos="zoom-in" className="cardVideo">
              <video src={video} autoPlay loop muted typeof="video/mp4"></video>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
