import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './PackageHead.module.css';
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

const PackageHead = () => {
    const [data, setData] = useState([]);
    const navigator = useNavigate();
    const [cookies] = useCookies('accessToken');
    let { id } = useParams();
    const [packageTour, setPackgeTour] = useState(null);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [paymentInfo, setPaymentInfo] = useState(null);

    // 이미지 목록을 위한 상태 추가
    const [imageList, setImageList] = useState([
        'images/pack01.png'
    ]);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8988/PackageTour/detail/${id}`)
            .then((response) => {
                if (response.data) {
                    setPackgeTour(response.data); // 패키지 정보 설정
                    console.log(response.data);
                }
                setActiveImageIndex(0); // 초기 인덱스 설정
            })
            .catch(error => {
                console.error('이미지 이름을 가져오는 중 오류 발생:', error);
            })

    }, [id]);

    return (
        <div className={styles.LodgingBody}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.lodgingDiv}>
                        <div className={styles.lodgingDivLeft}>
                            <div className={styles.imgContainer}>
                                <img
                                    src={`/images/${packageTour && packageTour[`packImage0${activeImageIndex + 1}`]}`}
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
                                    {packageTour && packageTour.tour_pack_name}
                                </span>
                                <img src="/images/star.png" alt="star" className={styles.starImage} />
                                <span className={styles.lodgingRating}>&nbsp;&nbsp;5.0</span>
                            </div>

                            <hr />
                            <br />
                            <span className={styles.lodgingAddress}>목적지 : {packageTour && packageTour.tourPackCity} </span>
                            <br />
                            <span className={styles.lodgingSchdule}>여행일정 : &nbsp; {packageTour && packageTour.tourPackEndDate} ~ {packageTour && packageTour.tourPackStartDate} </span>
                            <br />
                            <span className={styles.lodgingPrice}> {packageTour && packageTour.price.toLocaleString()}원</span>

                            <p className={styles.lodgingDescription}>
                            {packageTour && packageTour.tour_pack_description}
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