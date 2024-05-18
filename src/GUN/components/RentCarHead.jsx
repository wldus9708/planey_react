import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './PackageHead.module.css';
import axios from "axios";
import RentCarPayment from './RentCarPayment';

const RentCarHead = () => {
    // 이미지 목록을 위한 상태 추가
    const [imageList, setImageList] = useState([
        'images/pack01.png'
    ]);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

      useEffect(() => {
          axios.get("http://localhost:8988/api/images/pakImage")
            .then((response) => {
              setImageList(response.data) // 이미지 목록 상태 업데이트
              setActiveImageIndex(0) // 초기 인덱스 설정 
            })
            .catch(error =>{
              console.error('Error fetching image names:', error)
            });

      }, []); // 빈 종속성 배열로, 한 번만 실행

    // 이미지 목록이 업데이트되었는지 확인 후 렌더링
    if (imageList.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.LodgingBody}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.lodgingDiv}>
                        <div className={styles.lodgingDivLeft}>
                            <div className={styles.imgContainer}>
                                <img
                                    src={`/images/${imageList[activeImageIndex]}`}
                                    alt={`pack0${activeImageIndex + 1}`}
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
                        <div className={styles.lodgingDivRight}>

                            <div className={styles.lodgingHeader}>
                                <span className={styles.lodgingName}>
                                    제목영역
                                </span>
                                <img src="/images/star.png" alt="star" className={styles.starImage} />
                                <span className={styles.lodgingRating}>&nbsp;&nbsp;5.0</span>
                            </div>

                            <hr />
                            <br />
                            <span className={styles.lodgingSchdule}>모델 : </span>
                            <br />
                            <span className={styles.lodgingSchdule}>연식 : </span>
                            <br />
                            <span className={styles.lodgingSchdule}>색상 : </span>
                            <br />
                            <span className={styles.lodgingSchdule}>번호 : </span>
                            <br />
                            <span className={styles.lodgingSchdule}>수용 인원 : </span>
                            <br />
                            <span className={styles.lodgingSchdule}>현재 상태 : </span>
                            <br />
                            <span className={styles.lodgingSchdule}>컨디션 : </span>
                            <br />
                            <span className={styles.lodgingSchdule}>연료 유형 : </span>
                            <br />
                            <span className={styles.lodgingSchdule}>지점 위치 : </span>
                            <br />
                            <span className={styles.lodgingPrice}>n박 당 n원</span>
                            <RentCarPayment></RentCarPayment>

                            <p className={styles.lodgingDescription}>
                                Description 영역
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default RentCarHead;