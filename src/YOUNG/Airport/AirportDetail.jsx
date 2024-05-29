import styles from "./AirportDetail.module.css"
import NavBar from "../../CKH/Components/Navbar/Navbar"
import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AirportSeat from '../Seat/SeatBooking'
import stylesBtn from '../lodging/LodgingDetail.module.css'
import { loadTossPayments } from '@tosspayments/payment-sdk';
import axios from "axios";
import { useCookies } from "react-cookie";





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
  const [user, setUser] = useState(null);
  const [cookies] = useCookies(['accessToken']);

  useEffect(() => {

    console.log(`성인 티켓 개수 , outboundAdultCount: ${outboundAdultCount}`);
    console.log(`성인 티켓 가격 , outboundAdultPrice: ${outboundAdultPrice}`);
  }, [outboundAdultCount, outboundAdultPrice]);



  useEffect(() => {
    console.log("accessToken :" + cookies.accessToken);
    if (cookies.accessToken) {
      // Fetch user information using the access token
      axios.get('http://localhost:8988/member/detailPage', {
        headers: {
          Authorization: `${cookies.accessToken}`,
        },
      })
        .then((response) => {
          setUser(response.data);
          console.log(response.data.id);
        })
        .catch(error => {
          console.error('사용자 정보 가져오는 중 오류 발생:', error);
        });
    } else if (!cookies.accessToken) {
      navigator('/login');
      alert("결제전에 로그인을 해주세요.");
    }
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
      setOutboundAdultCount(prevCount => {
        const newCount = prevCount + 1;
        calculateOutboundAdultPrice(newCount); // 성인 수량 증가 시 성인 요금 계산 함수 호출
        return newCount;
      });
    } else {
      setOutboundChildCount(prevCount => {
        const newCount = prevCount + 1;
        calculateOutboundChildPrice(newCount); // 소아 수량 증가 시 소아 요금 계산 함수 호출
        return newCount;
      });
    }
  };

  const decrementOutboundCount = (type) => {
    if (type === 'adult' && outboundAdultCount >= 1) {
      setOutboundAdultCount(prevCount => {
        const newCount = prevCount - 1;
        calculateOutboundAdultPrice(newCount);
        return newCount;
      });
    } else if (type === 'child' && outboundChildCount > 0) {
      setOutboundChildCount(prevCount => {
        const newCount = prevCount - 1;
        calculateOutboundChildPrice(newCount);
        return newCount;
      });
    }


  };

  const incrementReturnCount = (type) => {
    if (type === 'adult') {
      setReturnAdultCount(prevCount => {
        const newCount = prevCount + 1;
        calculateReturnPrices(newCount, returnChildCount); // 성인 수량 증가 시 요금 계산 함수 호출
        return newCount;
      });
    } else {
      setReturnChildCount(prevCount => {
        const newCount = prevCount + 1;
        calculateReturnPrices(returnAdultCount, newCount); // 소아 수량 증가 시 요금 계산 함수 호출
        return newCount;
      });
    }
  };

  const decrementReturnCount = (type) => {
    if (type === 'adult' && returnAdultCount >= 1) {
      setReturnAdultCount(prevCount => {
        const newCount = prevCount - 1;
        calculateReturnPrices(newCount, returnChildCount);
        return newCount;
      });
    } else if (type === 'child' && returnChildCount > 0) {
      setReturnChildCount(prevCount => {
        const newCount = prevCount - 1;
        calculateReturnPrices(returnAdultCount, newCount);
        return newCount;
      });
    }
  };

  const calculateReturnPrices = (newAdultCount, newChildCount) => {
    const returnAdultPrice = returnFlightDto.return_fli_price * newAdultCount;
    const returnChildPrice = (returnFlightDto.return_fli_price * 0.5) * newChildCount;
    setReturnAdultPrice(returnAdultPrice);
    setReturnChildPrice(returnChildPrice);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };


  const handleModalShow = (isOutboundFlight) => {

    const totalOutboundPassengerCount = outboundAdultCount + outboundChildCount;
    const totalReturnPassengerCount = returnAdultCount + returnChildCount;

    if ((isOutboundFlight && totalOutboundPassengerCount === 0) || (!isOutboundFlight && totalReturnPassengerCount === 0)) {
      alert('좌석을 선택하기 전에 인원을 선택해 주세요.');
      return;
    }
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



  const renderSeats = (seats) => seats.length > 0 ? seats.join(', ') : '선택 안됨';


  // 가는 항공편 성인
  const calculateOutboundAdultPrice = (newCount) => {
    const adultPrice = flightDto.fli_price * newCount;
    setOutboundAdultPrice(adultPrice);
  };

  // 가는 항공편 소아
  const calculateOutboundChildPrice = (newCount) => {
    const childPrice = (flightDto.fli_price * 0.5) * newCount;
    setOutboundChildPrice(childPrice);
  };


  // 오는 항공편 성인
  const calculateReturnAdultPrice = (newCount) => {
    const adultPrice = returnFlightDto.return_fli_price * newCount;
    setReturnAdultPrice(adultPrice);
  };

  // 오는 항공편 소아
  const calculateReturnChildPrice = (newCount) => {
    const childPrice = (returnFlightDto.return_fli_price * 0.5) * newCount;
    setReturnChildPrice(childPrice);
  };

  // 총 요금 계산 함수
  const calculateTotalPrice = () => {
    const totalPrice =
      outboundAdultPrice +
      outboundChildPrice +
      returnAdultPrice +
      returnChildPrice;
    return totalPrice;
  };

  // 결제 성공 시 예약 데이터 저장 함수
  const saveRestaurantReservation = (reservationData) => {
    axios.post(`http://localhost:8988/payment/saveRestaurantReservation/${id}`, reservationData)
      .then(response => {
        if (response.data) {
          console.log('레스토랑 예약이 성공적으로 처리되었습니다.');
        }
      })
      .catch(error => {
        console.error('레스토랑 예약 정보를 저장하는데 실패했습니다:', error);
      });
  };

  // 결제 성공 처리 함수
  const handlePaymentSuccess = (amount) => {
    const reservationData = {
      memberId: user.id,
      id: id,
      relationship: 10001,
      restResDate: new Date(), // 현재 시간
      restResTime: new Date().toISOString(), // 예약 시간 추가
      fli_price: amount,
      restResState: "COMPLETED",
    };
    saveRestaurantReservation(reservationData);
  };

  // 결제 요청 함수
  const handlePayment = () => {
    // 선택된 좌석 확인
    const isOutboundSeatsSelected = selectedSeats.outbound.length > 0;
    const isReturnSeatsSelected = selectedSeats.return.length > 0;

    // 인원수 확인
    const isAdultSelected = outboundAdultCount > 0 || returnAdultCount > 0;

    if (!isOutboundSeatsSelected || !isReturnSeatsSelected) {
      alert("가는 항공편과 오는 항공편의 좌석을 모두 선택해 주세요.");
      return;
    }

    if (!isAdultSelected) {
      alert("성인이 한 명 이상 선택되어야 합니다.");
      return;
    }

    const clientKey = 'test_ck_EP59LybZ8BvQWvXPnDEW86GYo7pR';
    const totalPrice = calculateTotalPrice();
    loadTossPayments(clientKey)
      .then(tossPayments => {
        tossPayments.requestPayment('CARD', {
          amount: totalPrice, // 결제할 금액
          orderId: `order_${id}`, // 주문의 고유한 식별자
          orderName: `${flightDto.id} 예약`, // 주문의 이름 또는 설명
          successUrl: `http://localhost:3000/PaymentSuccess?member_id=${user.id}&flight=${flightDto.category}`, // 결제 성공 후 이동할 URL 주소
          failUrl: "http://localhost:3000/PaymentFail", // 결제 실패 시 이동할 URL 주소
        })
          .then((response) => {
            if (response.success) {
              handlePaymentSuccess(response.amount);
            }
          })
          .catch((error) => {
            console.error('결제 중 오류 발생:', error);
            alert("결제 실패.");
          });
      })
      .catch(error => {
        console.error('토스페이먼츠 로딩 중 오류 발생:', error);
        alert("결제 애플리케이션 로딩 실패.");
      });
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
        <p className={styles.reservationComent}>
          🛬 가는편 항공, 오는편 항공 각각 인원수에 알맞게 좌석을 선택 해주세요.
        </p>
        {/* 가는편 */}
        <div className={styles.flightGoTicket}>
          <div className={styles.flightColor}>
            {flightDto.fli_brand_image && (
              <img

                src={`/images/${flightDto.fli_brand_image}`}
                lt="항공사로고" />
            )}
            <div className={styles.flightTicketDetail}>
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
            <div className={styles.flightTicketDetail}>
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

        {/* <h5 className={styles.totalPrice}>
            총 요금
          </h5> */}
        <div className={styles.flightGoReservation}>
          <h5
            className={styles.h5}
          >요금</h5>
          <br />
          <div className={styles.GoFlightPrice}>
            <h6>가는 항공편</h6>

            <li>성인 x {outboundAdultCount}&nbsp;&nbsp;&nbsp;&nbsp;{outboundAdultPrice}원</li>
            <br />
            <li>소아 x {outboundChildCount}&nbsp;&nbsp;&nbsp;&nbsp;{outboundChildPrice}원</li>
          </div>
        </div>
        <br />
        <div className={styles.returnFlightPrice}>
          <h6>오는 항공편</h6>
          <li>성인 x {returnAdultCount}&nbsp;&nbsp;&nbsp;&nbsp;{returnAdultPrice}원</li>
          <br />
          <li>소아 x {returnChildCount}&nbsp;&nbsp;&nbsp;&nbsp;{returnChildPrice}원</li>
        </div>
        <h5 className={styles.h5}>총 요금:&nbsp;&nbsp;{calculateTotalPrice()}원</h5>
        <div className={styles.blank}></div>
        <div className={stylesBtn.btnGroups}>

          {/* 버튼에 추가 onClick={handleAddToCartClick} */}
          <button type="button" className={stylesBtn.addCartBtn}>
            <i className='fas fa-shopping-cart'></i>
            장바구니 추가
          </button>
          <br />
          <br />
          {/* 버튼에 추가 onClick={handleBuyNowClick} */}
          <button type="button" className={stylesBtn.buyNowBtn} onClick={handlePayment}>
            <i className='fas fa-wallet'></i>
            예약 하러 가기
          </button>
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