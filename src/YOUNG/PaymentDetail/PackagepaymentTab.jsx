import React, { useState, useEffect } from 'react';
import styles from './paymentDetail.module.css';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';

const PackagepaymentTab = (props) => {
    const packResId = props.packResId;
    console.log(packResId)
    const [reservation, setReservation] = useState(null); // 초기 값을 null로 설정
    const [activeTab, setActiveTab] = useState('package'); // 현재 활성화된 탭 상태

    const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber ? phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') : '';
    }

    useEffect(() => {
        // 예약 정보를 불러오기
        axios.get(`http://localhost:8988/paymentDetail/packageTour?packResId=${packResId}`)
            .then((response) => {
                if (response.data) {
                    console.log(response.data)
                    setReservation(response.data); // 예약 정보 업데이트
                }
            })
            .catch(error => {
                console.error('예약 정보를 가져오는 중 오류 발생:', error);
            });
    }, [packResId]);

    if (!reservation) {
        return <div>Loading...</div>; // 예약 정보가 없을 때 로딩 표시
    }

    return (
        <div className={styles.paymentListBody}>
            <div className={styles.reservationDetail}>
                <Nav justify variant="tabs" className={styles.navList} activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
                    <Nav.Item>
                        <Nav.Link eventKey="package">예약자</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="lodging">숙소</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="restaurant">식당</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="flight">항공</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="rentcar">렌트카</Nav.Link>
                    </Nav.Item>
                </Nav>

                {activeTab === 'package' && (
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
                            <span className={styles.label}>패키지명</span>
                            <span className={styles.value}>{reservation.tour_pack_name}</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>명소</span>
                            <span className={styles.value}>{reservation.attraction}</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>출발일</span>
                            <span className={styles.value}>{reservation.tour_pack_startdate}</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>종료일</span>
                            <span className={styles.value}>{reservation.tour_pack_enddate}</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>금액</span>
                            <span className={styles.value}>{reservation.price.toLocaleString()}</span>
                        </div>


                    </>
                )}

                {activeTab === 'lodging' && (
                    <>
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
                            <span className={styles.label}>체크인</span>
                            <span className={styles.value}>{reservation.lodArrivalDate}</span>
                        </div>

                        <div className={styles.row}>
                            <span className={styles.label}>체크아웃</span>
                            <span className={styles.value}>{reservation.lodDepartureDate}</span>
                        </div>

                        <div className={styles.row}>
                            <span className={styles.label}>인원수</span>
                            <span className={styles.value}>{reservation.lodResCapacity}</span>
                        </div>

                        <div className={styles.row}>
                            <span className={styles.label}>총 금액</span>
                            <span className={styles.value}>{reservation.lodResPrice.toLocaleString()}원</span>
                        </div>

                    </>
                )}

                {activeTab === 'restaurant' && (
                    <>
                        <div className={styles.row}>
                            <span className={styles.label}>식당 이름</span>
                            <span className={styles.value}>{reservation.restaurantName}</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>식당 주소</span>
                            <span className={styles.value}>{reservation.restAddress}</span>
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
                            <span className={styles.value}>{reservation.restPrice.toLocaleString()}원</span>
                        </div>


                    </>
                )}

                {activeTab === 'flight' && (
                    <>
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
                            <span className={styles.label}>인원수</span>
                            <span className={styles.value}>{reservation.fliResCapacity}명</span>
                        </div>

                        <div className={styles.row}>
                            <span className={styles.label}>총금액</span>
                            <span className={styles.value}>{reservation.fliResPrice.toLocaleString()}원</span>
                        </div>
                    </>
                )}

                {activeTab === 'rentcar' && (
                    <>
                        <div className={styles.row}>
                        <span className={styles.label}>차량 모델</span>
                        <span className={styles.value}>{reservation.carModel}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>대여 시작일</span>
                        <span className={styles.value}>{reservation.rentalStartDate}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>대여 종료일</span>
                        <span className={styles.value}>{reservation.rentalEndDate}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>대여 지점명</span>
                        <span className={styles.value}>{reservation.locationName}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>대여 지점 주소</span>
                        <span className={styles.value}>{reservation.locationAddress}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>차량 번호</span>
                        <span className={styles.value}>{reservation.carLicensePlate}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>대여료</span>
                        <span className={styles.value}>{reservation.rentalPrice.toLocaleString()}원</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>보험 종류</span>
                        <span className={styles.value}>{reservation.carInsurance}</span>
                    </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PackagepaymentTab;
