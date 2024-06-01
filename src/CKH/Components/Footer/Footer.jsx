import React, { useEffect } from "react";
import "./footer.css";
import { TbBeach } from "react-icons/tb";
import { ImFacebook } from "react-icons/im";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";

import Aos from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    Aos.init({ duration: 300 });
  }, []);
  return (
    <div className="footer">
      <div className="secContainer container grid">
        <div className="logoDiv">
          <div className="footerLogo">
            <a href="#" className="logo flex">
              <h1
                data-aos="zoom-in"
                data-aos-easing="ease-in-sine"
                className="flex"
              >
                <TbBeach className="icon" />
                PLANEY
              </h1>
            </a>
          </div>

          <div className="socials flex">
            <ImFacebook className="icon" />
            <BsTwitter className="icon" />
            <AiFillInstagram className="icon" />
          </div>
        </div>

        <div
          data-aos="fade-right"
          data-aos-easing="ease-in-sine"
          className="footerLinks"
        >
          <span className="linkTitle">Helpful Links</span>
          <li>
            <a href="#">Destination</a>
          </li>
          <li>
            <a href="#">Support</a>
          </li>
          <li>
            <a href="#">Travel & Conditions</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
        </div>

        <div
          data-aos="fade-right"
          data-aos-easing="ease-in-sine"
          className="footerLinks"
        >
          <span className="linkTitle">Information</span>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Explore</a>
          </li>
          <li>
            <a href="#">Travel</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
        </div>

        <div
          data-aos="fade-right"
          data-aos-easing="ease-in-sine"
          className="footerLinks"
        >
          <span className="linkTitle">Contact Us</span>
          <span className="phone">+111 222 333</span>
          <span className="email">bbs4861@naver.com</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
