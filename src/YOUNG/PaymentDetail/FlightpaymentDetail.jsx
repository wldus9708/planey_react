import React, { useState, useEffect } from 'react';
import styles from './paymentDetail.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PaymentDetailRestaurant = () => {
    // let { restId } = useParams(); // URL에서 예약 ID 가져오기
    // const [reservation, setReservation] = useState(null);

    // useEffect(() => {
    //     // 예약 정보를 불러오기
    //     axios.get(`http://localhost:8988/airport/detail/${restId}`)
    //         .then((response) => {
    //             if (response.data) {
    //                 setReservation(response.data); // 예약 정보 업데이트
    //             }
    //         })
    //         .catch(error => {
    //             console.error('예약 정보를 가져오는 중 오류 발생:', error);
    //         });
    // }, [restId]);

    return (
        <div className={styles.reservationDetail}>
            {/* 스프링 연결시 주석 모두 풀기  */}
            {/* {reservation ? ( */}
              
                    <div className={styles.row}>
                        <span className={styles.label}>예약자명</span>
                        {/* <span className={styles.value}>{reservation.reserverName}</span> */}
                        <span className={styles.value}>김윤영</span>

                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>핸드폰번호</span>
                        {/* <span className={styles.value}>{reservation.phoneNumber}</span> */}
                        <span className={styles.value}>010-8830-5933</span>

                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>항공사</span>
                        {/* <span className={styles.value}>{reservation.fli_brand}</span> */}
                        <span className={styles.value}>제주항공</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>출발일</span>
                        {/* <span className={styles.value}>{reservation.fli_departure_date}</span> */}
                        <span className={styles.value}>2024-05-20</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>종료일</span>
                        {/* <span className={styles.value}>{reservation.fli_arrival_date}</span> */}
                        <span className={styles.value}>2024-05-30</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>출발지</span>
                        {/* <span className={styles.value}>{reservation.fli_departure_place}</span> */}
                        <span className={styles.value}>김포공항</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>도착지</span>
                        {/* <span className={styles.value}>{reservation.fli_arrival_place}</span> */}
                        <span className={styles.value}>제주국제공항</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>출발시간</span>
                        {/* <span className={styles.value}>{reservation.fli_departure_time}</span> */}
                        <span className={styles.value}>17:00</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>도착시간</span>
                        {/* <span className={styles.value}>{reservation.}</span> */}
                        <span className={styles.value}>17:30</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>총 비행시간</span>
                        {/* <span className={styles.value}>{reservation.fli_arrival_time}</span> */}
                        <span className={styles.value}>30분</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>좌석</span>
                        {/* <span className={styles.value}>{reservation.reservationStatus/span> */}
                        <span className={styles.value}>45A</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>금액</span>
                        {/* <span className={styles.value}>{reservation.reservationStatus/span> */}
                        <span className={styles.value}>150,000</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>이용상태</span>
                        {/* <span className={styles.value}>{reservation.reservationStatus/span> */}
                        <span className={styles.value}>결제 완료</span>
                    </div>
               
            {/* ) : (
                <p>예약 정보를 불러오는 중...</p>
            )} */}
        </div>
    );
};

export default PaymentDetailRestaurant;
