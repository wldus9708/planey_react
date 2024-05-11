import React, { useEffect } from "react";
import "./blog.css";
import { BsArrowRightShort } from "react-icons/bs";

// import images ====================>
import img01 from "../../Assets/Dining02/광화문식당02.jpg";
import img02 from "../../Assets/Dining02/디라이프스타일치킨13.PNG";
import img03 from "../../Assets/Dining02/후추포인트12.jpg";
import img04 from "../../Assets/Dining02/티원03.PNG";

import Aos from "aos";
import "aos/dist/aos.css";

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
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="blog container section">
      <div className="secContainer">
        <div className="secIntro">
          <h2 data-aos="fade-up" data-aos-duration="2000" className="secTitle">
            웨이팅 핫플레이스 BEST
          </h2>

          <p data-aos="fade-up" data-aos-duration="2500">
            핫 한 웨이팅 라인업, 이제 Food Planet에서!
          </p>
        </div>

        <div className="mainContainer grid">
          {Posts.map((Posts) => {
            return (
              <div className="singlePost grid">
                <div
                  data-aos="fade-right"
                  data-aos-duration="2500"
                  className="imgDiv"
                >
                  <img src={Posts.postImage} alt={Posts.title} />
                </div>

                <div className="postDetails">
                  <h3 data-aos="fade-right" data-aos-duration="2000">
                    {Posts.title}
                  </h3>
                  <p data-aos="fade-right" data-aos-duration="2500">
                    {Posts.desc}
                  </p>
                </div>
                <a
                  data-aos="fade-right"
                  data-aos-duration="2500"
                  href="#"
                  className="flex"
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
