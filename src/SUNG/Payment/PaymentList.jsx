import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import styles from './PaymentList.module.css';
import RestaurantPaymentTable from './RestaurantPaymentTable';
import LodgingPaymentTable from './LodgingPaymentTable';
import FlightPaymentTable from './FlightPaymentTable';
import CarRentalPaymentTable from './CarRentalPaymentTable';
import PackagePaymentTable from './PackagePaymentTable';
import { useParams } from 'react-router-dom';




function PaymentList(props) {
    const [activeTab, setActiveTab] = useState('package'); // 패키지 탭을 기본으로 설정
    const userInfo = props.userInfo;
    let { lodResId } = useParams(); // URL에서 예약 ID 가져오기

    const handleTabChange = (eventKey) => {
        setActiveTab(eventKey);
    };

    // 각 탭에 맞는 엔드포인트 설정
    const endpoints = {
        package: "http://localhost:8988/paymentList/packageTour",
        lodging: (`http://localhost:8988/paymentList/lodging`),
        restaurant: (`http://localhost:8988/paymentList/restaurant`),
        flight: "http://localhost:8988/paymentList/flight",
        rentcar: "http://localhost:8988/paymentList/rentcar"
    };

     // 선택된 탭에 따라 해당 PaymentTable을 렌더링
     const renderPaymentTable = () => {
        switch(activeTab) {
            case 'package':
                return <PackagePaymentTable endpoint={endpoints.package} />;
            case 'lodging':
                return <LodgingPaymentTable endpoint={endpoints.lodging} />;
            case 'restaurant':
                return <RestaurantPaymentTable endpoint={endpoints.restaurant} />;
            case 'airplane':
                return <FlightPaymentTable endpoint={endpoints.flight} />;
            case 'rentcar':
                return <CarRentalPaymentTable endpoint={endpoints.rentcar} />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.paymentListBody}>
            <h4>{userInfo.nickname}님의 여행 예약 정보</h4>
            <Nav justify variant="tabs" activeKey={activeTab} onSelect={handleTabChange}>
                <Nav.Item>
                    <Nav.Link eventKey="package">패키지</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="lodging">숙소</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="restaurant">식당</Nav.Link>
                  
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="airplane">항공</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="rentcar">렌트카</Nav.Link>
                </Nav.Item>
            </Nav>
            {renderPaymentTable()}
         
        </div>
    );
}

export default PaymentList;
