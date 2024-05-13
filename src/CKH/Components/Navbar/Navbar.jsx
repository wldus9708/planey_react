import React, { useState } from "react";
import "./navbar.css";
import { PiBowlFoodBold } from "react-icons/pi";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import jsCookies from 'js-cookie';

const Navbar = () => {
  // Code to toggle/show navBar
  const [active, setActive] = useState("navBar");
  const showNav = () => {
    setActive("navBar activeNavbar");
  };

  //Code to remove Navbar
  const removeNav = () => {
    setActive("navBar");
  };

  // 해더에 배경색을 추가하는 코드...
  const [transparent, setTransparent] = useState("header");
  const addBg = () => {
    if (window.scrollY >= 10) {
      setTransparent("header activeHeader");
    } else {
      setTransparent("header");
    }
  };
  window.addEventListener("scroll", addBg);

  //        쿠키 상태 관리        //
  const [cookies] = useCookies(['accessToken']);

  const handleLogoutClick = () => {
    jsCookies.remove('accessToken')
    
  }

  return (
    <section className="navBarSection">
      <div className={transparent}>
        <div className="logoDiv">
          <a href="#" className="logo">
            <h1 className="flex">
              <PiBowlFoodBold className="icon" />
              PRANEY
            </h1>
          </a>
        </div>

        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <a href="/home" className="navLink">
                홈
              </a>
            </li>

            <li className="navItem">
              <a href="/pakage" className="navLink">
                패키지
              </a>
            </li>

            <li className="navItem">
              <a href="/air" className="navLink">
                항공
              </a>
            </li>

            <li className="navItem">
              <a href="/hotel" className="navLink">
                호텔
              </a>
            </li>

            <li className="navItem">
              <a href="/rent" className="navLink">
                렌트카
              </a>
            </li>

            <div className="headerBtns flex">
              <button className="btn loginBtn">            
                  <Link to="">
                    <a>카트</a>
                  </Link>  
              </button>
            </div>

            <div className="headerBtns flex">
              <button className="btn loginBtn">
                {cookies.accessToken === undefined ?
                  <Link to="login">
                    <a>JoinUs</a>
                  </Link>
                  :
                  <a onClick={handleLogoutClick}>Logout</a>
                }
              </button>
            </div>
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
