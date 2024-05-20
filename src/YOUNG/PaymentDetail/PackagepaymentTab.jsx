import React, { useState, useEffect } from 'react';
import styles from './paymentDetail.module.css';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PackagepaymentTab = () => {
    let { restId } = useParams();
    const [reservation, setReservation] = useState('package');

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
        <div className={styles.paymentListBody}>
            <div className={styles.reservationDetail}>
                <Nav justify variant="tabs" className={styles.navList}>
                    <Nav.Item>
                        <Nav.Link eventKey="package" onClick={() => { setReservation("package") }}>예약자</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="lodging" onClick={() => { setReservation("lodging") }}>숙소</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="restaurant" onClick={() => { setReservation("restaurant") }}>식당</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="flight" onClick={() => { setReservation("flight") }}>항공</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="rentcar" onClick={() => { setReservation("rentcar") }}>렌트카</Nav.Link>
                    </Nav.Item>
                </Nav>

                {reservation === 'package' && (
                    <>
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
                            <span className={styles.label}>예약 상태</span>
                            {/* <span className={styles.value}>{reservation.totalPrice.toLocaleString()}원</span> */}
                            <span className={styles.value}>결제 완료</span>
                        </div>
                    </>
                )}

                {reservation === 'lodging' && (
                    <>
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
                            <span className={styles.label}>예약 날짜</span>
                            {/* <span className={styles.value}>{reservation.reservationDate}</span> */}
                            <span className={styles.value}>2024.05.18~2024.05.25</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>인원수</span>
                            {/* <span className={styles.value}>{reservation.numberOfPeople}</span> */}
                            <span className={styles.value}>성인 7명</span>
                        </div>

                    </>
                )}

                {reservation === 'restaurant' && (
                    <>
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
                    </>

                )}
                {reservation === 'flight' && (
                    <>
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
                    </>

                )}
                {reservation === 'rentcar' && (
                    <>
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
                    </>
                )}



            </div>
        </div>
    );
};

export default PackagepaymentTab;
