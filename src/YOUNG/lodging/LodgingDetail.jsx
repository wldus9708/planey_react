import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './LodgingDetail.module.css';
import axios from "axios";
import LodgingPayment from "./LodingPayment";
import { useParams } from "react-router-dom";


const LodgingDetail = () => {
  let { id } = useParams(); // URL에서 숙소 ID 가져오기
  const [lodging, setLodging] = useState(null);
  // 이미지 목록을 위한 상태 추가
  const [activeImageIndex, setActiveImageIndex] = useState(0);


  // 스프링 연결 
  useEffect(() => {
    axios.get(`http://localhost:8988/lodging/detail/${id}`)
    .then((response) => {
      if (response.data) {
        setLodging(response.data); // 숙소 정보 업데이트
        console.log(response.data);
      }
      setActiveImageIndex(1); // 초기 인덱스 설정
    })
    .catch(error => {
      console.error('이미지 이름을 가져오는 중 오류 발생:', error);
    });

  }, [id]);

  return (

    <div className={styles.LodgingBody}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.lodgingDiv}>
            <div className={styles.lodgingDivLeft}>
              <div className={styles.imgContainer}>
   
              <img
                  src={`/images/${lodging && lodging[`lodImage0${activeImageIndex + 1}`]}`}
                  alt={`이미지 등록중..`}
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
                      alt={`이미지 등록중..`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.lodgingDivRight}>
            <div  className={styles.starImage}>
                <img src="/images/star.png" alt="star"/> &nbsp;&nbsp;&nbsp;5.0
                </div>
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
              <span className={styles.lodgingPrice}>{lodging && lodging.lodPrice.toLocaleString()}원</span>

              <p className={styles.lodgingDescription}>
              {lodging && lodging.lodDescription}
              </p>
              <span className={styles.alreadyReservation}>
                  🔘  표시된 해당 날짜는 이미 예약이 완료되었습니다. 
                </span>
                <div>
              <LodgingPayment/>
              </div>
            
            </div>

          </div>
        </div>
      </div>
    </div>


  );
};

export default LodgingDetail;