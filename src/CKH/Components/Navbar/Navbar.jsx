import React, { useState, useEffect } from "react";
import "./navbar.css";
import { TbBeach } from "react-icons/tb";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import jsCookies from "js-cookie";
import { FaHome } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { BsFillAirplaneFill } from "react-icons/bs";
import { FaBoxOpen } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";
import { FaCarSide } from "react-icons/fa";
import { GrLogin } from "react-icons/gr";
import { PiBowlFoodBold } from "react-icons/pi";
import useUser from "../../../BBS/Log/useUser"; // 사용자 정보를 가져오는 훅
import { logUserAction } from "../../../BBS/Log/LogService"; // logUserAction 함수 임포트

// 기존 코드 상단에 추가
export const handleNavItemClick = async (user, cookies, actionType, path, navigate) => {
  if (user) {
    const timestamp = new Date().toISOString();
    const logData = {
      memberId: user.id,
      username: user.name,
      action: actionType,
      timestamp: timestamp,
      ipAddress: '',
      userAgent: navigator.userAgent,
      details: `${user.name} 님이 ${timestamp}에 '${actionType}'를 클릭하셨습니다.`,
    };

    try {
      await logUserAction(logData, cookies.accessToken);
      console.log(`${actionType} 로그 전송 성공`);
      navigate(path);
    } catch (error) {
      // console.error(`${actionType} 로그 전송 실패:`, error);
    }
  } else {
    navigate(path);
  }
};

const Navbar = () => {
  const [active, setActive] = useState("navBar");
  const [transparent, setTransparent] = useState("header");
  const [cookies] = useCookies(["accessToken"]);
  const user = useUser();
  const navigate = useNavigate();

  const showNav = () => {
    setActive("navBar activeNavbar");
  };

  const removeNav = () => {
    setActive("navBar");
  };

  const addBg = () => {
    if (window.scrollY >= 10) {
      setTransparent("header activeHeader");
    } else {
      setTransparent("header");
    }
  };

  const handleLogoutClick = async () => {
        // 로그 전송
    try {
      await logUserAction(logData, cookies.accessToken);
      // console.log("로그아웃 로그 전송 성공");
  } catch (error) {
      // console.error("로그아웃 로그 전송 실패:", error);
  }
    jsCookies.remove("accessToken");

    localStorage.setItem('logoutSuccess', 'true'); // 로그아웃 성공 플래그 설정

    // 로그아웃 로그 데이터 생성
    const timestamp = new Date().toISOString();
    const logData = {
        memberId: user.id,
        username: user.name,
        action: 'LOGOUT',
        timestamp: timestamp,
        ipAddress: '', // 필요한 경우 IP 주소 추가
        userAgent: navigator.userAgent,
        details: `${user.name} 님이 ${timestamp}에 'LOGOUT'를 성공하셨습니다.`,
    };


 
    setTimeout(() => {
      navigate("/login");
    }, 1000);
    // window.location.reload();
  };

  useEffect(() => {
    window.addEventListener("scroll", addBg);
    // 로그인 및 회원가입 성공 플래그를 확인하고 로그를 전송하는 함수
    const sendLoginLog = async (actionType, flagName) => {
      if (localStorage.getItem(flagName) === 'true' && user) {
        // console.log(`${actionType} 성공 플래그 확인됨`);
        // console.log("사용자 정보:", user);

        const timestamp = new Date().toISOString();
        const logData = {
          memberId: user.id,
          username: user.name,
          action: actionType,
          timestamp: timestamp,
          ipAddress: '',
          userAgent: navigator.userAgent,
          details: `${user.name} 님이 ${timestamp}에 '${actionType}'를 성공하셨습니다.`,
        };

        try {
          await logUserAction(logData, cookies.accessToken); // 로그 전송
          // console.log("로그 전송 성공");
        } catch (error) {
          // console.error("로그 전송 실패:", error);
        }

        localStorage.removeItem(flagName); // 플래그 제거
        // console.log(`${actionType} 성공 플래그 제거됨`);
      }
    };

    // 카카오, 구글, 네이버, 일반 로그인 및 회원가입 성공 플래그 처리
    sendLoginLog('KAKAO_LOGIN', 'kakaoLoginSuccess');
    sendLoginLog('GOOGLE_LOGIN', 'googleLoginSuccess');
    sendLoginLog('NAVER_LOGIN', 'naverLoginSuccess');
    sendLoginLog('LOGIN', 'loginSuccess');
    sendLoginLog('SIGNUP', 'signupSuccess');

    return () => {
      window.removeEventListener("scroll", addBg);
    };
  }, [user, cookies.accessToken]);

  return (
    <section className="navBarSection">
      <div className={transparent}>
        <div className="logoDiv">
          <button onClick={() => handleNavItemClick(user, cookies, 'HOME_CLICK', '/', navigate)} className="logo">
            <h1 className="flex">
              <TbBeach />
              PRANEY
            </h1>
          </button>
        </div>

        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <button onClick={() => handleNavItemClick(user, cookies, 'PACKAGE_LIST', '/PackageTour/list', navigate)} className="navLink">
                <FaBoxOpen />
                Package
              </button>
            </li>

            <li className="navItem">
              <button onClick={() => handleNavItemClick(user, cookies, 'AIRLINE_LIST', '/AirportList', navigate)} className="navLink">
                <BsFillAirplaneFill />
                Airline
              </button>
            </li>

            <li className="navItem">
              <button onClick={() => handleNavItemClick(user, cookies, 'HOTEL_LIST', '/LodgingList', navigate)} className="navLink">
                <FaHotel /> Hotel
              </button>
            </li>

            <li className="navItem">
              <button onClick={() => handleNavItemClick(user, cookies, 'RENTAL_CAR_LIST', '/car/list', navigate)} className="navLink">
                <FaCarSide />
                Rental Car
              </button>
            </li>

            <li className="navItem">
              <button onClick={() => handleNavItemClick(user, cookies, 'RESTAURANT_LIST', '/restaurant/list', navigate)} className="navLink">
                <PiBowlFoodBold />Restaurant
              </button>
            </li>

            <li className="navItem">
              <button onClick={() => handleNavItemClick(user, cookies, 'MY_PAGE_CLICK', '/mypage', navigate)} className="navLink" >
                <FaHome />MyPage
              </button>
            </li>
          
            <div className="headerBtns flex">
              <button className="btn loginBtn" onClick={() => handleNavItemClick(user, cookies, 'CART_CLICK', '/cart', navigate)}>
                <BsCart4 />
              </button>
            </div>

            <div className="headerBtns flex">
              <button className="btn loginBtn">
                {user ? (
                  <span onClick={handleLogoutClick} >Logout</span>
                ) : (
                  <span onClick={() => handleNavItemClick(cookies.accessToken, cookies, 'LOGIN_CLICK', '/login', navigate)}>
                    <GrLogin />
                    <span>Join Us</span>
                  </span>
                )}
              </button>
            </div>
          {user && (
            <li className="navItem BBSuserGreeting">
              <span className="btn loginBtn nbtn customCursor">{user.name}</span>
            </li>
          )}
          </ul>

          <div onClick={removeNav} className="closeNavbar">
            <AiFillCloseCircle className="icon" />
          </div>
        </div>

        <div onClick={showNav} className="toggleNavbar">
          <TbGridDots className="icon" />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
