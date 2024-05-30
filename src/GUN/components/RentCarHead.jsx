import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './RentCarHead.module.css';
import axios from "axios";
import RentCarPayment from './RentCarPayment';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import NavBar from "../../CKH/Components/Navbar/Navbar"


const RentCarHead = () => {
    const [data, setData] = useState([]);
    const navigator = useNavigate();
    const [cookies] = useCookies('accessToken');
    let { id } = useParams();
    const [car, setCar] = useState(null);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [paymentInfo, setPaymentInfo] = useState(null);

     // Enum 클래스 정의
     const FuelType = car && car.carFuelType;
     let fuelLabel;
     
     if (FuelType === 'GASOLINE') {
         fuelLabel = '휘발유';
     } else if (FuelType === 'DIESEL') {
         fuelLabel = '경유';
     } else if (FuelType === 'HYBRID') {
         fuelLabel = '하이브리드';
     } else if (FuelType === 'ELECTRIC') {
         fuelLabel = '전기';
     } else {
         fuelLabel = '수소';
     }

     const CapacityType = car && car.carCapacity;
     let capacityLabel;
     
     if (CapacityType === 'TWO_SEATER') {
         capacityLabel = '2인승';
     } else if (CapacityType === 'FOUR_SEATER') {
         capacityLabel = '4인승';
     } else if (CapacityType === 'FIVE_SEATER') {
         capacityLabel = '5인승';
     } else if (CapacityType === '7인승') {
         capacityLabel = '9인승';
     } else {
         capacityLabel = '12인승';
     }

    useEffect(() => {
        axios.get(`http://localhost:8988/car/detail/${id}`)
            .then((response) => {
                if (response.data) {
                    setCar(response.data); // 차 정보 설정
                    console.log(response.data);
                }
                setActiveImageIndex(0); // 초기 인덱스 설정
            })
            .catch(error => {
                console.error('이미지 이름을 가져오는 중 오류 발생:', error);
            })

    }, [id]);

    const handlePaymentInfo = (info) => {
        setPaymentInfo(info);
    }

    return (
        <div className={styles.LodgingBody}>
            <div style={{ padding: '1rem', marginRight: '10rem' }}>
                <NavBar />
            </div>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.lodgingDiv}>
                        <div className={styles.lodgingDivLeft}>
                            <div className={styles.imgContainer}>
                                <img
                                    src={`/images/${car && car[`carImage0${activeImageIndex + 1}`]}`}
                                    alt={`car0${activeImageIndex + 1}`}
                                />
                            </div>
                            <div className={styles.rentDetailhoverContainer}>
                                {[1, 2, 3, 4, 5].map(index => (
                                    <div
                                        key={index}
                                        className={styles.rentDetailactive}
                                        onMouseOver={() => setActiveImageIndex(index - 1)}
                                    >
                                        <img
                                            src={`/images/${car && car[`carImage0${index}`]}`}
                                            alt={`images${index}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.lodgingDivRight}>
                            <div className={styles.lodgingHeader}>
                                <span className={styles.lodgingName}>
                                    {car && car.carModel}
                                </span>
                                <img src="/images/star.png" alt="star" className={styles.starImage} />
                                <span className={styles.lodgingRating}>&nbsp;&nbsp;5.0</span>
                            </div>
                            <hr />
                            <br />
                            <br />
                            <span className={styles.lodgingSchdule}>연식 : {car && car.carYear}년 형</span>
                            <br />
                            <span className={styles.lodgingSchdule}>색상 : {car && car.carColor}</span>
                            <br />
                            <span className={styles.lodgingSchdule}>번호 : {car && car.carLicensePlate}</span>
                            <br />
                            <span className={styles.lodgingSchdule}>수용 인원 : {capacityLabel}</span>
                            <br />
                            <span className={styles.lodgingSchdule}>연료 유형 : {fuelLabel}</span>
                            <br />
                            <span className={styles.lodgingSchdule}>지점 위치 : {car && car.carLocation}점</span>
                            <br />
                            <span className={styles.lodgingSchdule}>변속기 : {FuelType === 'manual' ? '수동' : '자동'}</span>
                            <br />
                            <span className={styles.lodgingPrice}>렌트비 : {car && car.carRentalPrice}</span>
                            <RentCarPayment carId={id} car={car} onPaymentInfo={handlePaymentInfo} setCar={setCar}/>
                            <p className={styles.lodgingDescription}>
                                {car && car.carComment}
                            </p>
                            <h3>총 가격 : {paymentInfo && paymentInfo.totalPrice} 원</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RentCarHead;
