import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import img1 from "../../images/Jeju.png";
import img2 from "../../images/Jeju01.png";
import img3 from "../../images/Jeju02.png";
import "./CarouselPage.css";
// import Stack from "react-bootstrap/Stack";

function CarouselPage() {
  return (
      <div className="p-4">
        <Carousel>
        <Carousel.Item>
            <img
              style={{ height: "100vh" }}
              className=" d-block w-100"
              src={img2}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h1>패키지 검색하기</h1>
              <button>패키지 검색하기 </button>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              style={{ height: "100vh" }}
              className=" d-block w-100"
              src={img1}
              alt="First slide"
            />
            <Carousel.Caption>
              <h1>항공 보러가기</h1>    
              <button>항공 보러가기 </button>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              style={{ height: "100vh" }}
              className=" d-block w-100"
              src={img2}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h1>호텔 보러가기</h1>
              <button>호텔 보러가기 </button>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              style={{ height: "100vh" }}
              className=" d-block w-100"
              src={img3}
              alt="Third slide"
            />

            <Carousel.Caption>
              <h1>렌트카 보러가기</h1>
              <button>렌트카 보러기기 </button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
  );
}

export default CarouselPage;
