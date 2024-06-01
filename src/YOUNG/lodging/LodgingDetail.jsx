import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './LodgingDetail.module.css';
import axios from "axios";
import { useParams } from "react-router-dom";
import LodgingPayment from "./LodingPayment"; // 경로 수정
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import NavBar from "../../CKH/Components/Navbar/Navbar"

const LodgingDetail = () => {
  let { id } = useParams(); // URL에서 숙소 ID 가져오기
  const [lodging, setLodging] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [reservations, setReservations] = useState([]); // 예약 내역을 위한 상태 추가
  const [totalPrice, setTotalPrice] = useState(0); // 총 가격 상태 추가
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const navigator = useNavigate();
  const [cookies] = useCookies('accessToken');
  const [user, setUser] = useState(null);

  // 스프링 연결 
  useEffect(() => {

    console.log("accessToken :" + cookies.accessToken);
    // console.log("user :" + cookies.name);
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
    } 

    axios.get(`http://localhost:8988/lodging/detail/${id}`)
      .then((response) => {
        if (response.data) {
          setLodging(response.data); // 숙소 정보 업데이트
          setTotalPrice(response.data.lodPrice); // 초기 가격 설정
          console.log(response.data);
        }
        setActiveImageIndex(1); // 초기 인덱스 설정
      })
      .catch(error => {
        console.error('이미지 이름을 가져오는 중 오류 발생:', error);
      });

  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:8988/lodgingDetail/reservation/${id}`)
      .then((response) => {
        if (response.data) {
          setReservations(response.data); // 예약 내역 업데이트
          console.log(response.data);
        }
      })
      .catch(error => {
        console.error('예약 내역을 가져오는 중 오류 발생:', error);
      });
  }, [id]);

  const updateTotalPrice = (adults, children) => {
    if (lodging) {
      const newPrice = lodging.lodPrice * adults + (lodging.lodPrice * 0.5 * children);
      setTotalPrice(newPrice);
    }
  };

  // 결제 요청 함수
  const handlePayment = () => {
    const clientKey = 'test_ck_EP59LybZ8BvQWvXPnDEW86GYo7pR';
    loadTossPayments(clientKey)
      .then(tossPayments => {
        tossPayments.requestPayment('CARD', {
          amount: totalPrice, // 결제할 금액
          orderId: `order_${id}`, // 주문의 고유한 식별자
          orderName: `${lodging.lodName} 예약`, // 주문의 이름 또는 설명
          successUrl: `http://localhost:3000/PaymentSuccessLoging?member_id=${user.id}&lodging=${lodging.category}`, // 결제 성공 후 이동할 URL 주소
          failUrl: "http://localhost:3000/PaymentFail", // 결제 실패 시 이동할 URL 주소
        })
          .then(response => {
            const { amount } = response;
            handlePaymentSuccess(amount);
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

  const saveLodgingReservation = (reservationData) => {
    console.log("여기ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ");
    axios.post('http://localhost:8988/payment/saveLodgingReservation', reservationData)
      .then(response => {
        if (response.data) {
          console.log('숙소 예약이 성공적으로 처리되었습니다.');
        }
      })
      .catch(error => {
        console.error('숙소 예약 정보를 저장하는데 실패했습니다:', error);
      });
  };

  const handlePaymentSuccess = (amount) => {
    const reservationData = {
      memberId: user.id,
      lodgingId: id,
      relationship: 10001,
      lodDepartureDate: startDate, // 시작 날짜
      lodArrivalDate: endDate, // 종료 날짜
      lodResTime: new Date(), // 현재 시간
      lodResCapacity: adults + children, // 총 인원
      lodResPrice: amount,
      lodResState: "COMPLETED",
    };
    saveLodgingReservation(reservationData);
  };

  return (
    <div className={styles.LodgingBody}>
      <div style={{ padding: '1rem', marginRight: '10rem' }}>
        <NavBar />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.lodgingDiv}>
            <div className={styles.lodgingDivLeft}>
              <div className={styles.imgContainer}>
                <img
                  src={`/images/${lodging && lodging[`lodImage0${activeImageIndex + 1}`]}`}
                  alt={`이미지가 없습니다.`}
                />
              </div>
              <div className={styles.hoverContainer}>
                {[1, 2, 3, 4, 5].map(index => (
                  <div
                    key={index}
                    className={styles.lodDetailactive}
                    onMouseOver={() => setActiveImageIndex(index - 1)}
                  >
                    <img
                      src={`/images/${lodging && lodging[`lodImage0${index}`]}`}
                      alt={`이미지가 없습니다.`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.lodgingDivRight}>

              <div className={styles.lodgingHeader}>
                <span className={styles.lodgingName}>{lodging && lodging.lodName}</span>
                <span className={styles.lodgingType}>{lodging && lodging.lodCategory}</span>
                <br />
              </div>
              <hr />
              <br />
              <span className={styles.lodgingAddress}>주소: {lodging && lodging.lodAddress}</span>
              <span className={styles.lodgingAddress}>상세 주소: {lodging && lodging.lodAddressDetail}</span>
              <br />
              <span className={styles.lodgingPrice}>{totalPrice.toLocaleString()}원</span>
              <p className={styles.lodgingDescription}>
                {lodging && lodging.lodDescription}
              </p>
              <span className={styles.alreadyReservation}>
                🔘  표시된 해당 날짜는 이미 예약이 완료되었습니다.
              </span>
              <div>
                <LodgingPayment
                  reservations={reservations}
                  updateTotalPrice={updateTotalPrice} // 가격 업데이트 함수 전달
                  handlePayment={handlePayment} // 결제 요청 함수 전달
                  setStartDate={setStartDate} // 시작 날짜 설정 함수 전달
                  setEndDate={setEndDate} // 종료 날짜 설정 함수 전달
                  setAdults={setAdults} // 성인 수 설정 함수 전달
                  setChildren={setChildren} // 어린이 수 설정 함수 전달
                  lodgingId={id} // 숙소 아이디 전달 for Cart
                  adults={adults} // 성인 수 전달 for Cart
                  children={children} // 어린이 수 전달 for Cart
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LodgingDetail;
