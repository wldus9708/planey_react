import React, { useEffect, useState } from "react";
import "./blog.css";
import axios from "axios";
import { BsArrowRightShort } from "react-icons/bs";
import useUser from "../../../BBS/Log/useUser";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

// import images ====================>
import img01 from "../../Assets/Dining02/광화문식당02.jpg";
import img02 from "../../Assets/Dining02/디라이프스타일치킨13.PNG";
import img03 from "../../Assets/Dining02/후추포인트12.jpg";
import img04 from "../../Assets/Dining02/티원03.PNG";

import Aos from "aos";
import "aos/dist/aos.css";
import { handleNavItemClick } from "../Navbar/Navbar";

// 맵 으로 순환해서 이미지 표시
const Posts = [
  {
    id: 1,
    postImage: img01,
    title: "광화문식당",
    desc: "우리 식당에서 최고의 요리와 서비스를 경험하세요. 특별한 날 혹은 단순히 친구와의 저녁 식사를 예약하세요.",
  },
  {
    id: 2,
    postImage: img02,
    title: "디라이프스타일키친 광화문점",
    desc: "미슐랭 출신 셰프팀이 작정하고 모인 레스토랑?",
  },
  {
    id: 3,
    postImage: img03,
    title: "후추포인트",
    desc: "매일 공수하는 신선한 재료, 날마다 끓여내는 홈메이드 소스후추포인트는 서양가정식 레스토랑으로누구나 편안하게 즐길 수 있는 메뉴를 구현하였답니다.",
  },
  {
    id: 4,
    postImage: img04,
    title: "예약 요금제와 이용 안내",
    desc: "격식 있는 모임, 특별한 날에 어울리는 호텔급 중식 레스토랑 티원 입니다. 다양한 규모의 모임 인원을 수용할 수 있는 고급스러운 예약룸 등을 갖추었습니다.",
  },
];

const Blog = () => {
  const user = useUser();
  const [cookies] = useCookies(["accessToken"]);
  const navigate = useNavigate();
  // 상태(state) 정의
  const [tours, setTours] = useState([]); // PakageTour 엔티티 정보를 저장할 변수

  useEffect(() => {
    // 데이터 가져오기
    axios
      .get("http://localhost:8988/PackageTour/readFourPackageTourTrue")
      .then((response) => {
        // PackageTour 엔티티 형식으로 변환
        const packageTour = response.data.map((tour) => ({
          id: tour.id,
          imgSrc: "/images/" + tour.image01, // 대표이미지 
          destTitle: tour.tour_pack_name, // 투어 이름
          location: tour.tourPackCity, // 투어 지역
          category: tour.category.split("_")[0], // 상품 종류
          comment: tour.tour_pack_description, // 상품 설명
          tourPackRestaurant: tour.tourPackRestaurant, // 상품 식당
          hotel: tour.tourPackLodging, // 상품 호텔
          tourPackLandmark: tour.tourPackLandmark, // 상품 랜드마크
          nation: tour.nation,
        }));
        // console.log("가져와짐.");
        setTours(packageTour); // packgeTour 엔티티 정보 저장
      })
      .catch((error) => {
        console.error("Popular 컴포넌트 Error fetching data:", error);
      });

    // Aos 초기화
    Aos.init({ duration: 2000 });
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 설정

  return (
    <section className="blog container section">
      <div className="secContainer">
        <div className="secIntro">
          <h1 data-aos="fade-up" data-aos-duration="2000" className="blogh1">
            🧡PLANEY🧡 국내 패키지❗❗
          </h1>

          <p data-aos="fade-up" data-aos-duration="2500">
            {" "}
          </p>
          <h4 className="blogp1">
            핫 한 국내 패키지 라인업, 이제 🧡PLANEY🧡에서❕
          </h4>
        </div>

        <div className="mainContainer grid">
          {tours.map((tours) => {
            return (
              <div className="singlePost grid">
                <div
                  data-aos="fade-right"
                  data-aos-duration="2500"
                  className="imgDiv"
                >
                  <img src={tours.imgSrc} alt={tours.location} />
                </div>

                <div className="postDetails">
                  <h3 data-aos="fade-right" data-aos-duration="2000">
                    {tours.destTitle}
                  </h3>
                  <p data-aos="fade-right" data-aos-duration="2500">
                    {tours.comment}
                  </p>
                </div>
                <a
                  data-aos="fade-right"
                  data-aos-duration="2500"
                  onClick={() =>
                    handleNavItemClick(
                      user,
                      cookies,
                      "PACKAGE_DETAIL_LOCAL",
                      `/PackageDetail/${tours.id}`,
                      navigate
                    )
                  }
                  className="flex"
                  style={{ cursor: "pointer" }}
                >
                  Read More
                  <BsArrowRightShort className="icon" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Blog;
