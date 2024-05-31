import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import styles from './AirportList.module.css'
import SearchField from '../searchField/Search_field';
import NavBar from "../../CKH/Components/Navbar/Navbar"
import throttle from 'lodash/throttle'; // 스크롤이벤트 대신 
import { handleNavItemClick } from "./../../CKH/Components/Navbar/Navbar";
import useUser from "../../BBS/Log/useUser";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const AirportList = () => {
    const fixedMinPrice = 100000;
    const fixedMaxPrice = 5000000;
    const priceGap = 100000;
    const [rangeMinValue, setRangeMinValue] = useState(fixedMinPrice);
    const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxPrice);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalDataCount, setTotalDataCount] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const [data, setData] = useState([]);
    const [sortOption, setSortOption] = useState("lowPrice");
    const [secondSearchQuery, setSecondSearchQuery] = useState("");
    const [count, setCount] = useState(1); // 인원수 상태 추가
    const [startDate, setStartDate] = useState(null); // 출발 날짜 상태
    const [endDate, setEndDate] = useState(null); // 종료 날짜 상태
    const user = useUser();
    const [cookies] = useCookies(['accessToken']);
    const navigate = useNavigate();

    const fetchData = async (page) => {
        setIsFetching(true);
        try {
            const response = await axios.get(`http://localhost:8988/products/allFlightData`);
            const { flights, returnFlights } = response.data;

            const combinedData = flights.map((flight, index) => ({
                ...flight,
                returnFlight: returnFlights[index],
            }));

            setTotalDataCount(combinedData.length);

            const startIndex = (page - 1) * 5;
            const endIndex = page * 5;
            const newData = combinedData.slice(startIndex, endIndex);

            if (page === 1) {
                setData(newData);
            } else {
                setData(prevData => [...prevData, ...newData]);
            }
            setIsFetching(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setIsFetching(false);
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const handleScroll = useCallback(throttle(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 &&
            !isFetching &&
            data.length < totalDataCount
        ) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    }, 200), [isFetching, data, totalDataCount]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        const circleChevronUpIcon = document.querySelector('.icon-Circle');
        if (circleChevronUpIcon) {
            circleChevronUpIcon.addEventListener('click', scrollToTop);

            return () => {
                circleChevronUpIcon.removeEventListener('click', scrollToTop);
            };
        }
    }, []);

    const prcieRangeMinValueHandler = e => {
        setRangeMinValue(parseInt(e.target.value));
    };

    const prcieRangeMaxValueHandler = e => {
        setRangeMaxValue(parseInt(e.target.value));
    };

    const twoRangeHandler = () => {
        if (rangeMaxValue - rangeMinValue < priceGap) {
            setRangeMaxValue(rangeMinValue + priceGap);
            setRangeMinValue(rangeMaxValue - priceGap);
        }
    };

    const sortData = (data, sortOption) => {
        if (sortOption === "lowPrice") {
            return data.slice().sort((a, b) => a.fli_price - b.fli_price);
        } else if (sortOption === "highPrice") {
            return data.slice().sort((a, b) => b.fli_price - a.fli_price);
        } else {
            return data;
        }
    };

    const filterData = (data, minPrice, maxPrice) => {
        let filteredData = data.filter(item => item.fli_price >= minPrice && item.fli_price <= maxPrice);

        if (secondSearchQuery.trim()) {
            filteredData = filteredData.filter(item => {
                const flightAddress = item.fli_arrival_place;
                const flightAddress2 = item.fli_departure_place;
                const returnFlightAddress = item.returnFlight.return_fli_arrival_place;
                const returnFlightDepartureDate = item.returnFlight.return_fli_departure_date;

                const containsSearchQuery = (address) => {
                    return address && address.toLowerCase().includes(secondSearchQuery.toLowerCase());
                };

                return containsSearchQuery(flightAddress) ||
                    containsSearchQuery(flightAddress2) ||
                    containsSearchQuery(returnFlightAddress) ||
                    containsSearchQuery(returnFlightDepartureDate);
            });
        }

        if (startDate && endDate) {
            filteredData = filteredData.filter(item => {
                const flightDepartureDate = new Date(item.fli_departure_date);
                const flightArrivalDate = new Date(item.fli_arrival_date);
                const returnFlightDepartureDate = new Date(item.returnFlight.return_fli_departure_date);
                const returnFlightArrivalDate = new Date(item.returnFlight.return_fli_arrival_date);

                return (flightDepartureDate >= startDate && flightArrivalDate <= endDate) &&
                    (returnFlightDepartureDate >= startDate && returnFlightArrivalDate <= endDate);
            });
        }

        return filteredData;
    };

    const handleSearch = (query) => {
        setSecondSearchQuery(query);
    };

    const handleCountChange = (count) => {
        setCount(count); // 인원수 상태 업데이트
    };

    const handleDateChange = (date) => {
        setStartDate(date.startDate);
        setEndDate(date.endDate);
    };

    // 비행시간 
    const convertMinutesToHoursAndMinutes = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}시간 ${remainingMinutes}분`;
    };

    const handleScrollToTopAndNavItemClick = () => {
        scrollToTop();
        handleNavItemClick(user, cookies, 'AIRPORT_SCROLLTOP', null, navigate);
    };

    const clickSort = (sortOption) => {
        setSortOption(sortOption);
        handleNavItemClick(user, cookies, sortOption === "lowPrice" ? 'AIRPORT_SORT_LOWPRICE' : 'AIRPORT_SORT_HIGHPRICE', null, navigate);
    };

    return (
        <>
            <div style={{ padding: '1rem' }}>
                <NavBar />
            </div>
            <div className={styles.restaurantListBody}>
                <SearchField onSearch={handleSearch} onCountChange={handleCountChange} onDateChange={handleDateChange} />
                <div className={styles['restList-container']}>
                    <div className={styles['restList-left-col']}>
                        <p>{data.length} + options</p>
                        <h1>항공 리스트</h1>
                        <div className={styles['restList-check']}>
                            <FontAwesomeIcon icon={faCheck} className={`${styles['restList-check-icon']} ${sortOption === "lowPrice" ? styles.active : ""}`} />
                            <button className={sortOption === "lowPrice" ? styles.active : ""} onClick={() => clickSort("lowPrice")}>낮은가격순</button>
                            <FontAwesomeIcon icon={faCheck} className={`${styles['restList-check-icon']} ${sortOption === "highPrice" ? styles.active : ""}`} />
                            <button className={sortOption === "highPrice" ? styles.active : ""} onClick={() => clickSort("highPrice")}>높은가격순</button>
                        </div>

                        {data.length > 0 ? (
                            sortData(filterData(data, rangeMinValue, rangeMaxValue), sortOption).map((item, index) => {
                                return (
                                    <div
                                        onClick={() => window.location.href = `/AirportDetail/${item.id}`}
                                        className={styles.AirportList}
                                        key={index}>
                                        <div className={styles.AirSelected}>
                                            <div className={styles.FliDiv}>
                                                <ul>
                                                    <li className={styles.FliList}>
                                                        <span>
                                                            {/* 가는편 */}
                                                            <img src={`/images/${item.fli_brand_image}`} alt="항공사로고" />
                                                            <div className={styles.FliName}>
                                                                {/* 항공사 */}
                                                                {item.fli_brand}
                                                            </div>
                                                            <div className={styles.FliDate}>
                                                                {/* 출발일 */}
                                                                {item.fli_departure_date}
                                                            </div>
                                                            <div className={styles.fli_arrival_date}>
                                                                {/* 도착일 */}
                                                                {item.fli_departure_date}
                                                            </div>
                                                            <div className={styles.FliArrRegionandTime}>
                                                                <div className={styles.FliDepRegion}>
                                                                    {/* 출발지 */}
                                                                    {item.fli_departure_place}
                                                                </div>
                                                                <div className={styles.FliDepTime}>
                                                                    {/* 출발시간 */}
                                                                    {item.fli_departure_time}
                                                                </div>
                                                            </div>
                                                            <div className={styles.FliIcon}>
                                                                >>
                                                            </div>
                                                            <div className={styles.FliArrRegionandTime}>
                                                                <div className={styles.FliArrRegion}>
                                                                    {/* 도착지 */}
                                                                    {item.fli_arrival_place}
                                                                </div>
                                                                <div className={styles.FliArrTime}>
                                                                    {/* 도착시간 */}
                                                                    {item.fli_arrival_time}
                                                                </div>
                                                            </div >
                                                            <p className={styles.totalTime}>
                                                                총 {convertMinutesToHoursAndMinutes(item.fli_total_time)}
                                                            </p>
                                                        </span>
                                                    </li>

                                                    <li className={styles.FliList}>
                                                        <span>
                                                            {/* 오는편 */}
                                                            <img src={`/images/${item.returnFlight.return_fli_brand_image}`} alt="항공사로고" />
                                                            <div className={styles.FliName}>
                                                                {/* 항공사 */}
                                                                {item.returnFlight.return_fli_brand}
                                                            </div>
                                                            <div className={styles.FliDate}>
                                                                {/* 출발일 */}
                                                                {item.returnFlight.return_fli_departure_date}
                                                            </div>
                                                            <div className={styles.fli_arrival_date}>
                                                                {/* 도착일 */}
                                                                {item.returnFlight.return_fli_arrival_date}
                                                            </div>
                                                            <div className={styles.FliArrRegionandTime}>
                                                                <div className={styles.FliDepRegion}>
                                                                    {/* 출발지 */}
                                                                    {item.returnFlight.return_fli_departure_place}
                                                                </div>
                                                                <div className={styles.FliDepTime}>
                                                                    {/* 출발시간 */}
                                                                    {item.returnFlight.return_fli_departure_time}
                                                                </div>
                                                            </div>
                                                            <div className={styles.FliIcon}>
                                                                <p>
                                                                    >>
                                                                </p>
                                                            </div>
                                                            <div className={styles.FliArrRegionandTime}>
                                                                <div className={styles.FliArrRegion}>
                                                                    {/* 도착지 */}
                                                                    {item.returnFlight.return_fli_arrival_place}
                                                                </div>
                                                                <div className={styles.FliArrTime}>
                                                                    {/* 도착시간 */}
                                                                    {item.returnFlight.return_fli_arrival_time}
                                                                </div>
                                                            </div >
                                                            <p className={styles.totalTime}>
                                                                총 {convertMinutesToHoursAndMinutes(item.returnFlight.return_fli_total_time)}
                                                            </p>
                                                        </span>
                                                    </li>

                                                </ul>
                                            </div>
                                            <div className={styles.FliArrPriceBox}>
                                                {/* 요금 */}
                                                <p className={styles.airPrice1}>{(item.fli_price).toLocaleString()}원</p>
                                                <p className={styles.airPrice2}>{(item.returnFlight.return_fli_price).toLocaleString()}원</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>검색 결과가 없습니다.</p>
                        )}
                    </div>
                    <div className={styles['restList-right-col']}>
                        <div className={styles['restList-sidebar']}>
                            <h6>금액 설정</h6>
                            <br />
                            <div className={styles['restList-PriceSlide']} >
                                <div className={styles['restList-PriceSlideInner']} >
                                    {/* 가격 슬라이드 바 */}
                                </div>
                            </div>
                            <div className={styles['restList-PriceRangeWrap']}>
                                <input
                                    type="range"
                                    min={fixedMinPrice}
                                    max={fixedMaxPrice - priceGap}
                                    step="100000"
                                    value={rangeMinValue}
                                    onChange={e => {
                                        prcieRangeMinValueHandler(e);
                                        twoRangeHandler();
                                    }}
                                    onClick={() => handleNavItemClick(user, cookies, 'AIRPORT_PRICE_RANGE', null, navigate)}
                                    className={styles['restList-PriceRangeMin']}
                                />
                                <input
                                    type="range"
                                    min={fixedMinPrice + priceGap}
                                    max={fixedMaxPrice}
                                    step="100000"
                                    value={rangeMaxValue}
                                    onChange={e => {
                                        prcieRangeMaxValueHandler(e);
                                        twoRangeHandler();
                                    }}
                                    className={styles['restList-PriceRangeMax']}
                                />
                                <div className={styles['restList-PriceValue']}>
                                    <div className={styles['restList-PriceValueMin']}>
                                        {rangeMinValue.toLocaleString()}원
                                    </div>
                                    <div className={styles['restList-PriceValueMax']}>
                                        {rangeMaxValue.toLocaleString()}원
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FontAwesomeIcon icon={faCircleChevronUp} className={styles['icon-Circle']} onClick={handleScrollToTopAndNavItemClick} />
            </div>
        </>
    );
};

export default AirportList;
