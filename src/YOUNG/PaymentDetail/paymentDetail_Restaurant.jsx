import React, { useState, useEffect } from 'react';
import styles from './paymentDetail.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PaymentDetailRestaurant = () => {
    // let { restId } = useParams(); // URL에서 예약 ID 가져오기
    // const [reservation, setReservation] = useState(null);

    // useEffect(() => {
    //     // 예약 정보를 불러오기
    //     axios.get(`http://localhost:8988/restaurant/detail/${restId}`)
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
                        <span className={styles.label}>식당 이름</span>
                        {/* <span className={styles.value}>{reservation.restName}</span> */}
                        <span className={styles.value}>냠냠식당</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>식당 주소</span>
                        {/* <span className={styles.value}>{reservation.restAddress}</span> */}
                        <span className={styles.value}>서울시 마포구 아이씨티동</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>식당 금액</span>
                        {/* <span className={styles.value}>{reservation.restPrice.toLocaleString()}원</span> */}
                        <span className={styles.value}>15,000원</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>예약 날짜</span>
                        {/* <span className={styles.value}>{reservation.restResDate}</span> */}
                        <span className={styles.value}>2024.05.18</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>인원수</span>
                        {/* <span className={styles.value}>{reservation.restResCapacity}</span> */}
                        <span className={styles.value}>성인 7명</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>총 금액</span>
                        {/* <span className={styles.value}>{reservation.restResPrice.toLocaleString()}원</span> */}
                        <span className={styles.value}>105,000원</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>예약 상태</span>
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
