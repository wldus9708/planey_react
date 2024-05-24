import React, { useState, useEffect } from "react";
import styles from './RentCarList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faCheck, faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import SearchField from '../YOUNG/searchField/Search_field';
import NavBar from "./../CKH/Components/Navbar/Navbar"

const RentCarList = () => {
    const fixedMinPrice = 10000;
    const fixedMaxPrice = 500000;
    const priceGap = 1000;
    const [rangeMinValue, setRangeMinValue] = useState(fixedMinPrice);
    const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxPrice);
    const [allChecked, setAllChecked] = useState(false);
    const [checkboxStates, setCheckboxStates] = useState({
        all: false,
        GASOLINE: false,
        DIESEL: false,
        HYBRID: false,
        ELECTRIC: false,
        HYDROGEN: false,
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
                const response = await axios.get(`http://localhost:8988/car/list`);
                const allData = response.data;
                console.log(allData)
                setTotalDataCount(allData.length);

                const startIndex = (currentPage - 1) * 10 + 1;
                const endIndex = currentPage * 10;
                const newData = allData ? allData.slice(startIndex - 1, endIndex) : [];
                console.log('시작페이지:' + startIndex);
                console.log('끝페이지:' + endIndex);
                setData(prevData => [...prevData, ...newData]);
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
        const newState = !checkboxStates.all;
        const newCheckboxStates = Object.keys(checkboxStates).reduce((acc, key) => {
            acc[key] = newState;
            return acc;
        }, {});
        setCheckboxStates(newCheckboxStates);
    };

    const toggleCheckbox = (name) => {
        const newCheckboxStates = { ...checkboxStates, [name]: !checkboxStates[name] };
        setCheckboxStates(newCheckboxStates);
        const allChecked = Object.values(newCheckboxStates).every(value => value);
        setAllChecked(allChecked);
    };
    
    const filterByFuelType = (data) => {
        if (checkboxStates.all || Object.values(checkboxStates).every(value => !value)) {
            return data;
        }
        return data.filter(item => {
            return checkboxStates[item.carFuelType];
        });
    };
    

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
        }
    };

    const sortData = (data, sortOption) => {
        if (sortOption === "lowPrice") {
            return data.slice().sort((a, b) => a.price - b.price);
        } else if (sortOption === "highPrice") {
            return data.slice().sort((a, b) => b.price - a.price);
        } else {
            return data;
        }
    };

    const filterData = (data, searchQuery, minPrice, maxPrice) => {
        let filteredData = data;

        filteredData = filteredData.filter(item => item.carRentalPrice >= minPrice && item.carRentalPrice <= maxPrice);

        if (searchQuery.trim()) {
            filteredData = filteredData.filter(item => {
                const restaurantName = item.carModel;
                return restaurantName && restaurantName.toLowerCase().includes(searchQuery.toLowerCase());
            });
        }





        return filteredData;
    };

    const filterByCategory = (data) => {
        if (checkboxStates.all || Object.values(checkboxStates).every(value => !value)) {
            return data;
        }
        return data.filter(item => {
            return checkboxStates[item.carFuelType];
        });
    };

    return (
        <>
            <div style={{ padding: '1rem' }}>
                <NavBar />
            </div>
            <SearchField />
            <div className={styles.rentcarListBody}>
                <div className={styles['rentList-container']}>
                    <div className={styles['rentList-left-col']}>
                        <p>{data.length} + options</p>
                        <h1>렌트카 리스트</h1>
                        <div className={styles['rentList-check']}>
                            <FontAwesomeIcon icon={faCheck} className={`${styles['rentList-check-icon']} ${sortOption === "lowPrice" ? styles.active : ""}`} />
                            <button className={sortOption === "lowPrice" ? styles.active : ""} onClick={() => setSortOption("lowPrice")}>낮은가격순</button>
                            <FontAwesomeIcon icon={faCheck} className={`${styles['rentList-check-icon']} ${sortOption === "highPrice" ? styles.active : ""}`} />
                            <button className={sortOption === "highPrice" ? styles.active : ""} onClick={() => setSortOption("highPrice")}>높은가격순</button>
                        </div>
                        {data.length > 0 ? (
                            sortData(filterByCategory(filterData(data, searchQuery, rangeMinValue, rangeMaxValue)), sortOption).map((item, index) => {
                                console.log(item);

                                return (
                                    <div className={styles['rentList-house']} key={index}>
                                        <div className={styles['rentList-house-img']}>
                                            <img src={`/images/${item.car01}`} alt="carimage" width="200px" height="200px" />
                                        </div>
                                        <div className={styles['rentList-house-info']}>
                                            차종 : <h3>{item.carModel}</h3>
                                            <h4>렌트비 : {item.carRentalPrice}</h4>
                                            렌트카 지점 : {item.carLocation} <br />
                                            연료 : {item.carFuelType}
                                            <p></p>
                                            <FontAwesomeIcon icon={faStar} className={styles['rentList-star-icon']} />
                                            <div className={styles['rentList-house-price']}>
                                                <h4>₩ {item.carRentalPrice.toLocaleString()}</h4>
                                            </div>
                                            <div className={styles['rentList-house-info2']}>
                                                <p><FontAwesomeIcon icon={faHeart} className={styles['rentList-heart-icon']} />&nbsp;&nbsp;2508</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>검색 결과가 없습니다.</p>
                        )}


                    </div>
                    <div className={styles['rentList-right-col']}>
                        <div className={styles['rentList-sidebar']}>
                            <h2>필터 선택</h2>
                            <div className={styles['rentList-PriceSlide']} >
                                <div className={styles['rentList-PriceSlideInner']} >
                                    {/* 가격 슬라이드 바 */}
                                </div>
                            </div>
                            <div className={styles['rentList-PriceRangeWrap']}>
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
                                    className={styles['rentList-PriceRangeMin']}
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
                                    className={styles['rentList-PriceRangeMax']}
                                />
                                <div className={styles['rentList-PriceValue']}>
                                    <div className={styles['rentList-PriceValueMin']}>
                                        {rangeMinValue.toLocaleString()}원
                                    </div>
                                    <div className={styles['rentList-PriceValueMax']}>
                                        {rangeMaxValue.toLocaleString()}원
                                    </div>
                                </div>
                            </div>
                            <h3>모델로 검색</h3>
                            <div className={styles['rentList-search']}>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    placeholder="검색어를 입력하세요"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <h3>연료유형</h3>
                            <div className={styles['rentList-filter']}>
                                <input type="checkbox" checked={checkboxStates.all} onChange={toggleAllCheckbox} /><p>전체</p><span>({data.filter(item => item.carFuelType).length})</span>
                            </div>
                            <div className={styles['rentList-filter']}>
                                <input type="checkbox" checked={checkboxStates.GASOLINE} onChange={() => toggleCheckbox('GASOLINE')} /><p>휘발유</p><span>({data.filter(item => item.carFuelType === 'GASOLINE').length})</span>
                            </div>
                            <div className={styles['rentList-filter']}>
                                <input type="checkbox" checked={checkboxStates.DIESEL} onChange={() => toggleCheckbox('DIESEL')} /><p>경유</p><span>({data.filter(item => item.carFuelType === 'DIESEL').length})</span>
                            </div>
                            <div className={styles['rentList-filter']}>
                                <input type="checkbox" checked={checkboxStates.HYBRID} onChange={() => toggleCheckbox('HYBRID')} /><p>하이브리드</p><span>({data.filter(item => item.carFuelType === 'HYBRID').length})</span>
                            </div>
                            <div className={styles['rentList-filter']}>
                                <input type="checkbox" checked={checkboxStates.ELECTRIC} onChange={() => toggleCheckbox('ELECTRIC')} /><p>전기</p><span>({data.filter(item => item.carFuelType === 'ELECTRIC').length})</span>
                            </div>
                            <div className={styles['rentList-filter']}>
                                <input type="checkbox" checked={checkboxStates.HYDROGEN} onChange={() => toggleCheckbox('HYDROGEN')} /><p>수소</p><span>({data.filter(item => item.carFuelType === 'HYDROGEN').length})</span>
                            </div>
                        </div>
                    </div>
                </div>
                <FontAwesomeIcon icon={faCircleChevronUp} className={styles['icon-Circle']} onClick={scrollToTop} />
            </div>
        </>
    );
};

export default RentCarList;
