import React, { useState, useEffect } from 'react';
import styles from './paymentDetail.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PaymentDetailLodging = () => {
    let { lod_id } = useParams(); // URL에서 예약 ID 가져오기
    const [reservation, setReservation] = useState(true);

    useEffect(() => {
        // 예약 정보를 불러오기
        axios.get(`http://localhost:8988/lodgingPayments/detail/${lod_id}`)
            .then((response) => {
                if (response.data) {
                    setReservation(response.data); // 예약 정보 업데이트
                }
            })
            .catch(error => {
                console.error('예약 정보를 가져오는 중 오류 발생:', error);
            });
    }, [lod_id]);

    return (
        <div className={styles.reservationDetail}>
         
            {reservation ? (
              <>
                    {/* <div className={styles.row}>
                        <span className={styles.label}>예약자명</span>
                        <span className={styles.value}>{reservation.reserverName}</span>
                      

                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>핸드폰번호</span>
                        <span className={styles.value}>{reservation.phoneNumber}</span>
                        

                    </div> */}
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
                        <span className={styles.value}>{reservation.lodPrice}원</span>
                       
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
                        <span className={styles.value}>{reservation.lodResPrice}원</span>
                 
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

export default PaymentDetailLodging;
