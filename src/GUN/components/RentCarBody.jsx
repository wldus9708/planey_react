import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './RentCarBody.module.css';
import axios from "axios";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

function RentCarBody() {
    const [car, setCar] = useState(null); // 렌트카 정보 상태
    const { id } = useParams(); // URL에서 렌트카 ID 가져오기

    useEffect(() => {
        axios.get(`http://localhost:8988/car/detail/${id}`)
            .then((response) => {
                if (response.data) {
                    setCar(response.data); // 렌트카 정보 설정
                    console.log(response.data);
                }
            })
            .catch(error => {
                console.error('렌트카 정보를 가져오는 중 오류 발생:', error);
            });
    }, [id]); // id가 변경될 때마다 실행

    return (
        <div className={styles.bodyContainer}>
            <div className={styles.bannerTitle}>지점 정보</div>
            <div className={styles.bodyBanner}>
                <ul>
                    <li className={styles.innerBanner}>지점 : {car && car.location.locationName}</li>
                    <li className={styles.innerBanner}>주소 : {car && car.location.locationAddress}</li>
                    <li className={styles.innerBanner}>전화번호 : {car && car.location.locationPhoneNumber}</li>
                    <li className={styles.innerBanner}>이메일 : {car && car.location.locationEmail}</li>
                </ul>
            </div>
        </div>
    );
}

export default RentCarBody;
