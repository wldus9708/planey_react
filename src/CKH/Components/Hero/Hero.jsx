import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useUser from "../../../BBS/Log/useUser"; // 사용자 정보를 가져오는 훅
import { handleNavItemClick } from "../Navbar/Navbar"; // 공통 함수 임포트
import video1 from "./Asset/배경영상3.mp4";
import video2 from "./Asset/여행영상.mp4";
import video3 from "./Asset/항공.mp4";
import video4 from "./Asset/카리브해.mp4";
import video5 from "./Asset/배경영상2.mp4";
import backgroundVideo from "./Asset/구름바다파도.mp4"; // 배경 동영상 추가
import "./Hero.css";

const HeroSection = () => {
  const user = useUser();
  const [cookies] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  return (
    <div className="Back">
      <video autoPlay muted loop id="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="back-overlay"></div>
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <div className="flex flex-col items-center mt-6 lg:mt-20">
          <h3 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
            <br />
            <span className="text-white-bold line-1">
              여행의 모든 것
            </span>
          </h3>
          <br/>
          <h3 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
            <span className="text-white-bold line-2">
              최고의 여행 동반자
              <br />
              모든 예약을 한 곳에서 간편하게!
            </span>
          </h3>
          <div className="flex justify-center my-10">
            <button
              onClick={() =>
                handleNavItemClick(
                  user,
                  cookies,
                  "PACKAGE_LIST",
                  "/PackageTour/list",
                  navigate
                )
              }
              className="custom-button"
            >
              패키지 보러가기
            </button>
          </div>
          <div className="flex mt-20 justify-center">
            <video
              autoPlay
              loop
              muted
              className="rounded-lg w-1/4 border border-orange-700 shadow-sm shadow-orange-400 mx-4 my-10"
            >
              <source src={video1} type="video/mp4" />
            </video>
            <video
              autoPlay
              loop
              muted
              className="rounded-lg w-1/4 border border-orange-700 shadow-sm shadow-orange-400 mx-4 my-10"
            >
              <source src={video2} type="video/mp4" />
            </video>
            <video
              autoPlay
              loop
              muted
              className="rounded-lg w-1/4 border border-orange-700 shadow-sm shadow-orange-400 mx-4 my-10"
            >
              <source src={video3} type="video/mp4" />
            </video>
            <video
              autoPlay
              loop
              muted
              className="rounded-lg w-1/4 border border-orange-700 shadow-sm shadow-orange-400 mx-4 my-10"
            >
              <source src={video4} type="video/mp4" />
            </video>
            <video
              autoPlay
              loop
              muted
              className="rounded-lg w-1/4 border border-orange-700 shadow-sm shadow-orange-400 mx-4 my-10"
            >
              <source src={video5} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
