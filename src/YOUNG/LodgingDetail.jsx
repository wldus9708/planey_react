import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './LodgingDetail.module.css';

const LodgingDetail = () => {
  // 이미지 목록 및 활성화된 이미지 인덱스를 추적하는 상태
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const hoverImages = [
    '/images/lodging01.png',
    '/images/lodging02.png',
    '/images/lodging03.png',
    '/images/lodging04.png',
    '/images/lodging05.png',
  ];

  const handleMouseOver = (index) => {
    // 마우스 오버 이벤트 처리
    setActiveImageIndex(index); // 활성화된 이미지 인덱스 설정
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 초기 활성화된 이미지 설정
    setActiveImageIndex(0);
  }, []); // 빈 종속성 배열로, 한 번만 실행

  return (
    <div className={styles.LodgingBody}>
      <div>
        <header>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Lodging Detail</title>

        </header>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.lodgingDiv}>
              <div className={styles.lodgingDivLeft}>
                <div className={styles.imgContainer}>
                  <img
                    src={hoverImages[activeImageIndex]}
                    alt={`Lodging0${activeImageIndex + 1}`}
                  />
                </div>
                <div className={styles.hoverContainer}>
                  {/* 각 이미지에 마우스 오버 이벤트 추가 */}
                  {hoverImages.map((image, index) => (
                    <div
                      key={index}
                      className={
                        index === activeImageIndex ? styles.active : ''
                      } // 'active' 클래스 적용
                      onMouseOver={() => handleMouseOver(index)} // 이벤트 처리
                    >
                      <img
                        src={image}
                        alt={`Lodging0${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.lodgingDivRight}>

                <div className={styles.lodgingHeader}>
                  <span className={styles.lodgingName}>숲속 공주 하우스</span>
                  <img src="/images/star.png" alt="star" className={styles.starImage} />
                  <span className={styles.lodgingRating}>&nbsp;&nbsp;5.0</span>
                </div>

                <hr />
                <br />
                <span className={styles.lodgingAddress}>주소: 서울시 은평구 역촌촌촌</span>
                <br />
                <span className={styles.lodgingPrice}>150,000,000원</span>
       
                <p className={styles.lodgingDescription}>
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
    </div>

  );
};

export default LodgingDetail;