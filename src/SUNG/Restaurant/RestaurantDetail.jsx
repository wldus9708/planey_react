import React, { useState } from 'react';
import styles from './RestaurantDetail.module.css';

function RestaurantDetail() {
  const [image, setImage] = useState('/images/lamb.jpg');
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const handleImageClick = (imageUrl) => {
    setImage(imageUrl);
  };

  const incrementNumberOfPeople = () => {
    setNumberOfPeople(prevCount => prevCount + 1);
  };

  const decrementNumberOfPeople = () => {
    if (numberOfPeople > 1) {
      setNumberOfPeople(prevCount => prevCount - 1);
    }
  };

  return (
    <div className={styles.restaurant_body}>
      <div className={`${styles.restaurant_container} ${styles.restaurant_flex}`}>
        <div className={styles.restaurant_left}>
          <div className={styles.restaurant_main_image}>
            <img src={image} className={styles.restaurant_slide} alt="product" />
          </div>
          <div className={`${styles.restaurant_option} ${styles.restaurant_flex}`}>
            <img src="/images/lamb.jpg" onClick={() => handleImageClick('/images/lamb.jpg')} alt="product" />
            <img src="/images/lamb2.jpg" onClick={() => handleImageClick('/images/lamb2.jpg')} alt="product" />
            <img src="/images/lamb3.jpg" onClick={() => handleImageClick('/images/lamb3.jpg')} alt="product" />
            <img src="/images/lamb4.jpg" onClick={() => handleImageClick('/images/lamb4.jpg')} alt="product" />
            <img src="/images/lamb5.jpg" onClick={() => handleImageClick('/images/lamb5.jpg')} alt="product" />
          </div>
        </div>
        <div className={styles.restaurant_right}>
          <label >한식</label><h3>신촌 프렌치랙 양갈비&nbsp;&nbsp;<span className={styles.restaurant_grade}>★ 4.5</span></h3> 
          <span className={styles.restaurant_address}>서울시 신촌 소구장 옆</span>
          <h4><small>₩</small>35,000 </h4>
          <p>부드러운 살코기와 고소한 지방, 환상의 조화 프렌치랙을 이용해보세요. 고기의 지방층까지 부드러운 우유맛이 난다고해서 최고급 프랑스 요리에 많이 사용되는 부위로
            양 한마리에서 5%만 나오는 치트키 부위! 캠핑 메인요리, 홈파티, 기념일, 손님맞이할 때 특별하고 고급진 요리로 추천합니다!
            한번 먹으면 헤어 나올 수 없는 신촌 프렌치랙 양갈비 꼭 방문해주세요!
          </p>
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
