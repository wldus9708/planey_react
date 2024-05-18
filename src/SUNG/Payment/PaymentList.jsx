import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import styles from './PaymentList.module.css';
import PaymentTable from './PaymentTable';

function PaymentList() {
    const [activeTab, setActiveTab] = useState('package'); // 패키지 탭을 기본으로 설정

    const handleTabChange = (eventKey) => {
        setActiveTab(eventKey);
    };

    // 각 탭에 맞는 엔드포인트 설정
    const endpoints = {
        package: "http://localhost:8988/paymentList/packages",
        lodging: "http://localhost:8988/paymentList/lodgings",
        restaurant: "http://localhost:8988/admin/members",
        airplane: "http://localhost:8988/paymentList/airplanes",
        rentcar: "http://localhost:8988/paymentList/rentcars"
    };

    return (
        <div className={styles.paymentListBody}>
            <h1>결제 내역</h1>
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
            <PaymentTable endpoint={endpoints[activeTab]} />
        </div>
    );
}

export default PaymentList;
