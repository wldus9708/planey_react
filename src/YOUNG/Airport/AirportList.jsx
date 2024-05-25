
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
    const priceGap = 10000;
    const [rangeMinValue, setRangeMinValue] = useState(fixedMinPrice);
    const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxPrice);
    const [allChecked, setAllChecked] = useState(false);
    const [checkboxStates, setCheckboxStates] = useState({
        all: false,
        HOTEL: false,
        MOTEL: false,
        CONDO: false,
        PENSION: false,
        RESORT: false,
        ETC: false
    });
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
                const allData = Object.values(response.data);
                console.log(allData);
                setTotalDataCount(allData.length);

                const startIndex = (currentPage - 1) * 10 + 1;
                const endIndex = currentPage * 10;
                const newData = allData ? allData.slice(startIndex - 1, endIndex) : [];
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
        console.log("가져와짐.");
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

    const toggleAllCheckbox = () => {
        const newState = !allChecked;
        const newCheckboxStates = { ...checkboxStates };
        for (let key in newCheckboxStates) {
            newCheckboxStates[key] = newState;
        }
        setCheckboxStates(newCheckboxStates); // 모든 체크박스 상태 업데이트
        setAllChecked(newState); // 전체 체크 상태 업데이트
    };

    const toggleCheckbox = (name) => {
        const newCheckboxStates = { ...checkboxStates, [name]: !checkboxStates[name] };
        setCheckboxStates(newCheckboxStates);
        const allChecked = Object.values(newCheckboxStates).every(value => value);
        setAllChecked(allChecked); // 전체 체크 상태 업데이트
    };


    useEffect(() => {
        console.log('checkboxStates:', checkboxStates);
    }, [checkboxStates]);




   

    const prcieRangeMinValueHandler = e => {
        setRangeMinValue(parseInt(e.target.value));
    };

    const prcieRangeMaxValueHandler = e => {
        setRangeMaxValue(parseInt(e.target.value));
    };

    const twoRangeHandler = () => {
        if (rangeMaxValue - rangeMinValue < priceGap) {
            setRangeMaxValue(rangeMinValue => rangeMinValue + priceGap);
            setRangeMinValue(rangeMaxValue => rangeMaxValue - priceGap);
        } else {

        }
    };

    const filterData = (data, minPrice, maxPrice) => {
        let filteredData = data;

        filteredData = filteredData.filter(item => item.fli_price >= minPrice && item.fli_price <= maxPrice);


        // if (searchQuery.trim()) {
        //     filteredData = filteredData.filter(item => {
        //         const lodgingName = item.lodName;
        //         return lodgingName && lodgingName.toLowerCase().includes(searchQuery.toLowerCase());
        //     });
        // }

        // if (secondSearchQuery.trim()) {
        //     filteredData = filteredData.filter(item => {
        //         const lodAddress = item.lodAddress;
        //         return lodAddress && lodAddress.toLowerCase().includes(secondSearchQuery.toLowerCase());
        //     });
        // }



        return filteredData;
    };

    const filterByCategory = (data) => {
        if (checkboxStates.all || Object.values(checkboxStates).every(value => !value)) {
            return data;
        }
        return data.filter(item => {
            return checkboxStates[item.lodCategory];
        });
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
                            sortData(filterByCategory(filterData(data, searchQuery, rangeMinValue, rangeMaxValue)), sortOption).map((item, index) => {

                                return (
                                    <div className={styles.AirportList} key={index}>
                                        <div className={styles.AirSelected}>
                                            <div className={styles.FliDiv}>
                                                <ul>
                                                    <li className={styles.FliList}>
                                                        <span> 
                                                            {/* 가는편 */}
                                                            <img src={item.fli_brand_image} alt="항공사로고" />
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
                                                            <img src={item.return_fli_brand_image} alt="항공사로고" />
                                                            <div className={styles.FliName}>
                                                                {/* 항공사 */}
                                                            {item.return_fli_brand}
                                                            </div>
                                                            <div className={styles.FliDate}>
                                                                 {/* 출발일 */}
                                                                 {item.return_fli_departure_date}
                                                            </div>
                                                            <div className={styles.fli_arrival_date}>
                                                                 {/* 도착일 */}
                                                                 {item.return_fli_arrival_date}
                                                            </div>
                                                            <div className={styles.FliArrRegionandTime}>
                                                                <span className={styles.FliDepRegion}>
                                                                     {/* 출발지 */}
                                                                     {item.return_fli_departure_place}
                                                                </span>
                                                                <span className={styles.FliDepTime}>
                                                                     {/* 출발시간 */}
                                                                     {item.return_fli_departure_time}
                                                                </span>
                                                            </div>
                                                            <div className={styles.FliIcon}>
                                                                <MdOutlineConnectingAirports />
                                                            </div>
                                                            <div className={styles.FliArrRegionandTime}>
                                                                <span className={styles.FliArrRegion}>
                                                                     {/* 도착지 */}
                                                                     {item.return_fli_arrival_place}

                                                                </span>
                                                                <span className={styles.FliArrTime}>
                                                                     {/* 도착시간 */}
                                                                     {item.return_fli_arrival_time}
                                                                </span>
                                                            </div >
                                                        </span>
                                                    </li>

                                                </ul>
                                            </div>
                                            <div className={styles.FliArrPriceBox}>
                                                 {/* 총비행시간 */}
                                            <p className={styles.totalTime}>총 1시간 20분</p>
                                             {/* 요금 */}
                                                <p className={styles.airPrice}>2999,000원</p>
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
                                    step="1000"
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
                                    step="1000"
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