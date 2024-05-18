import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import styles from './PaymentList.module.css';
import Package from './PackPayList';
import Rentcar from './RentPayList';
import Restaurant from './RestPayList';
import Lodging from './LodPayList';
import Airplane from './AirPayList';

function JustifiedExample() {
    const [activeTab, setActiveTab] = useState('package'); // 패키지 탭을 기본으로 설정

    const handleTabChange = (eventKey) => {
        setActiveTab(eventKey);
    };

    return (
        <div className={styles.paymentListBody}>
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
            {activeTab === 'package' && <Package />}
            {activeTab === 'lodging' && <Lodging />}
            {activeTab === 'restaurant' && <Restaurant />}
            {activeTab === 'airplane' && <Airplane />}
            {activeTab === 'rentcar' && <Rentcar />}
        </div>
    );
}

export default JustifiedExample;
