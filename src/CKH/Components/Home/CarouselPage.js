import React from "react";
import Carousel from "react-bootstrap/Carousel";
import img1 from "../../../BBS/image/보라카이02.jpg";
import img2 from "../../../BBS/image/보라카이02.jpg";
import img3 from "../../../BBS/image/보라카이02.jpg";
import img4 from "../../../BBS/image/보라카이02.jpg";
import "./CarouselPage.css";
import Button from "react-bootstrap/Button";

function CarouselPage() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            style={{ height: "100vh" }}
            className="d-block w-100"
            src={img1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>항공</h3>
            <p>항공</p>
            <Button variant="primary" size="lg" active style={{ backgroundColor: 'hsl(26, 93%, 50%)'}}>
              항공 보러가기
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ height: "100vh" }}
            className="d-block w-100"
            src={img2}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>호텔</h3>
            <p>호텔</p>
            <Button variant="primary" size="lg" active style={{ backgroundColor: 'hsl(26, 93%, 50%)'}}>
              호텔 보러기기
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ height: "100vh" }}
            className="d-block w-100"
            src={img3}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>렌트카</h3>
            <p>렌트카</p>
            <Button variant="primary" size="lg" active style={{ backgroundColor: 'hsl(26, 93%, 50%)'}}>
              렌트카 보러가기
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ height: "100vh" }}
            className="d-block w-100"
            src={img4}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>패키지</h3>
            <p>패키지</p>
            <Button variant="primary" size="lg" active style={{ backgroundColor: 'hsl(26, 93%, 50%)'}}>
              패키지 보러가기
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselPage;
