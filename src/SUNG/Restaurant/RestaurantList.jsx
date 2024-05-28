import React, { useState, useEffect } from "react";
import styles from './RestaurantList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faCheck, faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import SearchField from '../../YOUNG/searchField/Search_field';
import NavBar from "../../CKH/Components/Navbar/Navbar"

const RestaurantList = () => {
    const fixedMinPrice = 1000;
    const fixedMaxPrice = 100000;
    const priceGap = 1000;
    const [rangeMinValue, setRangeMinValue] = useState(fixedMinPrice);
    const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxPrice);
    const [checkboxStates, setCheckboxStates] = useState({
        all: false,
        KOREAN: false,
        ITALIAN: false,
        CHINESE: false,
        JAPANESE: false,
        FRENCH: false,
        ETC: false
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalDataCount, setTotalDataCount] = useState(0);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [data, setData] = useState([]);
    const [sortOption, setSortOption] = useState("lowPrice");
    const [searchQuery, setSearchQuery] = useState("");
    const [secondSearchQuery, setSecondSearchQuery] = useState("");
    const [count, setCount] = useState(1); // 인원수 상태 추가

    const handleSearch = (query) => {
        setSecondSearchQuery(query);
    };

    const handleCountChange = (count) => {
        setCount(count); // 인원수 상태 업데이트
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8988/restaurant/list`);
                const allData = response.data;
                setTotalDataCount(allData.length);

                const startIndex = (currentPage - 1) * 5 + 1;
                const endIndex = currentPage * 5;
                const newData = allData ? allData.slice(startIndex - 1, endIndex) : [];
                
                setData(prevData => [...prevData, ...newData]);
                if (currentPage === 1) {
                    setData(newData);
                } else {
                    setData(prevData => {
                        const newDataStartIndex = (currentPage - 1) * 5;
                        const newDataEndIndex = currentPage * 5;
                        const newDataSlice = newData.slice(newDataStartIndex, newDataEndIndex);
                        return [...prevData, ...newDataSlice];
                    });
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
        const allChecked = Object.values(newCheckboxStates).slice(1).every(value => value);
        newCheckboxStates.all = allChecked;
        setCheckboxStates(newCheckboxStates);
    };

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
            return data.slice().sort((a, b) => a.restPrice - b.restPrice);
        } else if (sortOption === "highPrice") {
            return data.slice().sort((a, b) => b.restPrice - a.restPrice);
        } else {
            return data;
        }
    };

    const filterData = (data, searchQuery, minPrice, maxPrice, count) => {
        let filteredData = data;

        filteredData = filteredData.filter(item => item.restPrice >= minPrice && item.restPrice <= maxPrice);

        if (searchQuery.trim()) {
            filteredData = filteredData.filter(item => {
                const restaurantName = item.restName;
                return restaurantName && restaurantName.toLowerCase().includes(searchQuery.toLowerCase());
            });
        }

        if (secondSearchQuery.trim()) {
            filteredData = filteredData.filter(item => {
                const restaurantAddress = item.restAddress;
                return restaurantAddress && restaurantAddress.toLowerCase().includes(secondSearchQuery.toLowerCase());
            });
        }

        filteredData = filteredData.filter(item => item.restCapacity >= count);

        return filteredData;
    };

    const filterByCategory = (data) => {
        if (checkboxStates.all || Object.values(checkboxStates).every(value => !value)) {
            return data;
        }
        return data.filter(item => {
            return checkboxStates[item.restCategory];
        });
    };

    return (
        <>
            <div style={{ padding: '1rem', marginRight: '10rem' }}>
                <NavBar />
            </div>
            <div className={styles.restaurantListBody}>
                <SearchField onSearch={handleSearch} onCountChange={handleCountChange} />
                <div className={styles['restList-container']}>
                    <div className={styles['restList-left-col']}>
                        <p>{data.length} + options</p>
                        <h1>맛집 리스트</h1>
                        <div className={styles['restList-check']}>
                            <FontAwesomeIcon icon={faCheck} className={`${styles['restList-check-icon']} ${sortOption === "lowPrice" ? styles.active : ""}`} />
                            <button className={sortOption === "lowPrice" ? styles.active : ""} onClick={() => setSortOption("lowPrice")}>낮은가격순</button>
                            <FontAwesomeIcon icon={faCheck} className={`${styles['restList-check-icon']} ${sortOption === "highPrice" ? styles.active : ""}`} />
                            <button className={sortOption === "highPrice" ? styles.active : ""} onClick={() => setSortOption("highPrice")}>높은가격순</button>
                        </div>
                        {data.length > 0 ? (
                            sortData(filterByCategory(filterData(data, searchQuery, rangeMinValue, rangeMaxValue, count)), sortOption).map((item, index) => (
                                <div className={styles['restList-house']} key={index} onClick={() => window.location.href = `/restaurantDetail/${item.id}`}>
                                    <div className={styles['restList-house-img']}>
                                        <img src={`/images/${item.restImage01}`} alt="" width="200px" height="200px" />
                                    </div>
                                    <div className={styles['restList-house-info']}>
                                        <p>{item.restCategory}</p>
                                        <h3>{item.restName}</h3>
                                        <p>{item.restAddress}</p>
                                        <FontAwesomeIcon icon={faStar} className={styles['restList-star-icon']} />
                                        {item.restGrade}
                                        <p>{item.restDescription}</p>
                                        <div className={styles['restList-house-price']}>
                                            <h4>₩ {item.restPrice.toLocaleString()}</h4>
                                        </div>
                                        <div className={styles['restList-house-info2']}>
                                            <p><FontAwesomeIcon icon={faHeart} className={styles['restList-heart-icon']} />&nbsp;&nbsp;2508</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>검색 결과가 없습니다.</p>
                        )}
                    </div>
                    <div className={styles['restList-right-col']}>
                        <div className={styles['restList-sidebar']}>
                            <h4>금액 설정</h4>
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
                            <h4>식당 이름으로 검색</h4>
                            <div className={styles['restList-search']}>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <h4>식당 유형</h4>
                            <div className={styles['restList-filter']}>
                                <input type="checkbox" checked={checkboxStates.all} onChange={toggleAllCheckbox} /><p>전체</p><span>({data.filter(item => item.restCategory).length})</span>
                            </div>
                            <div className={styles['restList-filter']}>
                                <input type="checkbox" checked={checkboxStates.KOREAN} onChange={() => toggleCheckbox('KOREAN')} /><p>한식</p><span>({data.filter(item => item.restCategory === 'KOREAN').length})</span>
                            </div>
                            <div className={styles['restList-filter']}>
                                <input type="checkbox" checked={checkboxStates.ITALIAN} onChange={() => toggleCheckbox('ITALIAN')} /><p>양식</p><span>({data.filter(item => item.restCategory === 'ITALIAN').length})</span>
                            </div>
                            <div className={styles['restList-filter']}>
                                <input type="checkbox" checked={checkboxStates.CHINESE} onChange={() => toggleCheckbox('CHINESE')} /><p>중식</p><span>({data.filter(item => item.restCategory === 'CHINESE').length})</span>
                            </div>
                            <div className={styles['restList-filter']}>
                                <input type="checkbox" checked={checkboxStates.JAPANESE} onChange={() => toggleCheckbox('JAPANESE')} /><p>일식</p><span>({data.filter(item => item.restCategory === 'JAPANESE').length})</span>
                            </div>
                            <div className={styles['restList-filter']}>
                                <input type="checkbox" checked={checkboxStates.FRENCH} onChange={() => toggleCheckbox('FRENCH')} /><p>불란서식</p><span>({data.filter(item => item.restCategory === 'FRENCH').length})</span>
                            </div>
                            <div className={styles['restList-filter']}>
                                <input type="checkbox" checked={checkboxStates.ETC} onChange={() => toggleCheckbox('ETC')} /><p>기타</p><span>({data.filter(item => item.restCategory === 'ETC').length})</span>
                            </div>
                        </div>
                    </div>
                </div>
                <FontAwesomeIcon icon={faCircleChevronUp} className={styles['icon-Circle']} onClick={scrollToTop} />
            </div>
        </>
    );
};

export default RestaurantList;

