import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './rentCar.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
const RentcarDetail=()=> {
  const [images, setImages] = useState({
    img1: "/images/bike.jpg",
    img2: "/images/sonata.jpg",
    img3: "/images/bmw.jpg",
    img4: "/images/starLex.jpg"
  });;
  const [imageList, setImageList] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  
  const price = 10000; // 상수로 정의
  const id='소나타';
  
  useEffect(() => {
    axios.get("http://localhost:8988/api/images/names")
        .then(response => {
          setImageList(response.data); // 이미지 목록 상태 업데이트
          setActiveImageIndex(0);
        })
        .catch(error => {
            console.error('Error fetching image names:', error);
        });
  }, []);
  if (imageList.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.rentcargBody}>
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.rentcargDiv}>
          <div className={styles.rentcargDivLeft}>
            <div className={styles.imgContainer}>
            <img
                    src={`/images/${imageList[activeImageIndex]}`}
                    alt={`aaa0${activeImageIndex + 1}`}
                  />
            </div>
            <div className={styles.hoverContainer}>
              {/* 각 이미지에 마우스 오버 이벤트 추가 */}
              {imageList.map((image, index) => (
                    
                    <div
                      key={index}
                      className={
                        index === activeImageIndex ? styles.active : ''
                      } // 'active' 클래스 적용
                      onMouseOver={() => setActiveImageIndex(index)} // 이벤트 처리
                    >
                      <img
                        src={`/images/${image}`}
                      />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.rentcargDivRight}>

            <div className={styles.rentcargHeader}>
              <span className={styles.rentcargName}>숲속 공주 하우스</span>
              <img src="/images/star.png" alt="star" className={styles.starImage} />
              <span className={styles.rentcargRating}>&nbsp;&nbsp;5.0</span>
            </div>

            <hr />
            <br />
            <span className={styles.rentcargAddress}>주소: 서울시 은평구 역촌촌촌</span>
            <br />
            <span className={styles.rentcargPrice}>150,000,000원</span>
   
            <p className={styles.rentcargDescription}>
              잠자는 숲 속의 공주가 자고 있어요 어서 와서 깨워 주세요. 쿨쿨쿨쿨 .... 음냐아아
              놀러가고싶다아아아아아 예쁜 숙소 군요 바베큐 파뤼 하고 싶어요 ~~
            </p>
            <div className={styles.btnGroups}>
              <button type="button" className={styles.addCartBtn}>
                <i className='fas fa-shopping-cart'></i>
                장바구니 추가
              </button>
              <button type="button" className={styles.buyNowBtn}>
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

export default RentcarDetail;
