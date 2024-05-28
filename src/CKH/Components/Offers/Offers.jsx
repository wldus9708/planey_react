import React, { useState, useEffect } from "react";
import axios from "axios";
import "./offers.css";
import { FaCarSide } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { MdAirportShuttle } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import { PiForkKnife } from "react-icons/pi";
import Aos from "aos";
import "aos/dist/aos.css";
import useUser from "../../../BBS/Log/useUser";

const Offer = () => {
  const [tour, setTour] = useState([]);
  const user = useUser();

  useEffect(() => {
    const pic = "../../../BBS/image/";
    axios
      .get("http://localhost:8988/PackageTour/readSixPackageTour")
      .then((response) => {
        // tour 엔티티 형식으로 변환
        const tourData = response.data.map((tour) => ({
          id: tour.id,
          imgSrc: require("../../../BBS/image/" + tour.image01 + ".jpg"), // 대표이미지 
          destTitle: tour.tour_pack_name, // 투어 이름
          location: tour.tourPackCity, // 투어 지역
          category: tour.category.split("_")[0], // 상품 종류
          comment: tour.tour_pack_description, // 상품 설명
          tourPackRestaurant: tour.tourPackRestaurant, // 상품 식당
          hotel: tour.tourPackLodging, // 상품 호텔
          tourPackLandmark: tour.tourPackLandmark, // 상품 랜드마크
          price: tour.price, // 패키지 가격
          discountPrice: Math.floor(tour.price * (tour.discount / 100)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          discount: tour.discount,
          parking: tour.parking,
          pet: tour.pet,
          wifi: tour.wifi,
          shuttle: tour.shuttle,
          breakfast: tour.breakfast,
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
          지금❗ 🧡PLANEY🧡에서 {user ? `${user.name}님 만을 위한❕❗ ` : ""}할인받고 여행🛫 가자 ❗❗
          </h2>
          <p data-aos="fade-up" data-aos-duration="2000">
            세일 정보를 확인해보세요❕
          </p>
        </div>

        <div className="mainContent grid">
          {tour.map((tour) => {
            return (
              <div key={tour.id}
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
                    {tour.parking && (
                      <div className="singleAmenity flex">
                        <FaCarSide className="icon" />
                        <small>Free parking</small>
                      </div>
                    )}
                    {tour.pet && (
                      <div className="singleAmenity flex">
                        <MdPets className="icon" />
                        <small>pet-friendly</small>
                      </div>
                    )}

                    {tour.wifi && (
                      <div className="singleAmenity flex">
                        <FaWifi className="icon" />
                        <small>Wi-Fi</small>
                      </div>
                    )}

                    {tour.shuttle && (
                      <div className="singleAmenity flex">
                        <MdAirportShuttle className="icon" />
                        <small>Shuttle</small>
                      </div>
                    )}

                    {tour.breakfast && (
                      <div className="singleAmenity flex">
                        <PiForkKnife className="icon" />
                        <small>breakfast</small>
                      </div>
                    )}
                  </div>

                  <div className="location flex">
                    <MdLocationOn className="icon" />
                    <small>{tour.location}.</small>
                  </div>

                  <Link to={`/PackageDetail/${tour.id}`}>
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
