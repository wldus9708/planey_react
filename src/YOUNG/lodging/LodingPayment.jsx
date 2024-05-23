import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './LodingPayment.module.css';
import stylesBtn from "./LodgingDetail.module.css"

const LodingPayment = ({ reservations, updateTotalPrice }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const handleAdultsChange = (increment) => {
        setAdults(prev => {
            const newAdults = Math.max(1, prev + increment);
            updateTotalPrice(newAdults, children);
            return newAdults;
        });
    };

    const handleChildrenChange = (increment) => {
        setChildren(prev => {
            const newChildren = Math.max(0, prev + increment);
            updateTotalPrice(adults, newChildren);
            return newChildren;
        });
    };

    // 예약된 날짜 범위 계산
    const getExcludedDates = () => {
        const excludedDates = [];
        reservations.forEach(reservation => {
            const start = new Date(reservation.lodDepartureDate);
            const end = new Date(reservation.lodArrivalDate);
            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                excludedDates.push(new Date(d));
            }
        });
        return excludedDates;
    };

    const excludedDates = getExcludedDates();

    return (
        <div>
            <div className={styles.datePicker}>
                <label>시작 날짜: </label>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="날짜를 선택하세요"
                    className={styles.dateInput}
                    minDate={new Date()}
                    excludeDates={excludedDates} // 예약된 날짜 제외
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
                    minDate={startDate}
                    excludeDates={excludedDates} // 예약된 날짜 제외
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