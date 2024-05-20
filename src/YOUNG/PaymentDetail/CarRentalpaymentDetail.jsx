import React, { useState, useEffect } from 'react';
import styles from './paymentDetail.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CarRentalpaymentDetail = () => {
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
                        <span className={styles.value}>이은덕</span>

                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>핸드폰번호</span>
                        {/* <span className={styles.value}>{reservation.phoneNumber}</span> */}
                        <span className={styles.value}>010-8830-5933</span>

                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>차량 모델</span>
                        {/* <span className={styles.value}>{reservation.fli_brand}</span> */}
                        <span className={styles.value}>공차</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>대여 시작일</span>
                        {/* <span className={styles.value}>{reservation.fli_departure_date}</span> */}
                        <span className={styles.value}>2024-05-20</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>대여 종료일</span>
                        {/* <span className={styles.value}>{reservation.fli_arrival_date}</span> */}
                        <span className={styles.value}>2024-05-30</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>차량 대여 지점명</span>
                        {/* <span className={styles.value}>{reservation.fli_departure_place}</span> */}
                        <span className={styles.value}>제주렌트카</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>차량 대여 지점 주소</span>
                        {/* <span className={styles.value}>{reservation.fli_departure_place}</span> */}
                        <span className={styles.value}>서울특별시 마포구 노고산동 1-3번지</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>번호판</span>
                        {/* <span className={styles.value}>{reservation.fli_arrival_place}</span> */}
                        <span className={styles.value}>123허4567</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>보험 종류</span>
                        {/* <span className={styles.value}>{reservation.fli_departure_time}</span> */}
                        <span className={styles.value}>일반자동차보험</span>
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

export default CarRentalpaymentDetail;
