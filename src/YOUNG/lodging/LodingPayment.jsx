import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './LodingPayment.module.css';
import stylesBtn from "./LodgingDetail.module.css"

const LodingPayment = ({ reservations }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const handleAdultsChange = (increment) => {
        setAdults(prev => Math.max(1, prev + increment));
    };

    const handleChildrenChange = (increment) => {
        setChildren(prev => Math.max(0, prev + increment));
    };

    // 예약된 날짜 범위 계산
    const getHighlightedDates = () => {
        const highlightedDates = [];
        reservations.forEach(reservation => {
            const start = new Date(reservation.lodDepartureDate);
            const end = new Date(reservation.lodArrivalDate);
            for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
                highlightedDates.push(new Date(d));
            }
        });
        return highlightedDates;
    };

    const highlightDates = [
        {
            "react-datepicker__day--highlighted-custom-1": getHighlightedDates()
        }
    ];

    return (
        <div className={styles.modal}>
            <div className={styles.datePicker}>
                <label>시작 날짜: </label>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="날짜를 선택하세요"
                    className={styles.dateInput}
                    minDate={new Date()} // 시작 날짜 이후로만 선택 가능
                    highlightDates={highlightDates}
                />
            </div>
            <div className={styles.datePicker}>
                <label>종료 날짜: </label>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="날짜를 선택하세요"
                    className={styles.dateInput}
                    minDate={startDate} // 시작 날짜 이후로만 선택 가능
                    highlightDates={highlightDates}
                />
            </div>
            <div className={styles.counter}>
                <label>성인: </label>
                <button onClick={() => handleAdultsChange(-1)}>-</button>
                <span>{adults}</span>
                <button onClick={() => handleAdultsChange(1)}>+</button>
     
                <label>어린이: </label>
                <button onClick={() => handleChildrenChange(-1)}>-</button>
                <span>{children}</span>
                <button onClick={() => handleChildrenChange(1)}>+</button>
            </div>
            <div className={stylesBtn.btnGroups}>
                <button type="button" className={stylesBtn.addCartBtn}>
                  <i className='fas fa-shopping-cart'></i>
                  장바구니 추가
                </button>
                <button type="button" className={stylesBtn.buyNowBtn}>
                  <i className='fas fa-wallet'></i>
                  예약 하러 가기
                </button>
            </div>
        </div>
    );
};

export default LodingPayment;