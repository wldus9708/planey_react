import React, { useState } from 'react';
import styles from './RestaurantDetail.module.css';

function RestaurantDetail() {
  const [image, setImage] = useState('/images/lamb.jpg');

  const handleImageClick = (imageUrl) => {
    setImage(imageUrl);
  };

  return (
    <div className={styles.restaurant_body}>
      <div className={`${styles.container} ${styles.flex}`}>
        <div className={styles.left}>
          <div className={styles.main_image}>
            <img width='500PX' HEIGHT='500PX' src={image} className={styles.slide} alt="product" />
          </div>
          <div className={`${styles.option} ${styles.flex}`}>
            <img src="/images/lamb.jpg" onClick={() => handleImageClick('/images/lamb.jpg')} alt="product" />
            <img src="/images/lamb2.jpg" onClick={() => handleImageClick('/images/lamb2.jpg')} alt="product" />
            <img src="/images/lamb3.jpg" onClick={() => handleImageClick('/images/lamb3.jpg')} alt="product" />
            <img src="/images/lamb4.jpg" onClick={() => handleImageClick('/images/lamb4.jpg')} alt="product" />
            <img src="/images/lamb5.jpg" onClick={() => handleImageClick('/images/lamb5.jpg')} alt="product" />
            <img src="/images/lamb6.jpg" onClick={() => handleImageClick('/images/lamb6.jpg')} alt="product" />
          </div>
        </div>
        <div className={styles.right}>
          <h3>프렌치랙 양갈비</h3>
          <h4><small>₩</small>35,000 </h4>
          <p>부드러운 살코기와 고소한 지방, 환상의 조화 프렌치랙을 이용해보세요. 고기의 지방층까지 부드러운 우유맛이 난다고해서 최고급 프랑스 요리에 많이 사용되는 부위로
            양 한마리에서 5%만 나오는 치트키 부위! 캠핑 메인요리, 홈파티, 기념일, 손님맞이할 때 특별하고 고급진 요리로 추천합니다!
          </p>
          <h5>Color-Rose Gold</h5>
          <div className={`${styles.color} ${styles.flex1}`}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <h5>인원수</h5>
          <div className={`${styles.add} ${styles.flex1}`}>
            <span>-</span>
            <label>1</label>
            <span>+</span>
          </div>

          <button>예약하러 가기</button>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetail;
