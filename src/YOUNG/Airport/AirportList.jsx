
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faCheck, faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
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
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [data, setData] = useState([]);
    const [sortOption, setSortOption] = useState("lowPrice");
    const [searchQuery, setSearchQuery] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8988/lodging/list`);
                const allData = response.data;
                console.log(response.data);
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
                setIsLoadingData(false);

            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoadingData(false);
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

    const filterData = (data, searchQuery, minPrice, maxPrice) => {
        let filteredData = data;

        filteredData = filteredData.filter(item => item.lodPrice >= minPrice && item.lodPrice <= maxPrice);


        if (searchQuery.trim()) {
            filteredData = filteredData.filter(item => {
                const lodgingName = item.lodName;
                return lodgingName && lodgingName.toLowerCase().includes(searchQuery.toLowerCase());
            });
        }

        if (secondSearchQuery.trim()) {
            filteredData = filteredData.filter(item => {
                const lodAddress = item.lodAddress;
                return lodAddress && lodAddress.toLowerCase().includes(secondSearchQuery.toLowerCase());
            });
        }



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
            return data.slice().sort((a, b) => a.lodPrice - b.lodPrice);
        } else if (sortOption === "highPrice") {
            return data.slice().sort((a, b) => b.lodPrice - a.lodPrice);
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
                                    <div className={styles.AirportList}>
                                        <div className={styles.AirSelected}>
                                            <div className={styles.FliDiv}>
                                                <ul>
                                                    <li className={styles.FliList}>
                                                        <span>
                                                            <img src="images/air05.jpg" alt="진에어 로고" />
                                                            <div className={styles.FliName}>
                                                                진에어
                                                            </div>
                                                            <div className={styles.FliDate}>
                                                                2024.05.25(토)
                                                            </div>
                                                            <div className={styles.FliArrRegionandTime}>
                                                                <span className={styles.FliDepRegion}>
                                                                    서울
                                                                </span>
                                                                <span className={styles.FliDepTime}>
                                                                    09:35
                                                                </span>
                                                            </div>
                                                            <div className={styles.FliIcon}>
                                                                <MdOutlineConnectingAirports />
                                                            </div>
                                                            <div className={styles.FliArrRegionandTime}>
                                                                <span className={styles.FliArrRegion}>
                                                                    후쿠오카
                                                                </span>
                                                                <span className={styles.FliArrTime}>
                                                                    11:00
                                                                </span>
                                                            </div >
                                                        </span>
                                                    </li>

                                                    <li className={styles.FliList}>
                                                        <span >
                                                            <img src="images/air05.jpg" alt="진에어 로고" />
                                                            <div className={styles.FliName}>
                                                                진에어
                                                            </div>
                                                            <div className={styles.FliDate}>
                                                                2024.05.28(화)
                                                            </div>
                                                            <div className={styles.FliArrRegionandTime}>
                                                                <span className={styles.FliDepRegion}>
                                                                    후쿠오카
                                                                </span>
                                                                <span className={styles.FliDepTime}>
                                                                    12:40
                                                                </span>
                                                            </div>
                                                            <div className={styles.FliIcon}>
                                                                <MdOutlineConnectingAirports />
                                                            </div>
                                                            <div className={styles.FliArrRegionandTime}>
                                                                <span className={styles.FliArrRegion}>
                                                                    서울
                                                                </span>
                                                                <span className={styles.FliArrTime}>
                                                                    14:10
                                                                </span>
                                                            </div>
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className={styles.FliArrPriceBox}>
                                            <p className={styles.totalTime}>총 1시간 20분</p>
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