import React, { useState, useEffect } from "react";
import axios from "axios";
import "./popular.css";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { BsDot } from "react-icons/bs";


import Aos from "aos";
import "aos/dist/aos.css";


const Popular = () => {
  const pic = "../../../BBS/image/";
  // 상태(state) 정의
  const [shops, setShops] = useState([]); // PakageTour 엔티티 정보를 저장할 변수
  let count = 1;

  const handleArrowRightClick = () => {
    axios
      .get("http://localhost:8988/PackageTour/readEightPackageTour")
      .then((response) => {
        console.log("데이터 가져와짐.");
        const newShops = response.data.map((newShop) => ({
          id: newShop.id,
          imgSrc: newShop.shopImage01,
          destTitle: newShop.shopName,
          location: newShop.address + " " + newShop.addressDetail,
          grade: newShop.shopCategory,
          comment: newShop.comment,
          facilities: newShop.facilities,
          
        }));
        setShops(newShops); // 기존 shops 배열에 새 shops 추가
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
          imgSrc: require("../../../BBS/image/"+tour.image01+".jpg"),
 // 대표이미지 
          destTitle: tour.tour_pack_name, // 투어 이름
          location: tour.tourPackCity, // 투어 지역
          category: tour.category.split("_")[0], // 상품 종류
          comment: tour.tour_pack_description, // 상품 설명
          tourPackRestaurant: tour.tourPackRestaurant, // 상품 식당
          hotel: tour.tourPackLodging, // 상품 호텔
          tourPackLandmark:tour.tourPackLandmark, // 상품 랜드마크

        }));
        console.log("가져와짐.");
        setShops(packageTour); // Shop 엔티티 정보 저장
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
            <h2 className="sectitle">Our Planets</h2>
            <p> 지금 예약하세요!</p>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="2500"
            className="iconsDiv flex"
          >
            {/* <BsArrowLeftShort className="icon leftIcon" /> */}
            <BsArrowRightShort
              className="icon reload"
              onClick={handleArrowRightClick}
            />
          </div>
        </div>

        <div className="mainContent grid">
          {shops.map((tour) => (
            <div key={tour.id} data-aos="fade-up" className="singleDestination">
              <div className="destImage">
                <img src={tour.imgSrc} alt="tour pic" />

                <div className="overlayInfo">
                  <h3>{tour.destTitle}</h3>
                  <p>{tour.comment}</p>
                  <BsArrowRightShort className="icon" />
                </div>
              </div>

              <div className="destFooter">
                <div className="number">0{count++}</div>

                <div className="destText flex">
                  <h6>{tour.location}</h6>
                  <span className="flex">
                    <sapn className="dot">
                      <BsDot className="icon" />
                    </sapn>
                    {tour.tourPackLandmark}
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
