import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './RestaurantDetail.module.css';
import axios from "axios";
import { useParams } from "react-router-dom";
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';


const RestaurantDetail = () => {
  const navigator = useNavigate();
  const [cookies] = useCookies('accessToken');
  const [user, setUser] = useState(null);
  let { id } = useParams(); // URL에서 레스토랑 ID 가져오기
  const [restaurant, setRestaurant] = useState(null); // 레스토랑 정보
  const [activeImageIndex, setActiveImageIndex] = useState(0); // 활성 이미지 인덱스
  const [numberOfPeople, setNumberOfPeople] = useState(1); // 인원 수

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
    } else if (!cookies.accessToken) {
      navigator('/login');
      alert("결제전에 로그인을 해주세요.");
    }

    axios.get(`http://localhost:8988/restaurant/detail/${id}`)
      .then((response) => {
        if (response.data) {
          setRestaurant(response.data); // 레스토랑 정보 설정
          console.log(response.data);
        }
        setActiveImageIndex(1); // 초기 인덱스 설정
      })
      .catch(error => {
        console.error('이미지 이름을 가져오는 중 오류 발생:', error);
      });
  }, [id]);


  // 인원 수 증가 함수
  const increaseNumberOfPeople = () => {
    setNumberOfPeople(prevCount => prevCount + 1);
  };

  // 인원 수 감소 함수
  const decreaseNumberOfPeople = () => {
    if (numberOfPeople > 1) {
      setNumberOfPeople(prevCount => prevCount - 1);
    }
  };



  // 결제 요청 함수
  const handlePayment = () => {

    const handleSuccess = () => {
    //   // 결제가 성공했을 때 서버로 결제 정보 전송
    //   axios.post('http://localhost:8988/payment/detail' , {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     orderId: `order_${id}`,
    //     orderName: `${restaurant.restName} 예약`,
    //     // customerName: user,
    //     amount: (restaurant.restPrice * numberOfPeople), // 결제 금액
    //   })
    //     .then((response) => {
    //       console.log('결제 정보 전송 성공:', response.data);
    //     })
    //     .catch((error) => {
    //       console.error('결제 정보 전송 중 오류 발생:', error);
    //     });
    };

    const clientKey = 'test_ck_EP59LybZ8BvQWvXPnDEW86GYo7pR';
    loadTossPayments(clientKey)
      .then(tossPayments => {
        tossPayments.requestPayment('CARD', {
          amount: (restaurant.restPrice * numberOfPeople), // 결제할 금액
          orderId: `order_${id}`, // 주문의 고유한 식별자
          orderName: `${restaurant.restName} 예약`, // 주문의 이름 또는 설명
          successUrl: `http://localhost:3000/PaymentSuccess?member_id=${user.id}&restaurant=${restaurant.category}`, // 결제 성공 후 이동할 URL 주소
          failUrl: "http://localhost:3000/PaymentFail", // 결제 실패 시 이동할 URL 주소
          onPaymentSuccess: handleSuccess,
          
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
    <div className={styles.restDetailBody}>
      <div className={styles.restDetailwrapper}>
        <div className={styles.restDetailcontainer}>
          <div className={styles.restDetailDiv}>
            <div className={styles.restDetailDivLeft}>
              <div className={styles.restDetailimgContainer}>
                <img
                  src={`/images/${restaurant && restaurant[`restImage0${activeImageIndex + 1}`]}`}
                  alt={`images${activeImageIndex + 1}`}
                />
              </div>
              <div className={styles.restDetailhoverContainer}>
                {[1, 2, 3, 4, 5].map(index => (
                  <div
                    key={index}
                    className={styles.restDetailactive}
                    onMouseOver={() => setActiveImageIndex(index - 1)}
                  >
                    <img
                      src={`/images/${restaurant && restaurant[`restImage0${index}`]}`}
                      alt={`images${index}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.restDetailDivRight}>
              <div className={styles.restDetailHeader}>
                <span className={styles.restDetailName}>{restaurant && restaurant.restName}</span>
                <img src="/images/star.png" alt="star" className={styles.restDetailstarImage} />
                <span className={styles.restDetailRating}>&nbsp;&nbsp;{restaurant && restaurant.restGrade}</span>
              </div>
              <hr />
              <br />
              <span className={styles.restDetailAddress}>{restaurant && restaurant.restAddress}</span>
              <br />
              <span className={styles.restDetailPrice}>{restaurant && (restaurant.restPrice * numberOfPeople).toLocaleString()}</span>

              <p className={styles.restDetailDescription}>
                {restaurant && restaurant.restDescription}
              </p>

              <div className={styles.restDetailbtnGroups}>
                {/* 인원 수 조절 버튼 */}
                <p>예약 인원 </p>
                <div className={styles.numberOfPeopleContainer}>
                  <button className={styles.numberOfPeopleBtn} onClick={decreaseNumberOfPeople}>-</button>
                  <span className={styles.numberOfPeople}>{numberOfPeople}</span>
                  <button className={styles.numberOfPeopleBtn} onClick={increaseNumberOfPeople}>+</button>
                </div>
                <button type="button" className={styles.restDetailaddCartBtn}>
                  <i className='fas fa-shopping-cart'></i>
                  장바구니 추가
                </button>

                <button type="button" className={styles.restDetailbuyNowBtn} onClick={handlePayment}>
                  <i className='fas fa-wallet'></i>
                  결제하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
