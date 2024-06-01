import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './LodingPayment.module.css';
import stylesBtn from "./LodgingDetail.module.css"
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import NavBar from "../../CKH/Components/Navbar/Navbar"
import { handleNavItemClick } from "./../../CKH/Components/Navbar/Navbar";
import useUser from "../../BBS/Log/useUser";

const LodingPayment = ({ reservations, updateTotalPrice, handlePayment, setStartDate, setEndDate, setAdults, setChildren, lodgingId }) => {
    const [cookies] = useCookies(['accessToken']);
    const [localStartDate, setLocalStartDate] = useState(new Date());
    const [localEndDate, setLocalEndDate] = useState(new Date());
    const [adults, setLocalAdults] = useState(1);
    const [children, setLocalChildren] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const user = useUser();

    const handleAdultsChange = (increment) => {
        setLocalAdults(prev => {
            const newAdults = Math.max(1, prev + increment);
            setAdults(newAdults); // 부모 컴포넌트에 성인 수 설정
            updateTotalPrice(newAdults, children);
            return newAdults;
        });
    };

    const handleChildrenChange = (increment) => {
        setLocalChildren(prev => {
            const newChildren = Math.max(0, prev + increment);
            setChildren(newChildren); // 부모 컴포넌트에 어린이 수 설정
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

    const handleStartDateChange = (date) => {
        setLocalStartDate(date);
        setStartDate(date); // 부모 컴포넌트에 시작 날짜 설정
        setLocalEndDate(date); // 시작 날짜가 바뀌면 종료 날짜도 시작 날짜와 같게 설정
        setEndDate(date); // 부모 컴포넌트에 종료 날짜 설정
    };

    const handleEndDateChange = (date) => {
        if (date < localStartDate) {
            setErrorMessage('종료 날짜는 시작 날짜보다 이전일 수 없습니다.');
        } else {
            setErrorMessage('');
            setLocalEndDate(date);
            setEndDate(date); // 부모 컴포넌트에 종료 날짜 설정
        }
    };

    const addToCart = async () => {
        const totalPeople = Number(adults) + Number(children);
        await axios.post(`http://localhost:8988/cart/insert?productId=${lodgingId}`, { count: totalPeople, children: children }, {
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
    const handleAddToCartClick = () => {
        if (!cookies.accessToken) {
          alert("장바구니 추가 전에 로그인을 해주세요.");
          navigate('/login'); // 로그인 페이지로 이동
          return;
        }
        addToCart();
        handleNavItemClick(user, cookies, 'CART_ADD', null, navigate);
      };
      
      const handleBuyNowClick = () => {
        if (!cookies.accessToken) {
          alert("결제전에 로그인을 해주세요.");
          navigate('/login'); // 로그인 페이지로 이동
          return;
        }
        handlePayment();
        handleNavItemClick(user, cookies, 'PAYMENT', null, navigate);
      };

    return (
        <div>
            <div className={styles.datePicker}>
                <label>시작 날짜: </label>
                <DatePicker
                    selected={localStartDate}
                    onChange={handleStartDateChange}
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
                    selected={localEndDate}
                    onChange={handleEndDateChange}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="날짜를 선택하세요"
                    className={styles.dateInput}
                    minDate={localStartDate}
                    excludeDates={excludedDates} // 예약된 날짜 제외
                />
            </div>
            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
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

export default LodingPayment;
