import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './RestaurantDetail.module.css';
import axios from "axios";
import { useParams } from "react-router-dom";

const RestaurantDetail = () => {
  let { id } = useParams(); // URL에서 레스토랑 ID 가져오기
  const [restaurant, setRestaurant] = useState(null); // 레스토랑 정보
  const [activeImageIndex, setActiveImageIndex] = useState(0); // 활성 이미지 인덱스
  const [numberOfPeople, setNumberOfPeople] = useState(1); // 인원 수

  useEffect(() => {
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
              <span className={styles.restDetailPrice}>{restaurant && restaurant.restPrice.toLocaleString()}</span>
              
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
                <button type="button" className={styles.restDetailbuyNowBtn}>
                  <i className='fas fa-wallet'></i>
                  예약 하러 가기
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
