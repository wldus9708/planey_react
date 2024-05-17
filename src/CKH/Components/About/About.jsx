import React, { useEffect, useState } from "react";
import "./about.css";
import axios from "axios";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";

// import video from "../../Assets/여행영상.mp4";

import Aos from "aos";
import "aos/dist/aos.css";

const About = () => {

  const pic = "../../../BBS/image/";
  // 상태(state) 정의
  const [tours, setTours] = useState([]); // PakageTour 엔티티 정보를 저장할 변수
  let count = 1;

  useEffect(() => {
    const pic = "../../../BBS/image/";
    // 데이터 가져오기
    axios
      .get("http://localhost:8988/PackageTour/readThreePackageTourFalse")
      .then((response) => {
        // PackageTour 엔티티 형식으로 변환
        const packageTour = response.data.map((tour) => ({
          id: tour.id,
          imgSrc: require("../../../BBS/image/" + tour.image01 + ".jpg"), // 대표이미지 
          destTitle: tour.tour_pack_name, // 투어 이름
          location: tour.tourPackCity, // 투어 지역
          category: tour.category.split("_")[0], // 상품 종류
          comment: tour.tour_pack_description, // 상품 설명
          tourPackRestaurant: tour.tourPackRestaurant, // 상품 식당
          hotel: tour.tourPackLodging, // 상품 호텔
          tourPackLandmark: tour.tourPackLandmark, // 상품 랜드마크
          nation:tour.nation,

        }));
        console.log("가져와짐.");
        setTours(packageTour); // packgeTour 엔티티 정보 저장
      })
      .catch((error) => {
        console.error("Popular 컴포넌트 Error fetching data:", error);
      });

    // Aos 초기화
    Aos.init({ duration: 2000 });
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 설정

  return (
    <section className="about section">
      <div className="secContainer">
        <h2 className="title">🧡PLANEY🧡 해외🌎  패키지❗❗</h2>

        <div className="mainContent container grid">
          {tours.map((tour) => (
            <div
              key={tour.id}
              data-aos="fade-up"
              data-aos-duration="2100"
              className="singleItem"
            >
              <img src={tour.imgSrc} alt={tour.destTitle} />
              <h3>{tour.destTitle}</h3>
              <p>{tour.comment}</p>
              <Link to="/">
                    <button className="btn flex">
                      View Details
                      <BsArrowRightShort className="icon" />
                    </button>
                  </Link>
            </div>
          ))}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
