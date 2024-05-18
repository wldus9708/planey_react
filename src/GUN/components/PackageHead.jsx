import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './PackageHead.module.css';
import axios from "axios";

const PackageHead = () => {
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
                            <span className={styles.lodgingAddress}>목적지 : </span>
                            <br />
                            <span className={styles.lodgingSchdule}>여행일정 : </span>
                            <br />
                            <span className={styles.lodgingPrice}> 원</span>

                            <p className={styles.lodgingDescription}>
                                Description 영역
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

export default PackageHead;