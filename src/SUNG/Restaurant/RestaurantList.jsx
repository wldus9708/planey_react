import React, { useState, useEffect } from "react";
import styles from './RestaurantList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faHeart, faCheck } from '@fortawesome/free-solid-svg-icons';

const RestaurantList = () => {
    const fixedMinPrice = 1000;
    const fixedMaxPrice = 100000;
    const priceGap = 1000;
    const [rangeMinValue, setRangeMinValue] = useState(fixedMinPrice);
    const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxPrice);
    const [allChecked, setAllChecked] = useState(false); // 전체 체크 상태
    const [checkboxStates, setCheckboxStates] = useState({
        all: false, // 전체 체크박스 상태
        한식: false,
        양식: false,
        중식: false,
        일식: false,
        1: false,
        2: false,
        3: false,
        4: false
    });
    const [page, setPage] = useState(1); // 현재 페이지
    const [data, setData] = useState([]); // 렌더링할 데이터
    const [sortOption, setSortOption] = useState(null); // 정렬 옵션
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태

    useEffect(() => {
        setSortOption("latest");
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        fetchData();
    }, [page, sortOption, searchQuery, rangeMinValue, rangeMaxValue, checkboxStates]); 

    const fetchData = () => {
        const newData = generateExampleData(page);
        const sortedData = sortData(newData, sortOption);
        const filteredData = filterData(sortedData, searchQuery);
        const priceFilteredData = filterByPrice(filteredData, rangeMinValue, rangeMaxValue); // 최소 금액과 최대 금액에 해당하는 데이터 필터링
        setData(priceFilteredData);
        // setData(prevData => [...prevData, ...filteredData]);
        // 기존 데이터와 새로운 데이터를 합친 후 중복 제거
        const uniqueData = removeDuplicates([...data, ...priceFilteredData]);
        // 중복 제거된 데이터를 상태에 설정
        setData(uniqueData);
    };
     // 중복된 데이터 제거 함수
     const removeDuplicates = (array) => {
        return array.filter((item, index) => array.findIndex(elem => elem.key === item.key) === index);
    };
    
    
    const filterByPrice = (data, minPrice, maxPrice) => {
        return data.filter(item => {
            const restaurantPrice = getPrice(item);
            return restaurantPrice >= minPrice && restaurantPrice <= maxPrice;
        });
    };

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const generateExampleData = (page) => {
        const newData = [];
        const startIndex = (page - 1) * 20;
        const endIndex = page * 20;
        for (let i = startIndex; i < endIndex; i++) {
            newData.push(
                <div key={i} className={styles['restList-house']}>
                    <div className={styles['restList-house-img']}>
                        <img src="/images/lamb.jpg" alt="" width="200px" height="200px" />
                    </div>
                    <div className={styles['restList-house-info']}>
                        <p>양식</p>
                        <h3>신촌 프렌치렉 양갈비집</h3>
                        <FontAwesomeIcon icon={faStar} className={styles['restList-star-icon']} />
                        <FontAwesomeIcon icon={faStar} className={styles['restList-star-icon']} />
                        <FontAwesomeIcon icon={faStar} className={styles['restList-star-icon']} />
                        <FontAwesomeIcon icon={faStar} className={styles['restList-star-icon']} />
                        <FontAwesomeIcon icon={faStarHalfAlt} className={styles['restList-star-icon']} />
                        <p>입속에 넣기도 전에 녹아버리는 양갈비 부드러움의 끝 맛집...</p>
                        <div className={styles['restList-house-price']}>
                            <h4>₩ 5000</h4>
                        </div>
                        <div className={styles['restList-house-info2']}>
                            <p><FontAwesomeIcon icon={faHeart} className={styles['restList-heart-icon']} />&nbsp;&nbsp;2508</p>
                        </div>
                    </div>
                </div>
            );
        }
        return newData;
    };

    const sortData = (data, sortOption) => {
        if (sortOption === "latest") {
            // 최신순으로 정렬
            return data.reverse();
        } else if (sortOption === "lowPrice") {
            // 낮은 가격순으로 정렬
            return data.sort((a, b) => getPrice(a) - getPrice(b));
        } else if (sortOption === "highPrice") {
            // 높은 가격순으로 정렬
            return data.sort((a, b) => getPrice(b) - getPrice(a));
        } else {
            return data;
        }
    };

    const filterData = (data, searchQuery) => {
        if (!searchQuery.trim()) return []; // 검색어가 없으면 빈 배열 반환
        return data.filter(item => {
            // 식당 이름만 검색
            const restaurantName = item?.props?.children?.[1]?.props?.children?.[1]?.props?.children;
            // 검색어가 포함된 식당 이름이면 반환
            return restaurantName && restaurantName.toLowerCase().includes(searchQuery.toLowerCase());
        });
    };

    const toggleAllCheckbox = () => {
        const newState = !allChecked;
        setAllChecked(newState);
        const newCheckboxStates = { ...checkboxStates };
        for (let key in newCheckboxStates) {
            newCheckboxStates[key] = newState;
        }
        setCheckboxStates(newCheckboxStates);
    };

    const toggleCheckbox = (name) => {
        const newCheckboxStates = { ...checkboxStates, [name]: !checkboxStates[name] };
        setCheckboxStates(newCheckboxStates);
        const allChecked = Object.values(newCheckboxStates).every(value => value);
        setAllChecked(allChecked);
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
        } else {

        }
    };

    const getPrice = (item) => {
        return 5000;
    };

    return (
        <div className={styles.restaurantListBody}>
            <div className={styles['restList-container']}>
                <div className={styles['restList-left-col']}>
                    <p>{data.length} + options</p>
                    <h1>맛집 리스트</h1>
                    <div className={styles['restList-check']}>
                        <FontAwesomeIcon icon={faCheck} className={`${styles['restList-check-icon']} ${sortOption === "latest" ? styles.active : ""}`} />
                        <button className={sortOption === "latest" ? styles.active : ""} onClick={() => setSortOption("latest")}>최신순</button>
                        <FontAwesomeIcon icon={faCheck} className={`${styles['restList-check-icon']} ${sortOption === "lowPrice" ? styles.active : ""}`} />
                        <button className={sortOption === "lowPrice" ? styles.active : ""} onClick={() => setSortOption("lowPrice")}>낮은가격순</button>
                        <FontAwesomeIcon icon={faCheck} className={`${styles['restList-check-icon']} ${sortOption === "highPrice" ? styles.active : ""}`} />
                        <button className={sortOption === "highPrice" ? styles.active : ""} onClick={() => setSortOption("highPrice")}>높은가격순</button>
                    </div>

                    {data.length > 0 ? ( // 데이터가 있는 경우에만 표시
                        data
                    ) : (
                        <p>검색어가 없습니다.</p> // 데이터가 없는 경우 메시지 표시
                    )}
                </div>
                <div className={styles['restList-right-col']}>
                    <div className={styles['restList-sidebar']}>
                        <h2>select Filters</h2>
                        <div className={styles['restList-PriceSlide']} >
                            <div className={styles['restList-PriceSlideInner']} >
                                {/* 가격 슬라이드 바 */}
                            </div>
                        </div>
                        <div className={styles['restList-PriceRangeWrap']} >
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
                            <div className={styles['restList-PriceValue']} >
                                <div className={styles['restList-PriceValueMin']} >
                                    {rangeMinValue.toLocaleString()}원
                                </div>
                                <div className={styles['restList-PriceValueMax']} >
                                    {rangeMaxValue.toLocaleString()}원
                                </div>
                            </div>
                        </div>
                        <h3>식당명</h3>
                        <div className={styles['restList-search']}>
                            <input
                                type="text"
                                value={searchQuery}
                                placeholder=""
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    filterData(data, e.target.value); // 검색어가 변경될 때마다 데이터를 필터링하여 바로 반영
                                }}
                            />
                        </div>
                        <h3>property type</h3>
                        <div className={styles['restList-filter']}>
                            <input type="checkbox" checked={allChecked}
                                onChange={toggleAllCheckbox} /><p>전체</p><span>(0)</span>
                        </div>
                        <div className={styles['restList-filter']}>
                            <input type="checkbox" checked={checkboxStates['한식']}
                                onChange={() => toggleCheckbox('한식')} /><p>한식</p><span>(0)</span>
                        </div>
                        <div className={styles['restList-filter']}>
                            <input type="checkbox" checked={checkboxStates['양식']}
                                onChange={() => toggleCheckbox('양식')} /><p>양식</p><span>(0)</span>
                        </div>
                        <div className={styles['restList-filter']}>
                            <input type="checkbox" checked={checkboxStates['중식']}
                                onChange={() => toggleCheckbox('중식')} /><p>중식</p><span>(0)</span>
                        </div>
                        <div className={styles['restList-filter']}>
                            <input type="checkbox" checked={checkboxStates['일식']}
                                onChange={() => toggleCheckbox('일식')} /><p>일식</p><span>(0)</span>
                        </div>
                        <h3>property type</h3>
                        <div className={styles['restList-filter']}>
                            <input type="checkbox" /><p>1</p><span>(0)</span>
                        </div>
                        <div className={styles['restList-filter']}>
                            <input type="checkbox" /><p>2</p><span>(0)</span>
                        </div>
                        <div className={styles['restList-filter']}>
                            <input type="checkbox" /><p>3</p><span>(0)</span>
                        </div>
                        <div className={styles['restList-filter']}>
                            <input type="checkbox" /><p>4</p><span>(0)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantList;
