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
            <div className={styles.bodyBanner}>
              
                    <div className={styles.innerBanner}>지점<br/>{car && car.location.locationName}</div><br/>
                    <div className={styles.innerBanner}>주소<br/>{car && car.location.locationAddress}</div><br/>
                    <div className={styles.innerBanner}>전화번호<br/>{car && car.location.locationPhoneNumber}</div><br/>
                    <div className={styles.innerBanner}>이메일<br/>{car && car.location.locationEmail}</div>
            </div>
        </div>
    );
}

export default RentCarBody;
