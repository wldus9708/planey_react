import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './RestaurantDetail.module.css';
import { useParams } from "react-router-dom";

function RestaurantDetail() {
  let { id } = useParams(); // URL에서 레스토랑 ID 가져오기

  const [image, setImage] = useState(''); // 이미지
  const [numberOfPeople, setNumberOfPeople] = useState(1); // 인원 수
  const [restaurant, setRestaurant] = useState(null); // 레스토랑 정보
  const [error, setError] = useState(null); // 에러 상태
  const [notFound, setNotFound] = useState(false); // 식당 번호 상태

  // 대표 이미지 변경
  const handleImageClick = (imageUrl) => {
    setImage(imageUrl);
  };

  // 인원수 증가시키기
  const incrementNumberOfPeople = () => {
    setNumberOfPeople(prevCount => prevCount + 1);
  };

  // 인원수 1 이상
  const decrementNumberOfPeople = () => {
    if (numberOfPeople > 1) {
      setNumberOfPeople(prevCount => prevCount - 1);
    }
  };

// useEffect를 사용하여 API 요청 보내기
useEffect(() => {
  axios.get(`http://localhost:8988/restaurant/detail/${id}`) // 식당 아이디로 상세정보 가져오기
    .then(response => {
      if (response.data) {
        setRestaurant(response.data); // 레스토랑 정보 설정
        console.log(response.data)
        console.log(id);
        setImage(`/images/${response.data.restImage01}`);// 이미지 URL 설정
        setNumberOfPeople(response.data.restCapacity); // 인원수 설정
      } else {
        setNotFound(true); // 상품이 없는 경우
      }
    })
    .catch(error => {
      console.error('error:', error);
      setError('error'); // 에러
    });
}, [id]); // id가 변경될 때마다 useEffect 실행

// 레스토랑이 없는 경우 상품이 없음 메시지 표시(확인차 추후 삭제)
if (!restaurant) {
  return <div>데이터 베이스에 없는 식당 아이디 요청했음</div>;
}
  return (
    <div className={styles.restaurant_body}>
      <div className={`${styles.restaurant_container} ${styles.restaurant_flex}`}>
        <div className={styles.restaurant_left}>
          <div className={styles.restaurant_main_image}>
            <img src={image} className={styles.restaurant_slide} alt="product" />
          </div>
          <div className={`${styles.restaurant_option} ${styles.restaurant_flex}`}>
            <img src={`/images/${restaurant && restaurant.restImage01}`} onClick={() => handleImageClick(restaurant && restaurant.restImage01)} alt="image1" />
            <img src={`/images/${restaurant && restaurant.restImage02}`} onClick={() => handleImageClick(restaurant && restaurant.restImage02)} alt="image2" />
            <img src={`/images/${restaurant && restaurant.restImage03}`} onClick={() => handleImageClick(restaurant && restaurant.restImage03)} alt="image3" />
            <img src={`/images/${restaurant && restaurant.restImage04}`} onClick={() => handleImageClick(restaurant && restaurant.restImage04)} alt="image4" />
            <img src={`/images/${restaurant && restaurant.restImage05}`} onClick={() => handleImageClick(restaurant && restaurant.restImage05)} alt="image5" />
          </div>
        </div>
        <div className={styles.restaurant_right}>
          <label>{restaurant && restaurant.restCategory}</label><h3>{restaurant && restaurant.restName}&nbsp;&nbsp;<span className={styles.restaurant_grade}>★ {restaurant && restaurant.restGrade}</span></h3>
          <span className={styles.restaurant_address}>{restaurant && restaurant.restAddress}</span>
          <h4><small>₩</small>{restaurant && restaurant.restPrice.toLocaleString()}</h4>
          <p>{restaurant && restaurant.restDescription}</p>
          <h5>인원수</h5>
          <div className={`${styles.restaurant_add} ${styles.restaurant_flex1}`}>
            <button onClick={decrementNumberOfPeople}>-</button>
            <label>{numberOfPeople}</label>
            <button onClick={incrementNumberOfPeople}>+</button>
          </div>
          <button className={styles.restaurant_btn}>예약하러 가기</button>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetail;
