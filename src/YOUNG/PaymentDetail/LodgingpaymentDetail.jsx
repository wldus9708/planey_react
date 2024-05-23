import React, { useState, useEffect } from 'react';
import styles from './paymentDetail.module.css';
import axios from 'axios';

const LodgingPaymentDetail = (props) => {
    const lodResId = props.lodResId;
    const [reservation, setReservation] = useState(null);
    const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }

    useEffect(() => {
        // 예약 정보를 불러오기
        axios.get(`http://localhost:8988/paymentDetail/lodging?lodResId=${lodResId}`)
            .then((response) => {
                if (response.data) {
                    setReservation(response.data); // 예약 정보 업데이트
                }
            })
            .catch(error => {
                console.error('예약 정보를 가져오는 중 오류 발생:', error);
            });
    }, [lodResId]);


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
                        <span className={styles.label}>숙소 이름</span>
                        <span className={styles.value}>{reservation.lodName}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>숙소 주소</span>
                        <span className={styles.value}>{reservation.lodAddress}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>상세 주소</span>
                        <span className={styles.value}>{reservation.lodAddressDetail}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>숙소 금액</span>
                        <span className={styles.value}>{reservation.lodPrice.toLocaleString()}원</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>체크인</span>
                        <span className={styles.value}>{reservation.lodDepartureDate}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>체크아웃</span>
                        <span className={styles.value}>{reservation.lodArrivalDate}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>인원수</span>
                        <span className={styles.value}>{reservation.lodResCapacity}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>총 금액</span>
                        <span className={styles.value}>{reservation.lodResPrice.toLocaleString()}원</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>예약 상태</span>
                        <span className={styles.value}>{reservation.lodResState}</span>
                    </div>

                </>

            ) : (
                <p>예약 정보를 불러오는 중...</p>
            )}
        </div>

    );
};

export default LodgingPaymentDetail;