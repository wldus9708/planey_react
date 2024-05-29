import styles from "./AirportDetail.module.css"
import NavBar from "../../CKH/Components/Navbar/Navbar"
import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AirportSeat from '../Seat/SeatBooking'


const AirportDetail = () => {
  const [flightDto, setFlightDto] = useState(null);
  const [returnFlightDto, setReturnFlightDto] = useState(null);
  const [showModal, setShowModal] = useState(false); // 모달 열고 닫기 상태 추가
  const [selectedSeats, setSelectedSeats] = useState({ outbound: [], return: [] }); // 선택한 좌석을 저장하는 상태
  const [tempSelectedSeats, setTempSelectedSeats] = useState({ outbound: [], return: [] }); // 모달 내 임시 선택 좌석 상태

  // 인원수
  const [outboundAdultCount, setOutboundAdultCount] = useState(0);
  const [outboundChildCount, setOutboundChildCount] = useState(0);
  const [returnAdultCount, setReturnAdultCount] = useState(0);
  const [returnChildCount, setReturnChildCount] = useState(0);

  // 요금
  const [outboundAdultPrice, setOutboundAdultPrice] = useState(0);
  const [outboundChildPrice, setOutboundChildPrice] = useState(0);
  const [returnAdultPrice, setReturnAdultPrice] = useState(0);
  const [returnChildPrice, setReturnChildPrice] = useState(0);

  const [isOutbound, setIsOutbound] = useState(true); // 현재 좌석 선택이 가는편인지 오는편인지 상태

  let { id } = useParams();

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await fetch(`http://localhost:8988/products/FlightsDetail/${id}`);
        const data = await response.json();
        setFlightDto(data.flightDto);
        setReturnFlightDto(data.returnFlightDto);
      } catch (error) {
        console.error('Error fetching flight data:', error);
      }
    };

    fetchFlightData();
  }, []);

  if (!flightDto || !returnFlightDto) {
    return <div>Loading...</div>;
  }

  const convertMinutesToHoursAndMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}시간 ${remainingMinutes}분`;
  };

  const incrementOutboundCount = (type) => {
    if (type === 'adult') {
      setOutboundAdultCount(outboundAdultCount + 1);
      calculateOutboundAdultPrice(); // 성인 수량 증가 시 성인 요금 계산 함수 호출
    } else {
      setOutboundChildCount(outboundChildCount + 1);
      calculateOutboundChildPrice(); // 소아 수량 증가 시 소아 요금 계산 함수 호출
    }
  };

  const decrementOutboundCount = (type) => {
    if (type === 'adult' && outboundAdultCount > 1) {
      setOutboundAdultCount(outboundAdultCount - 1);
      calculateOutboundAdultPrice();
    } else if (type === 'child' && outboundChildCount > 0) {
      setOutboundChildCount(outboundChildCount - 1);
      calculateOutboundChildPrice();
    }
  
    
  };

  const incrementReturnCount = (type) => {
    if (type === 'adult') {
      setReturnAdultCount(returnAdultCount + 1);
    } else {
      setReturnChildCount(returnChildCount + 1);
    }
    calculateReturnPrices();
  };

  const decrementReturnCount = (type) => {
    if (type === 'adult' && returnAdultCount > 1) {
      setReturnAdultCount(returnAdultCount - 1);
    } else if (type === 'child' && returnChildCount > 0) {
      setReturnChildCount(returnChildCount - 1);
    }
    calculateReturnPrices();

  };


  const handleModalClose = () => {
    setShowModal(false);
  };


  const handleModalShow = (isOutboundFlight) => {
    setIsOutbound(isOutboundFlight);
    setTempSelectedSeats(selectedSeats); // 모달 열 때 임시 선택 좌석을 현재 선택된 좌석으로 설정
    setShowModal(true);
  };

  const handleConfirm = () => {
    setSelectedSeats(tempSelectedSeats); // 확인 버튼 클릭 시 임시 선택 좌석을 최종 선택 좌석으로 설정
    setShowModal(false);
  };

  const handleSelectSeat = (seat) => {
    let totalOutboundPassengerCount = outboundAdultCount + outboundChildCount;
    let totalReturnPassengerCount = returnAdultCount + returnChildCount;
    let selectedOutboundSeatCount = tempSelectedSeats.outbound.length;
    let selectedReturnSeatCount = tempSelectedSeats.return.length;

    if (isOutbound) {
      if (tempSelectedSeats.outbound.includes(seat)) {
        setTempSelectedSeats(prev => ({
          ...prev,
          outbound: prev.outbound.filter(selectedSeat => selectedSeat !== seat)
        }));
      } else if (selectedOutboundSeatCount < totalOutboundPassengerCount) {
        setTempSelectedSeats(prev => ({
          ...prev,
          outbound: [...prev.outbound, seat]
        }));
      } else {
        alert('가는 항공편의 모든 승객이 좌석을 선택 하였습니다.');
      }
    } else {
      if (tempSelectedSeats.return.includes(seat)) {
        setTempSelectedSeats(prev => ({
          ...prev,
          return: prev.return.filter(selectedSeat => selectedSeat !== seat)
        }));
      } else if (selectedReturnSeatCount < totalReturnPassengerCount) {
        setTempSelectedSeats(prev => ({
          ...prev,
          return: [...prev.return, seat]
        }));
      } else {
        alert('오는 항공편의 모든 승객이 좌석을 선택 하였습니다.');
      }
    }
  };

  // 가는 항공편 성인
  const renderSeats = (seats) => seats.length > 0 ? seats.join(', ') : '선택 안됨';

  const calculateOutboundAdultPrice = () => {
    const adultPrice = flightDto.fli_price * (outboundAdultCount + 1);
    setOutboundAdultPrice(adultPrice);
  };

  // 가는 항공편 소아
  const calculateOutboundChildPrice = () => {
    const childCount = outboundChildCount > 0 ? (outboundChildCount + 1 ): 0;
    const childPrice = (flightDto.fli_price * 0.5) * childCount;
    setOutboundChildPrice(childPrice); 
  };
  

//오는 항공편: 성인과 소아의 수량에 따라 요금을 계산하는 함수
const calculateReturnPrices = () => {
  const returnAdultPrice = returnFlightDto.return_fli_price * returnAdultCount;
  const returnChildPrice = (returnFlightDto.return_fli_price * 0.5) * returnChildCount;
  setReturnAdultPrice(returnAdultPrice);
  setReturnChildPrice(returnChildPrice); 
 

};



    

  return (
    <>

      <div style={{ padding: '1rem' }}>
        <NavBar />
      </div>

      <div style={{ padding: '3rem' }}></div>


      <div className={styles.AirportDetail}>
        <div className={styles.AirportHeader}>
          <div className={styles.hh5}>항공권 예약 하기&nbsp;&nbsp;</div>
          <Link className={styles.backList} to={`/AirportList`}>
            /&nbsp;&nbsp; 전체 검색 돌아가기
          </Link>
        </div>
        <hr className={styles.hr} />
        <p className={styles.priceComent}>
          👶 소아 요금은 기본 요금의 50%로 책정됩니다.
        </p>
        {/* 가는편 */}
        <div className={styles.flightGoTicket}>
          <div className={styles.flightColor}>
            {flightDto.fli_brand_image && (
              <img

                src={`/images/${flightDto.fli_brand_image}`}
                lt="항공사로고" />
            )}
            <div className={styles.flightGoRegion}>
              {flightDto.fli_departure_place}
            </div>
            <div className={styles.flightArriRegion}>
              {flightDto.fli_arrival_place}
            </div>
            <div className={styles.flightGoDate}>
              {flightDto.fli_departure_date}
            </div>
            <div className={styles.flightArriDate}>
              {flightDto.fli_arrival_date}
            </div>
            <div className={styles.flightGoTime}>
              {flightDto.fli_departure_time}
            </div>
            <div className={styles.flightArriTime}>
              {flightDto.fli_arrival_time}
            </div>
            <div className={styles.totalTime}>
              총 {convertMinutesToHoursAndMinutes(flightDto.fli_total_time)}
            </div>
            <div className={styles.FliIcon}>
             
            </div>
            <button
              className={styles.flightSeat}
              onClick={() => handleModalShow(true)}>
              좌석 선택
            </button>


            {/* 성인/소아 선택 */}
            <div className={styles.passengerSelection}>
              <div className={styles.passengerType}>
                <span>성인 </span>
                <button onClick={() => decrementOutboundCount('adult')}>-</button>
                <span>{outboundAdultCount}</span>
                <button onClick={() => incrementOutboundCount('adult')}>+</button>
              </div>
              <div className={styles.passengerType}>
                <span>소아 </span>
                <button onClick={() => decrementOutboundCount('child')}>-</button>
                <span>{outboundChildCount}</span>
                <button onClick={() => incrementOutboundCount('child')}>+</button>
              </div>
            </div>


          </div>
        </div>






        {/* 오는편 */}
        <div className={styles.flightReturnTicket}>
          <div className={styles.flightColor}>
            {returnFlightDto.return_fli_brand_image && (
              <img

                src={`/images/${returnFlightDto.return_fli_brand_image}`}
                lt="항공사로고" />
            )}

            <div className={styles.flightGoRegion}>
              {returnFlightDto.return_fli_departure_place}
            </div>
            <div className={styles.flightArriRegion}>
              {returnFlightDto.return_fli_arrival_place}
            </div>
            <div className={styles.flightGoDate}>
              {returnFlightDto.return_fli_departure_date}
            </div>
            <div className={styles.flightArriDate}>
              {returnFlightDto.return_fli_arrival_date}
            </div>
            <div className={styles.flightGoTime}>
              {returnFlightDto.return_fli_departure_time}
            </div>
            <div className={styles.flightArriTime}>
              {returnFlightDto.return_fli_arrival_time}
            </div>
            <div className={styles.totalTime}>
              총 {convertMinutesToHoursAndMinutes(returnFlightDto.return_fli_total_time)}
            </div>
            <div className={styles.FliIcon}>
            </div>
            <button
              className={styles.flightSeat}
              onClick={() => handleModalShow(false)}>

              좌석 선택
            </button>

            {/* 성인/소아 선택 */}
            <div className={styles.passengerSelection}>
              <div className={styles.passengerType}>
                <span>성인 </span>
                <button onClick={() => decrementReturnCount('adult')}>-</button>
                <span>{returnAdultCount}</span>
                <button onClick={() => incrementReturnCount('adult')}>+</button>
              </div>
              <div className={styles.passengerType}>
                <span>소아 </span>
                <button onClick={() => decrementReturnCount('child')}>-</button>
                <span>{returnChildCount}</span>
                <button onClick={() => incrementReturnCount('child')}>+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.flightReservation}>
        <div className={styles.flightGoReservation}>
          <h5
            className={styles.h5}
          >가는 항공편</h5>
          <br />
          <div>
            성인{outboundAdultCount}명
          </div>
          <br />
          <div>
            소인{outboundChildCount}명
          </div>
          <br />
          <div>
            좌석 {renderSeats(selectedSeats.outbound)}
          </div>
        </div>
        <div>
          <h5
            className={styles.h5}
          >오는 항공편</h5>
          <br />
          <div className={styles.flightReturnReservation}>
            <div>
              성인{returnAdultCount}명
            </div>
            <br />
            <div>
              소인{returnChildCount}명
            </div>
            <br />
            <div>
              좌석 {renderSeats(selectedSeats.return)}
            </div>
          </div>
        </div>
        <div className={styles.GoFlightPrice}>
          <h5 className={styles.totalPrice}>
            총 요금
          </h5>
          <li>가는 항공편</li>
          <br />
          <li>성인 x {outboundAdultCount}&nbsp;&nbsp;{outboundAdultPrice}원</li>
          <br />
          <li>소아 x {outboundChildCount}&nbsp;&nbsp;{outboundChildPrice}원</li>
        </div>
        <div>
        <li>오는 항공편</li>
          <br />
          <li>성인 x {returnAdultCount}&nbsp;&nbsp;{returnAdultPrice}원</li>
          <br />
          <li>소아 x {returnChildCount}&nbsp;&nbsp;{returnChildPrice}원</li>
        </div>
      </div>



      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>좌석을 선택해 주세요.</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>닫기</Button>
          <Button variant="primary" onClick={handleConfirm}>확인</Button>
        </Modal.Footer>
        <Modal.Body>
          <AirportSeat onSelectSeat={handleSelectSeat} selectedSeats={isOutbound ? tempSelectedSeats.outbound : tempSelectedSeats.return} />
        </Modal.Body>

      </Modal>



    </>

  );
};

export default AirportDetail;