import React, { useState, useEffect } from 'react';
import styles from './paymentDetail.module.css';
import axios from 'axios';

const RestaurantPaymentDetail = (props) => {
    const restResId = props.restResId;
    const [reservation, setReservation] = useState(null);
    const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }

    useEffect(() => {
        // 예약 정보를 불러오기
        axios.get(`http://localhost:8988/paymentDetail/restaurant?restResId=${restResId}`)
            .then((response) => {
                if (response.data) {
                    setReservation(response.data); // 예약 정보 업데이트
                }
            })
            .catch(error => {
                console.error('예약 정보를 가져오는 중 오류 발생:', error);
            });
    }, [restResId]);

    return (
        <div className={styles.reservationDetail}>
            {reservation ? (
                <>
                    <div className={styles.row}>
                        <span className={styles.label}>예약자명</span>
                        <span className={styles.value}>{reservation.memberName}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>핸드폰번호</span>
                        <span className={styles.value}>{formatPhoneNumber(reservation.phone)}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>식당 이름</span>
                        <span className={styles.value}>{reservation.restName}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>식당 주소</span>
                        <span className={styles.value}>{reservation.restAddress}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>식당 금액</span>
                        <span className={styles.value}>{reservation.restPrice.toLocaleString()}원</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>예약 날짜</span>
                        <span className={styles.value}>{reservation.restResDate}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>인원수</span>
                        <span className={styles.value}>{reservation.restResCapacity}명</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>총 금액</span>
                        <span className={styles.value}>{reservation.restResPrice.toLocaleString()}원</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>예약 상태</span>
                        <span className={styles.value}>{reservation.reservationStatus}</span>
                    </div>

                </>
            ) : (
                <p>예약 정보를 불러오는 중...</p>
            )}
        </div>
    );
};

export default RestaurantPaymentDetail;
