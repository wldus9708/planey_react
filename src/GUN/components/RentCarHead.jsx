import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './PackageHead.module.css';
import axios from "axios";
import RentCarPayment from './RentCarPayment';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";


const RentCarHead = () => {
    const [data, setData] = useState([]);
    const navigator = useNavigate();
    const [cookies] = useCookies('accessToken');
    let { id } = useParams(); 
    const [car, setCar] = useState(null); 
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);



    useEffect(() => {
        // console.log("accessToken :" + cookies.accessToken);
        // if (cookies.accessToken) {
        //     axios.get('http://localhost:8988/member/detailPage', {
        //         headers: {
        //             Authorization: `${cookies.accessToken}`,
        //         },
        //     })
        //         .then((response) => {
        //             if (response.data) {
        //                 setUser(response.data);
        //             }
        //             console.log(response.data);
        //         })

        //         .catch(error => {
        //          console.error('사용자 정보 가져오는 중 오류 발생:', error);
        //         });
        // } else if (!cookies.accessToken) {
        //     navigator('/login');
        //     alert("결제 전에 로그인을 해주세요.");
        // }

        axios.get(`http://localhost:8988/car/detail/${id}`)
            .then((response) => {
                if (response.data) {
                    setCar(response.data); // 차 정보 설정
                    console.log(response.data);
                }
                setActiveImageIndex(1); // 초기 인덱스 설정
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
                                    src={`/images/${car && car[`carImage0${activeImageIndex + 1}`]}`}
                                    alt={`car0${activeImageIndex + 1}`}
                                />
                            </div>
                            <div className={styles.restDetailhoverContainer}>
                                {[1, 2, 3, 4, 5].map(index => (
                                    <div
                                        key={index}
                                        className={styles.restDetailactive}
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
                            <span className={styles.lodgingSchdule}>수용 인원 : {car && car.carCapacity}</span>
                            <br />
                            <span className={styles.lodgingSchdule}>연료 유형 : {car && car.carFuelType}</span>
                            <br />
                            <span className={styles.lodgingSchdule}>지점 위치 : {car && car.carLocation}점</span>
                            <br />
                            <span className={styles.lodgingSchdule}>변속기 : {car && car.carTransmission}</span>
                            <br />
                            <span className={styles.lodgingPrice}>렌트비(1박) : {car && car.carRentalPrice}</span>
                            <RentCarPayment></RentCarPayment>

                            <p className={styles.lodgingDescription}>
                            {car && car.carComment}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default RentCarHead;