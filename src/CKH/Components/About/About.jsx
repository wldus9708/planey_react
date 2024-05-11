import React, { useEffect } from "react";
import "./about.css";

// Images ============>
import img01 from "../../Assets/Dining02/그믐족발01.jpg";
import img02 from "../../Assets/Dining02/비비킹02.jpg";
import img03 from "../../Assets/Dining02/사철국화02.jpg";

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
        <h2 className="title">내일 바로 예약 가능한 레스토랑</h2>

        <div className="mainContent container grid">
          <div
            data-aos="fade-up"
            data-aos-duration="2100"
            className="singleItem"
          >
            <img src={img01} alt="Image Name" />

            <h3>동적으로 식당 이름01</h3>

            <p>
              동적으로 식당 설명동적으로 식당 설명동적으로 식당 설명동적으로
              식당 설명동적으로 식당 설명동적으로 식당 설명
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="2700"
            className="singleItem"
          >
            <img src={img02} alt="Image Name" />

            <h3>동적으로 식당 이름02</h3>

            <p>
              동적으로 식당 설명동적으로 식당 설명동적으로 식당 설명동적으로
              식당 설명동적으로 식당 설명동적으로 식당 설명
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-duration="3300"
            className="singleItem"
          >
            <img src={img03} alt="Image Name" />

            <h3>동적으로 식당 이름02</h3>

            <p>
              동적으로 식당 설명동적으로 식당 설명동적으로 식당 설명동적으로
              식당 설명동적으로 식당 설명동적으로 식당 설명
            </p>
          </div>
        </div>

        <div className="videoCard container">
          <div className="cardContent grid">
            <div className="cardText">
              <h2 data-aos="zoom-out">석양이 지는 성산일출봉</h2>
              <p data-aos="zoom-in" data-aos-duration="3300">
                지금 여러분을 초대합니다.
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
