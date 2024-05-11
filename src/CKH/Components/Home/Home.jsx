import React, { useEffect, useState } from "react";
import "./home.css";

import Aos from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="home">
      
      <div className="secContainer container">
        <div className="homeText">
          <h1 data-aos="fade-up" className="title">
            ... Food Planet ...
          </h1>

          <p data-aos="fade-up" data-aos-duration="2500" className="subTitle">
            식당 예약을 해보세요!
          </p>

          <button data-aos="fade-up" data-aos-duration="3700" className="btn">
            <a href="#">Explore Now</a>
          </button>
        </div>

        <div className="homeCard grid">
          <div
            data-aos="fade-right"
            data-aos-duration="2500"
            className="locationDiv"
          >
            <label htmlFor="locationInput">지역으로 검색하기</label>
            <input
              id="locationInput"
              type="text"
              placeholder="Ex) 성수동" /* 검색창 */
            />
          </div>
          <button data-aos="zoom-in-up" className="btn">
            Search
          </button>

          <div
            data-aos="fade-right"
            data-aos-duration="2500"
            className="priceDiv"
          >
            <label htmlFor="priceInput">가격으로 검색하기</label>
            <input
              id="priceInput"
              type="text"
              placeholder="Ex) 50000~100000" /* 검색창 */
            />
          </div>
          <button data-aos="zoom-in-up" className="btn">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
