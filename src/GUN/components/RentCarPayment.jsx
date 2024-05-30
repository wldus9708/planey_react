import React, { useState, useEffect } from 'react';
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
import { Link, useParams } from "react-router-dom";
import { loadTossPayments } from '@tosspayments/payment-sdk';

const RentCarPayment = ({ car, onPaymentInfo, carId, setCar }) => {
    const [cookies] = useCookies(['accessToken']);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [adults, setAdults] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    let { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log("accessToken :" + cookies.accessToken);
        if (cookies.accessToken) {
            // Fetch user information using the access token
            axios.get('http://localhost:8988/member/detailPage', {
                headers: {
                    Authorization: `${cookies.accessToken}`,
                },
            })
                .then((response) => {
                    setUser(response.data);
                    console.log(response.data.id);
                })
                .catch(error => {
                    console.error('사용자 정보 가져오는 중 오류 발생:', error);
                });
        } else if (!cookies.accessToken) {
            navigator('/login');
            alert("결제전에 로그인을 해주세요.");
        }
        const fetchCarData = async () => {
            try {
                const response = await fetch(`http://localhost:8988/car/detail/${id}`);
                const data = await response.json();
                console.log(data);
                setCar(data);
            } catch (error) {
                console.error('Error fetching car data:', error);
            }
        };

        fetchCarData();
    }, []);

    useEffect(() => {
        calculateTotalPrice(startDate, endDate);
    }, [startDate, endDate, car]);

    const saveRestaurantReservation = (reservationData) => {
        axios.post(`http://localhost:8988/payment/saveRentCarReservation/${id}`, reservationData)
            .then(response => {
                if (response.data) {
                    console.log('렌트카 예약이 성공적으로 처리되었습니다.');
                }
            })
            .catch(error => {
                console.error('렌트카 예약 정보를 저장하는데 실패했습니다:', error);
            });
    };

    const handlePaymentSuccess = (amount) => {
        const reservationData = {
            carId: id,
            memberId: user.id,
            relationship: 10001,
            rentalStartDate:new Date().toISOString(),
            rentalEndDate:new Date().toISOString(),
            rentalPrice: totalPrice,
            reservationStatus: "COMPLETED",
            carInsurance: "STANDARD_INSURANCE",
        };
        saveRestaurantReservation(reservationData);
    };

    const handlePayment = () => {
        const clientKey = 'test_ck_EP59LybZ8BvQWvXPnDEW86GYo7pR';
        loadTossPayments(clientKey)
            .then(tossPayments => {
                tossPayments.requestPayment('CARD', {
                    amount: totalPrice, // 결제할 금액
                    orderId: `order_${id}`, // 주문의 고유한 식별자
                    orderName: `${car.carModel} 예약`, // 주문의 이름 또는 설명
                    successUrl: `http://localhost:3000/PaymentSuccessRentCar?member_id=${user.id}&rentCar=${car.category}`, // 결제 성공 후 이동할 URL 주소
                    failUrl: "http://localhost:3000/PaymentFail", // 결제 실패 시 이동할 URL 주소
                })
                    .then((response) => {
                        if (response.success) {
                            handlePaymentSuccess(response.amount);
                        }
                    })
                    .catch((error) => {
                        console.error('결제 중 오류 발생:', error);
                        alert("결제 실패.");
                    });
            })
            .catch(error => {
                console.error('토스페이먼츠 로딩 중 오류 발생:', error);
                alert("결제 애플리케이션 로딩 실패.");
            });
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const calculateTotalPrice = (start, end) => {
        if (car) {
            const dateDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
            let calculatedTotalPrice = 0;

            if (dateDiff === 1) {
                calculatedTotalPrice = car.carRentalPrice;
            } else {
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
        handlePayment();
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
