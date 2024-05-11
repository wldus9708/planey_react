import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Carousel from "react-bootstrap/Carousel";
import img1 from "../../images/Jeju.png";
import img2 from "../../images/Jeju01.png";
import img3 from "../../images/Jeju02.png";
import "./CarouselPage.css";
import Stack from "react-bootstrap/Stack";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function CarouselPage() {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
    sendDataToServer(ranges.selection);
  };

  const sendDataToServer = (selectedRange) => {
    const startDate = selectedRange.startDate;
    const endDate = selectedRange.endDate;
    // 지도 날짜 범위값 서버로 전송하는 코드를 추가해야함
    console.log("선택한 범위:", startDate, endDate);
  };

  return (
    <Stack direction="horizontal" gap={3}>
      <div className="p-2">
        <h2>출발 날짜를 선택해주세요</h2>
        <div>
          <DateRangePicker ranges={dateRange} onChange={handleSelect} />
        </div>
      </div>

      <div className="p-4">
        <Carousel>
          <Carousel.Item>
            <img
              style={{ height: "100vh" }}
              className=" d-block w-100"
              src={img1}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>제주도 훈저옵서예</h3>
              <p>
                제주도 훈저옵서예제주도 훈저옵서예제주도 훈저옵서예제주도
                훈저옵서예.
              </p>
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
              <h3>제주도 훈저옵서예</h3>
              <p>
                제주도 훈저옵서예제주도 훈저옵서예제주도 훈저옵서예제주도
                훈저옵서예.
              </p>
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
              <h3>제주도 훈저옵서예</h3>
              <p>
                제주도 훈저옵서예제주도 훈저옵서예제주도 훈저옵서예제주도
                훈저옵서예.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </Stack>
  );
}

export default CarouselPage;
