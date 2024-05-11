import React, { useState, useEffect } from "react";
import axios from "axios";
import "./popular.css";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { BsDot } from "react-icons/bs";

// Import the images=========================>
import img from "../../Assets/pexels-leticia-alvares-1805702-14082105.jpg";
import img2 from "../../Assets/촛불1978_03.png";
import img3 from "../../Assets/촛불1978_04.png";
import img4 from "../../Assets/촛불1978_05.png";
import img5 from "../../Assets/촛불1978_06.png";
import img6 from "../../Assets/pexels-meum-mare-204165854-17498733.jpg";
// Import the images=========================>

import Aos from "aos";
import "aos/dist/aos.css";

//  이제 고차 배열 메소드를 사용하여 Map을 이용해
//  모든 목적지를 표시할 것입니다. 이를 위해
//   'Data'라는 배열에 모든 목적지를 나열해야 하며,
//  나중에는 각 목적지를 인덱스 또는 ID로 호출할 것입니다.

// const Data = [
//   {
//     id: 1,
//     imgSrc: img2,
//     destTitle: "촛불1978",
//     location: "서울 중구 소파로 95 촛불 레스토랑",
//     grade:
//       "촛불1978은 46년의 역사를 가진 남산의 레스토랑으로" +
//       "100만 쌍 이상이 프로포즈한 추억과 사랑의 공간입니다.",
//   },
//   {
//     id: 2,
//     imgSrc: img3,
//     destTitle: "촛불1978",
//     location: "서울 중구 소파로 95 촛불 레스토랑",
//     grade:
//       "촛불1978은 46년의 역사를 가진 남산의 레스토랑으로" +
//       "100만 쌍 이상이 프로포즈한 추억과 사랑의 공간입니다.",
//   },
//   {
//     id: 3,
//     imgSrc: img4,
//     destTitle: "촛불1978",
//     location: "서울 중구 소파로 95 촛불 레스토랑",
//     grade:
//       "촛불1978은 46년의 역사를 가진 남산의 레스토랑으로" +
//       "100만 쌍 이상이 프로포즈한 추억과 사랑의 공간입니다.",
//   },
//   {
//     id: 4,
//     imgSrc: img5,
//     destTitle: "촛불1978",
//     location: "서울 중구 소파로 95 촛불 레스토랑",
//     grade:
//       "촛불1978은 46년의 역사를 가진 남산의 레스토랑으로" +
//       "100만 쌍 이상이 프로포즈한 추억과 사랑의 공간입니다.",
//   },
//   // {
//   //   id: 5,
//   //   imgSrc: img6,
//   //   destTitle: "토론토",
//   //   location: "캐나다",
//   //   grade: "도시 문화",
//   // },
// ];

const Popular = () => {
  // 상태(state) 정의
  const [shops, setShops] = useState([]); // Shop 엔티티 정보를 저장할 변수
  let count = 1;

  const handleArrowRightClick = () => {
    axios
      .get("http://localhost:8888/shops/readEightShops")
      .then((response) => {
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
    // 데이터 가져오기
    axios
      .get("http://localhost:8888/shops/readEightShops")
      .then((response) => {
        // Shop 엔티티 형식으로 변환
        const shopData = response.data.map((shop) => ({
          id: shop.id,
          imgSrc: shop.shopImage01,
          destTitle: shop.shopName,
          location: shop.address + " " + shop.addressDetail,
          grade: shop.shopCategory,
          comment: shop.comment,
          facilities: shop.facilities,
        }));
        console.log("가져와짐.");

        setShops(shopData); // Shop 엔티티 정보 저장
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
          {shops.map((shop) => (
            <div key={shop.id} data-aos="fade-up" className="singleDestination">
              <div className="destImage">
                <img src={img} alt="dining pic" />

                <div className="overlayInfo">
                  <h3>{shop.destTitle}</h3>
                  <p>{shop.comment}</p>
                  <BsArrowRightShort className="icon" />
                </div>
              </div>

              <div className="destFooter">
                <div className="number">0{count++}</div>

                <div className="destText flex">
                  <h6>{shop.location}</h6>
                  <span className="flex">
                    <sapn className="dot">
                      <BsDot className="icon" />
                    </sapn>
                    {shop.facilities}
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
