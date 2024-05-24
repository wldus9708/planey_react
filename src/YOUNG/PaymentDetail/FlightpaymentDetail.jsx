import React, { useState, useEffect } from 'react';
import styles from './paymentDetail.module.css';
import axios from 'axios';

const PaymentDetailRestaurant = (props) => {
    const fliResId = props.fliResId;
    const [reservation, setReservation] = useState(null);
    const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }

    useEffect(() => {
        axios.get(`http://localhost:8988/paymentDetail/flight?fliResId=${fliResId}`)
            .then((response) => {
                if (response.data) {
                    setReservation(response.data); // 예약 정보 업데이트
                }
            })
            .catch(error => {
                console.error('예약 정보를 가져오는 중 오류 발생:', error);
            });
    }, [fliResId]);

    return (
        <div className={styles.reservationDetail}>

            {reservation ? (
                <>
                    <div className={styles.row}>
                        <span className={styles.label}>예약자명</span>
                        <span className={styles.value}>{reservation.memberName}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>연락처</span>
                        <span className={styles.value}>{formatPhoneNumber(reservation.phone)}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>항공사</span>
                        <span className={styles.value}>{reservation.flightBrand}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>출발일</span>
                        <span className={styles.value}>{reservation.fliDepartureDate}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>종료일</span>
                        <span className={styles.value}>{reservation.fliArrivalDate}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>출발지</span>
                        <span className={styles.value}>{reservation.fliDeparturePlace}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>도착지</span>
                        <span className={styles.value}>{reservation.fliArrivalPlace}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>출발시간</span>
                        <span className={styles.value}>{reservation.fliDepartureTime}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>도착시간</span>
                        <span className={styles.value}>{reservation.fliArrivalTime}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>총 비행시간</span>
                        <span className={styles.value}>{reservation.fliTotalTime}분</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>좌석</span>
                        <span className={styles.value}>{reservation.seatNo}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>금액</span>
                        <span className={styles.value}>{reservation.fliPrice.toLocaleString()}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>인원수</span>
                        <span className={styles.value}>{reservation.fliResCapacity}명</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>총금액</span>
                        <span className={styles.value}>{reservation.fliResPrice.toLocaleString()}원</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>이용상태</span>
                        <span className={styles.value}>{reservation.allProductState}</span>
                    </div>

                </>

            ) : (
                <p>예약 정보를 불러오는 중...</p>
            )}
        </div>
    );
};

export default PaymentDetailRestaurant;
