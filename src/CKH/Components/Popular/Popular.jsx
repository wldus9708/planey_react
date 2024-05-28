import React, { useState, useEffect } from "react";
import axios from "axios";
import "./popular.css";
import { BsArrowRightShort } from "react-icons/bs";
import { IoReloadSharp } from "react-icons/io5";
import { BsDot } from "react-icons/bs";
import Aos from "aos";
import "aos/dist/aos.css";
import useUser from "../../../BBS/Log/useUser";
import { Link } from "react-router-dom";

const Popular = () => {
  const pic = "../../../BBS/image/";
  // 상태(state) 정의
  const [tours, setTours] = useState([]); // PakageTour 엔티티 정보를 저장할 변수
  const user = useUser();
  let count = 1;

  const handleArrowRightClick = () => {
    axios
      .get("http://localhost:8988/PackageTour/readEightPackageTour")
      .then((response) => {
        console.log("handleArrowRightClick : 데이터 가져와짐.");
        const newTours = response.data.map((newTour) => ({
          id: newTour.id,
          imgSrc: require("../../../BBS/image/" + newTour.image01 + ".jpg"),// 대표이미지 
          destTitle: newTour.tour_pack_name, // 투어 이름
          location: newTour.tourPackCity, // 투어 지역
          category: newTour.category.split("_")[0], // 상품 종류
          comment: newTour.tour_pack_description, // 상품 설명
          tourPackRestaurant: newTour.tourPackRestaurant, // 상품 식당
          hotel: newTour.tourPackLodging, // 상품 호텔
          nation: newTour.nation, // 상품 랜드마크

        }));
        setTours(newTours); // 기존 tours 배열에 새 tours 추가
        console.log("데이터 가져와짐.");
      })
      .catch((error) => {
        console.error(
          "Popular handleArrowRightClick handle Error fetching data:",
          error
        );
      });
  };

  // useEffect를 사용하여 컴포넌트가 렌더링될 때 데이터를 가져오고 Aos를 초기화하도록 설정
  useEffect(() => {
    const pic = "../../../BBS/image/";
    // 데이터 가져오기
    axios
      .get("http://localhost:8988/PackageTour/readEightPackageTour")
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
          nation: tour.nation, // 상품 랜드마크

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
    <section className="popular section container">
      <div className="secContainer">
        <div className="secHeader flex">
          <div
            data-aos="fade-right"
            data-aos-duration="2500"
            className="textDiv"
          >
            <h2 className="sectitle">PLANEY Tour</h2>
            <p> {user ? `${user.name}님, ` : ""}지금 예약하세요!</p>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="2500"
            className="iconsDiv flex"
          >
            {/* <BsArrowLeftShort className="icon leftIcon" /> */}
            <IoReloadSharp
              className="icon reload"
              onClick={handleArrowRightClick}
            />
          </div>
        </div>

        <div className="mainContent grid">
          {tours.map((tour) => (
            <div key={tour.id} data-aos="fade-up" className="singleDestination">
              <div className="destImage">
                <img src={tour.imgSrc} alt="tour pic" />

                <div className="overlayInfo">
                  <h3>{tour.destTitle}</h3>
                  <p>{tour.comment}</p>
                  <Link to={`/PackageDetail/${tour.id}`}>
                    <BsArrowRightShort className="icon" />
                  </Link>
                </div>
              </div>

              <div className="destFooter">
                <div className="number">0{count++}</div>

                <div className="destText flex">
                  <h6>{tour.location}</h6>
                  <span className="flex">
                    <span className="dot">
                      <BsDot className="icon" />
                    </span>
                    {tour.nation ? "국내 패키지" : "해외 패키지"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Popular;
