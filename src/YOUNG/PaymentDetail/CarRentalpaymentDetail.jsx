import React, { useState, useEffect } from 'react';
import styles from './paymentDetail.module.css';
import axios from 'axios';

const CarRentalpaymentDetail = (props) => {
    const rentalId = props.rentalId;
    const [data, setData] = useState(null);
    const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }

    useEffect(() => {
        // 예약 정보를 불러오기
        axios.get(`http://localhost:8988/paymentDetail/rentcar?rentalId=${rentalId}`)
            .then((response) => {
                if (response.data) {
                    setData(response.data); // 예약 정보 업데이트
                }
            })
            .catch(error => {
                console.error('예약 정보를 가져오는 중 오류 발생:', error);
            });
    }, [rentalId]);

    return (
        <div className={styles.reservationDetail}>

            {data ? (
                <>
                    <div className={styles.row}>
                        <span className={styles.label}>예약자명</span>
                        <span className={styles.value}>{data.memberName}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>연락처</span>
                        <span className={styles.value}>{formatPhoneNumber(data.phone)}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>차량 모델</span>
                        <span className={styles.value}>{data.carModel}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>대여 시작일</span>
                        <span className={styles.value}>{data.rentalStartDate}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>대여 종료일</span>
                        <span className={styles.value}>{data.rentalEndDate}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>대여 지점명</span>
                        <span className={styles.value}>{data.locationName}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>대여 지점 주소</span>
                        <span className={styles.value}>{data.locationAddress}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>차량 번호</span>
                        <span className={styles.value}>{data.carLicensePlate}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>대여료</span>
                        <span className={styles.value}>{data.rentalPrice.toLocaleString()}원</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>보험 종류</span>
                        <span className={styles.value}>{data.carInsurance}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>렌트 상태</span>
                        <span className={styles.value}>{data.allProductState}</span>
                    </div>


                </>
            ) : (
                <p>예약 정보를 불러오는 중...</p>
            )}
        </div>
    );
};

export default CarRentalpaymentDetail;
