import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../YOUNG/lodging/LodingPayment.module.css';
import stylesBtn from "../../YOUNG/lodging/LodgingDetail.module.css";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import NavBar from "../../CKH/Components/Navbar/Navbar"
import { handleNavItemClick } from "./../../CKH/Components/Navbar/Navbar";
import useUser from "../../BBS/Log/useUser";

const RentCarPayment = ({ car, onPaymentInfo, carId }) => {
    const [cookies] = useCookies(['accessToken']);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [adults, setAdults] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    const user = useUser();

    const handleStartDateChange = (date) => {
        setStartDate(date);
        calculateTotalPrice(date, endDate);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        calculateTotalPrice(startDate, date);
    };

    const calculateTotalPrice = (start, end) => {
        if (car) {
            const dateDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
            let calculatedTotalPrice = 0;

            // 대여 기간이 1일인 경우
            if (dateDiff === 1) {
                calculatedTotalPrice = car.carRentalPrice;
            } 
            // 대여 기간이 2일 이상인 경우
            else {
                calculatedTotalPrice = car.carRentalPrice + ((dateDiff - 1) * 90000);
            }

            setTotalPrice(calculatedTotalPrice);
            onPaymentInfo({ startDate: start, endDate: end, totalPrice: calculatedTotalPrice });
        }
    };

    const handleAdultsChange = (increment) => {
        setAdults(prev => Math.max(1, prev + increment));
    };

    const handleAddToCartClick = () => {
        addToCart();
        handleNavItemClick(user, cookies, 'CART_ADD', null, navigate);
      };
      
      const handleBuyNowClick = () => {
        handleNavItemClick(user, cookies, 'PAYMENT', null, navigate);
      };

    const addToCart = async () => {
        await axios.post(`http://localhost:8988/cart/insert?productId=${carId}`, {}, {
            headers: {
                Authorization: cookies.accessToken
            }
        })
        .then((response) => {
            console.log(response);
            alert(response.data.message);
        })
        .catch((err) => {
            console.log(err);
        })
    };

    return (
        <div className={styles.modal}>
            <div className={styles.datePicker}>
                <label>시작 날짜: </label>
                <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="날짜를 선택하세요"
                    className={styles.dateInput}
                    minDate={new Date()} // 시작 날짜 이후로만 선택 가능
                    onClick={() => handleNavItemClick(user, cookies, 'START_DATE', null, navigate)}
                />
            </div>
            <div className={styles.datePicker}>
                <label>종료 날짜: </label>
                <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="날짜를 선택하세요"
                    className={styles.dateInput}
                    minDate={startDate} // 시작 날짜 이후로만 선택 가능
                    onClick={() => handleNavItemClick(user, cookies, 'END_DATE', null, navigate)}
                />
            </div>
            <div>
                <span>총 가격: {totalPrice} 원</span>
            </div>
            <div className={stylesBtn.btnGroups}>
                <button type="button" onClick={handleAddToCartClick} className={stylesBtn.addCartBtn}>
                    <i className='fas fa-shopping-cart'></i>
                    장바구니 추가
                </button>
                <button type="button" className={stylesBtn.buyNowBtn} onClick={handleBuyNowClick}>
                    <i className='fas fa-wallet'></i>
                    예약 하러 가기
                </button>
            </div>
        </div>
    );
};

export default RentCarPayment;
