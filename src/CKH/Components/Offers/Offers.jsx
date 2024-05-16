import React, { useState, useEffect } from "react";
import axios from "axios";
import "./offers.css";
import { FaCarSide } from "react-icons/fa";
import { FaChildReaching } from "react-icons/fa6";
import { FaWifi } from "react-icons/fa";
import { MdAirportShuttle } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";

// import images ==========================>
import img from "../../Assets/Dining/pexels-pixabay-260922.jpg";
import img2 from "../../Assets/Dining/pexels-bemistermister-3434523.jpg";
import img3 from "../../Assets/Dining/pexels-ben-maxwell-479813-1194234.jpg";
import img4 from "../../Assets/Dining/pexels-chanwalrus-941861.jpg";
import img5 from "../../Assets/Dining/pexels-cottonbro-3171201.jpg";
import img6 from "../../Assets/Dining/pexels-igor-starkov-233202-1055054.jpg";
import img7 from "../../Assets/Dining/pexels-lina-1813504.jpg";
// import images ==========================>

import Aos from "aos";
import "aos/dist/aos.css";

// 할인정보 MAP
const Offers = [
  {
    id: 1,
    imgSrc: img2,
    destTitle: "촛불1978",
    location: "서울 중구 소파로 95 촛불 레스토랑",
    price: "312,000",
  },
  {
    id: 2,
    imgSrc: img3,
    destTitle: "촛불1978",
    location: "서울 중구 소파로 95 촛불 레스토랑",
    price: "453,000",
  },
  {
    id: 3,
    imgSrc: img4,
    destTitle: "촛불1978",
    location: "서울 중구 소파로 95 촛불 레스토랑",
    price: "321,000",
  },
  {
    id: 4,
    imgSrc: img5,
    destTitle: "촛불1978",
    location: "서울 중구 소파로 95 촛불 레스토랑",
    price: "512,000",
  },
  {
    id: 5,
    imgSrc: img6,
    destTitle: "촛불1978",
    location: "서울 중구 소파로 95 촛불 레스토랑",
    price: "512,000",
  },
  {
    id: 6,
    imgSrc: img7,
    destTitle: "촛불1978",
    location: "서울 중구 소파로 95 촛불 레스토랑",
    price: "512,000",
  },
];



let price = 300000;

const Offer = () => {
  const [tour, setTour] = useState([]);

  useEffect(() => {
    const pic = "../../../BBS/image/";
    axios
      .get("http://localhost:8988/PackageTour/readSixPackageTour")
      .then((response) => {
        // tour 엔티티 형식으로 변환
        const tourData = response.data.map((tour) => ({
          id: tour.id,
          imgSrc: require("../../../BBS/image/"+tour.image01+".jpg"), // 대표이미지 
          destTitle: tour.tour_pack_name, // 투어 이름
          location: tour.tourPackCity, // 투어 지역
          category: tour.category.split("_")[0], // 상품 종류
          comment: tour.tour_pack_description, // 상품 설명
          tourPackRestaurant: tour.tourPackRestaurant, // 상품 식당
          hotel: tour.tourPackLodging, // 상품 호텔
          tourPackLandmark:tour.tourPackLandmark, // 상품 랜드마크
          price: tour.price, // 패키지 가격
          discountPrice : tour.price * (tour.discount / 100), // 패키지 세일 정보
          discount: tour.discount,
        }));
        console.log("가져와짐.");




        setTour(tourData); // tour 엔티티 정보 저장
      })
      .catch((error) => {
        console.error("Offers 컴포넌트 Error fetching data:", error);
      });

    // Aos 초기화
    Aos.init({ duration: 2000 });
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 설정

  return (
    <section className="offer container section">
      <div className="secContainer">
        {/* secIntro는 App.css 에서 스타일링 함... */}
        <div className="secIntro">
          <h2 data-aos="fade-up" data-aos-duration="2000" className="secTitle">
            할인중인 Tour!
          </h2>
          <p data-aos="fade-up" data-aos-duration="2000">
            세일 정보를 확인해보세요!
          </p>
        </div>

        <div className="mainContent grid">
          {tour.map((tour) => {
            return (
              <div
                data-aos="fade-up"
                data-aos-duration="1500"
                className="singleOffer"
              >
                <div className="destImage">
                  <img src={tour.imgSrc} alt="Image Name" />

                  <span className="discount">{tour.discount}% off</span>
                </div>

                <div className="offerBody">
                  <div className="price flex">
                    <h4>{tour.discountPrice} ￦</h4>
                    <span className="status">{tour.category}</span>
                  </div>
                  <div className="amenities flex">
                    <div className="singleAmenity flex">
                      <FaCarSide className="icon" />
                      <small>Parking available</small>
                    </div>

                    <div className="singleAmenity flex">
                      <FaChildReaching className="icon" />
                      <small>Children's facilities</small>
                    </div>

                    <div className="singleAmenity flex">
                      <FaWifi className="icon" />
                      <small>Wi-Fi</small>
                    </div>

                    <div className="singleAmenity flex">
                      <MdAirportShuttle className="icon" />
                      <small>Shuttle</small>
                    </div>
                  </div>

                  <div className="location flex">
                    <MdLocationOn className="icon" />
                    <small>{tour.location}.</small>
                  </div>

                  <Link to="tourDetail">
                    <button className="btn flex">
                      View Details
                      <BsArrowRightShort className="icon" />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Offer;
