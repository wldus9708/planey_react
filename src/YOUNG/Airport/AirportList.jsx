
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import styles from './AirportList.module.css'
import SearchField from '../searchField/Search_field';
import NavBar from "../../CKH/Components/Navbar/Navbar"
import { MdOutlineConnectingAirports } from "react-icons/md";

const AirportList = () => {
    const fixedMinPrice = 100000;
    const fixedMaxPrice = 10000000;
    const priceGap = 100000;
    const [rangeMinValue, setRangeMinValue] = useState(fixedMinPrice);
    const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxPrice);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalDataCount, setTotalDataCount] = useState(0);
    const [isflightsData, setIsFlightsData] = useState(true);
    const [data, setData] = useState([]);
    const [sortOption, setSortOption] = useState("lowPrice");
    const [searchQuery, setSearchQuery] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8988/products/allFlightData`);
                console.log(response.data)

                // 데이터가 리스트2개 불러와져서 합침
                const { flights, returnFlights } = response.data;
                console.log("flights 데이터:", flights);
                console.log("returnFlights 데이터:", returnFlights);

                const combinedData = flights.map((flight, index) => ({
                    ...flight,
                    returnFlight: returnFlights[index],
                }));


                console.log("결합된 데이터:", combinedData);
                setTotalDataCount(combinedData.length);


                const startIndex = (currentPage - 1) * 10 + 1;
                const endIndex = currentPage * 10;
                const newData = combinedData ? combinedData.slice(startIndex - 1, endIndex) : [];
                console.log('시작페이지:' + startIndex);
                console.log('끝페이지:' + endIndex);




                // 페이지가 1이면 데이터를 초기화하고, 그렇지 않으면 데이터를 추가
                if (currentPage === 1) {
                    setData(newData);
                } else {
                    setData(prevData => [...prevData, ...newData]);
                }
                setIsFlightsData(false);

            } catch (error) {
                console.error('Error fetching data:', error);
                setIsFlightsData(false);
            }
        }
        fetchData();

    }, [currentPage]);



    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight &&
                data.length < totalDataCount
            ) {
                setCurrentPage(prevPage => prevPage + 1);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [data, totalDataCount]);
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
        let filteredData = data;

        filteredData = filteredData.filter(item => item.fli_price >= minPrice && item.fli_price <= maxPrice);
        console.log("최소 금액 :" + minPrice)
        console.log("최대 금액 :" + maxPrice)

        // searchfield 검색을 출발지 도착지 주소로 넣음
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

        return filteredData;
    };




    
    // 주소검색창 기능 
    const [secondSearchQuery, setSecondSearchQuery] = useState("");

    const handleSearch = (query) => {
        console.log(query);
        setSecondSearchQuery(query);
    };


    return (
        <>
            <div style={{ padding: '1rem' }}>
                <NavBar />
            </div>
            <div className={styles.restaurantListBody}>
                <SearchField onSearch={handleSearch} />
                <div className={styles['restList-container']}>
                    <div className={styles['restList-left-col']}>
                        <p>{data.length} + options</p>
                        <h1>항공 리스트</h1>
                        <div className={styles['restList-check']}>
                            <FontAwesomeIcon icon={faCheck} className={`${styles['restList-check-icon']} ${sortOption === "lowPrice" ? styles.active : ""}`} />
                            <button className={sortOption === "lowPrice" ? styles.active : ""} onClick={() => setSortOption("lowPrice")}>낮은가격순</button>
                            <FontAwesomeIcon icon={faCheck} className={`${styles['restList-check-icon']} ${sortOption === "highPrice" ? styles.active : ""}`} />
                            <button className={sortOption === "highPrice" ? styles.active : ""} onClick={() => setSortOption("highPrice")}>높은가격순</button>
                        </div>

                        {data.length > 0 ? (
                            sortData(filterData(data,rangeMinValue, rangeMaxValue), sortOption).map((item, index) => {

                                return (
                                    <div className={styles.AirportList} key={index}>
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
                                                                <span className={styles.FliDepRegion}>
                                                                    {/* 출발지 */}
                                                                    {item.fli_departure_place}
                                                                </span>
                                                                <span className={styles.FliDepTime}>
                                                                    {/* 출발시간 */}
                                                                    {item.fli_departure_time}
                                                                </span>
                                                            </div>
                                                            <div className={styles.FliIcon}>
                                                                <MdOutlineConnectingAirports />
                                                            </div>
                                                            <div className={styles.FliArrRegionandTime}>
                                                                <span className={styles.FliArrRegion}>
                                                                    {/* 도착지 */}
                                                                    {item.fli_arrival_place}

                                                                </span>
                                                                <span className={styles.FliArrTime}>
                                                                    {/* 도착시간 */}
                                                                    {item.fli_arrival_time}
                                                                </span>
                                                            </div >
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
                                                                <span className={styles.FliDepRegion}>
                                                                    {/* 출발지 */}
                                                                    {item.returnFlight.return_fli_departure_place}
                                                                </span>
                                                                <span className={styles.FliDepTime}>
                                                                    {/* 출발시간 */}
                                                                    {item.returnFlight.return_fli_departure_time}
                                                                </span>
                                                            </div>
                                                            <div className={styles.FliIcon}>
                                                                <MdOutlineConnectingAirports />
                                                            </div>
                                                            <div className={styles.FliArrRegionandTime}>
                                                                <span className={styles.FliArrRegion}>
                                                                    {/* 도착지 */}
                                                                    {item.returnFlight.return_fli_arrival_place}

                                                                </span>
                                                                <span className={styles.FliArrTime}>
                                                                    {/* 도착시간 */}
                                                                    {item.returnFlight.return_fli_arrival_time}
                                                                </span>
                                                            </div >
                                                        </span>
                                                    </li>

                                                </ul>
                                            </div>
                                            <div className={styles.FliArrPriceBox}>
                                                {/* 총비행시간 */}
                                                <p className={styles.totalTime}>총 {item.fli_total_time + item.returnFlight.return_fli_total_time}분</p>
                                                {/* 요금 */}
                                                {/* 돌아오는편에 요금이 없어서 주석 처리했음 */}
                                                <p className={styles.airPrice}>{(item.fli_price/*+ item.returnFlight.return_fli_price*/).toLocaleString()}원</p>
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
                            < br />
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
                <FontAwesomeIcon icon={faCircleChevronUp} className={styles['icon-Circle']} onClick={scrollToTop} />
            </div>
        </>

    );
};

export default AirportList;