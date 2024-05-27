import React, { useState } from "react";
import "./navbar.css";
import { TbBeach } from "react-icons/tb";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { Link } from "react-router-dom";
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
import useUser from "../../../BBS/Log/useUser"; // useUser hook imported
import UserActionLogger from '../../../BBS/Log/UserActionLogger'; // UserActionLogger imported

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
  const [cookies] = useCookies(["accessToken"]);
  const user = useUser(); // useUser hook used

  const handleLogoutClick = () => {
    jsCookies.remove("accessToken");
    window.location.reload(); // Reload page after logout
  };

  return (
    <section className="navBarSection">
      <UserActionLogger /> {/* UserActionLogger added */}
      <div className={transparent}>
        <div className="logoDiv">
          <Link to="/" className="logo">
            <h1 className="flex">
              <TbBeach />
              PRANEY
            </h1>
          </Link>
        </div>

        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <Link to="/PackageTour/list" className="navLink">
                <FaBoxOpen />
                Packge
              </Link>
            </li>

            <li className="navItem">
              <Link to="/AirportList" className="navLink">
                <BsFillAirplaneFill />
                Airline
              </Link>
            </li>

            <li className="navItem">
              <Link to="/LodgingList" className="navLink">
                <FaHotel /> Hotel
              </Link>
            </li>

            <li className="navItem">
              <Link to="/car/list" className="navLink">
                <FaCarSide />
                Rental Car
              </Link>
            </li>

            <li className="navItem">
              <Link to="/restaurant/list" className="navLink">
                <PiBowlFoodBold />Restaurant
              </Link>
            </li>

            <li className="navItem">
              <Link to="/mypage" className="navLink" data-action="MY_PAGE_CLICK">
                <FaHome />MyPage
              </Link>
            </li>
          
            <div className="headerBtns flex">
              <button className="btn loginBtn" data-action="MY_PAGE_CLICK">
                <Link to="" >
                  <BsCart4 />
                </Link>
              </button>
            </div>

            <div className="headerBtns flex">
              <button className="btn loginBtn">
                {user ? (
                  <a onClick={handleLogoutClick}>Logout</a>
                ) : (
                  <Link to="/login" data-action="LOGIN_CLICK">
                    <GrLogin />
                    <span>Join Us</span>
                  </Link>
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
