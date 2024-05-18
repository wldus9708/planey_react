import React, { useState, useEffect } from 'react';
import styles from './paymentDetail.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PaymentDetail = () => {
    // let { reservationId } = useParams(); // URL에서 예약 ID 가져오기
    // const [reservation, setReservation] = useState(null);

    // useEffect(() => {
    //     // 예약 정보를 불러오기
    //     axios.get(`http://localhost:8988/reservation/detail/${reservationId}`)
    //         .then((response) => {
    //             if (response.data) {
    //                 setReservation(response.data); // 예약 정보 업데이트
    //             }
    //         })
    //         .catch(error => {
    //             console.error('예약 정보를 가져오는 중 오류 발생:', error);
    //         });
    // }, [reservationId]);

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
                        <span className={styles.label}>숙소 이름</span>
                        {/* <span className={styles.value}>{reservation.lodgingName}</span> */}
                        <span className={styles.value}>숲속 공주 펜션</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>숙소 주소</span>
                        {/* <span className={styles.value}>{reservation.lodgingAddress}</span> */}
                        <span className={styles.value}>서울시 은평구 녹번동 999-999</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>상세 주소</span>
                        {/* <span className={styles.value}>{reservation.lodgingAddressDetail}</span> */}
                        <span className={styles.value}>111동 111호</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>숙소 금액</span>
                        {/* <span className={styles.value}>{reservation.lodgingPrice.toLocaleString()}원</span> */}
                        <span className={styles.value}>150,000원</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>예약 날짜</span>
                        {/* <span className={styles.value}>{reservation.reservationDate}</span> */}
                        <span className={styles.value}>2024.05.18~2024.05.25</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>인원수</span>
                        {/* <span className={styles.value}>{reservation.numberOfPeople}</span> */}
                        <span className={styles.value}>성인 7명</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>총 금액</span>
                        {/* <span className={styles.value}>{reservation.totalPrice.toLocaleString()}원</span> */}
                        <span className={styles.value}>1050,000원</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>예약 상태</span>
                        {/* <span className={styles.value}>{reservation.totalPrice.toLocaleString()}원</span> */}
                        <span className={styles.value}>결제 완료</span>
                    </div>
               
            {/* ) : (
                <p>예약 정보를 불러오는 중...</p>
            )} */}
        </div>
    );
};

export default PaymentDetail;
