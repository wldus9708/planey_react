import React, { useState, useEffect } from "react";
import styles from './PackageList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faCheck, faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import SearchField from '../YOUNG/searchField/Search_field';

const PackageList = () => {
    const fixedMinPrice = 50000;
    const fixedMaxPrice = 10000000;
    const priceGap = 10000;
    const [rangeMinValue, setRangeMinValue] = useState(fixedMinPrice);
    const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxPrice);
    const [allChecked, setAllChecked] = useState(false);
    const [checkboxStates, setCheckboxStates] = useState({
        all: false,
        한식: false,
        양식: false,
        중식: false,
        일식: false,
        불란서식: false,
        기타: false
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
                const response = await axios.get(`http://localhost:8988/PackageTour/list`);
                const allData = response.data;
                console.log(response.data)
                setTotalDataCount(allData.length);

                const startIndex = (currentPage - 1) * 10 + 1;
                const endIndex = currentPage * 10;
                const newData = allData ? allData.slice(startIndex - 1, endIndex) : [];
                console.log('시작페이지:' + startIndex);
                console.log('끝페이지:' + endIndex);
                setData(prevData => [...prevData, ...newData]);
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

        filteredData = filteredData.filter(item => item.price >= minPrice && item.price <= maxPrice);

        if (searchQuery.trim()) {
            filteredData = filteredData.filter(item => {
                const tour_pack_name = item.tour_pack_name;
                return tour_pack_name && tour_pack_name.toLowerCase().includes(searchQuery.toLowerCase());
            });
        }

        return filteredData;
    };

    const filterByCategory = (data) => {
        if (checkboxStates.all || Object.values(checkboxStates).every(value => !value)) {
            return data;
        }
        return data.filter(item => {
            return checkboxStates[item.category];
        });
    };

    return (
        <div className={styles.packageListBody}>
            <SearchField />
            <div className={styles['packList-container']}>
                <div className={styles['packList-left-col']}>
                    <p>{data.length} + options</p>
                    <h1>패키지 리스트</h1>
                    <div className={styles['packList-check']}>
                        <FontAwesomeIcon icon={faCheck} className={`${styles['packList-check-icon']} ${sortOption === "lowPrice" ? styles.active : ""}`} />
                        <button className={sortOption === "lowPrice" ? styles.active : ""} onClick={() => setSortOption("lowPrice")}>낮은가격순</button>
                        <FontAwesomeIcon icon={faCheck} className={`${styles['packList-check-icon']} ${sortOption === "highPrice" ? styles.active : ""}`} />
                        <button className={sortOption === "highPrice" ? styles.active : ""} onClick={() => setSortOption("highPrice")}>높은가격순</button>
                    </div>
                    {data.length > 0 ? (
    sortData(filterByCategory(filterData(data, searchQuery, rangeMinValue, rangeMaxValue)), sortOption).map((item, index) => {
        console.log(item);
        return (
            <div className={styles['packList-house']} key={index}>
                <div className={styles['packList-house-img']}>
                    <img src={`/images/${item.image01}`} alt="" width="200px" height="200px" />
                </div>
                <div className={styles['packList-house-info']}>
                    <h3>{item.tour_pack_name}</h3>
                    일정 : {item.tourPackStartDate}&nbsp; ~ &nbsp;{item.tourPackEndDate}<br />
                    {item.tourPackCity}<br />
                    {item.tourPackLodging}
                    <p></p>
                    <FontAwesomeIcon icon={faStar} className={styles['packList-star-icon']} />
                    
                    <p>{item.tour_pack_description}</p>
                    <div className={styles['packList-house-price']}>
                        <h4>₩ {item.price.toLocaleString()}</h4>
                    </div>
                    <div className={styles['packList-house-info2']}>
                        <p><FontAwesomeIcon icon={faHeart} className={styles['packList-heart-icon']} />&nbsp;&nbsp;2508</p>
                    </div>
                </div>
            </div>
        );
    })
) : (
    <p>검색 결과가 없습니다.</p>
)}


                </div>
                <div className={styles['packList-right-col']}>
                    <div className={styles['packList-sidebar']}>
                        <h2>필터 선택</h2>
                        <div className={styles['packList-PriceSlide']} >
                            <div className={styles['packList-PriceSlideInner']} >
                                {/* 가격 슬라이드 바 */}
                            </div>
                        </div>
                        <div className={styles['packList-PriceRangeWrap']}>
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
                                className={styles['packList-PriceRangeMin']}
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
                                className={styles['packList-PriceRangeMax']}
                            />
                            <div className={styles['packList-PriceValue']}>
                                <div className={styles['packList-PriceValueMin']}>
                                    {rangeMinValue.toLocaleString()}원
                                </div>
                                <div className={styles['packList-PriceValueMax']}>
                                    {rangeMaxValue.toLocaleString()}원
                                </div>
                            </div>
                        </div>
                        <h3>국가명</h3>
                        <div className={styles['packList-search']}>
                            <input
                                type="text"
                                value={searchQuery}
                                placeholder="검색어를 입력하세요"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <h3>국가 분류</h3>
                        <div className={styles['packList-filter']}>
                            <input type="checkbox" checked={allChecked} onChange={toggleAllCheckbox} /><p>전체</p><span>({data.filter(item => item.packCategory).length})</span>
                        </div>
                        <div className={styles['packList-filter']}>
                            <input type="checkbox" checked={checkboxStates['동남아/대만/서남아']} onChange={() => toggleCheckbox('KOREAN')} /><p>동남아/대만/서남아</p><span>({data.filter(item => item.packCategory === 'KOREAN').length})</span>
                        </div>
                        <div className={styles['packList-filter']}>
                            <input type="checkbox" checked={checkboxStates['일본']} onChange={() => toggleCheckbox('ITALIAN')} /><p>일본</p><span>({data.filter(item => item.packCategory === 'ITALIAN').length})</span>
                        </div>
                        <div className={styles['packList-filter']}>
                            <input type="checkbox" checked={checkboxStates['유럽/아프리카']} onChange={() => toggleCheckbox('CHINESE')} /><p>유럽/아프리카</p><span>({data.filter(item => item.packCategory === 'CHINESE').length})</span>
                        </div>
                        <div className={styles['packList-filter']}>
                            <input type="checkbox" checked={checkboxStates['중국/홍콩/몽골/중앙아시아']} onChange={() => toggleCheckbox('JAPANESE')} /><p>중국/홍콩/몽골/중앙아시아</p><span>({data.filter(item => item.packCategory === 'JAPANESE').length})</span>
                        </div>
                        <div className={styles['packList-filter']}>
                            <input type="checkbox" checked={checkboxStates['괌/사이판/호주/뉴질랜드']} onChange={() => toggleCheckbox('FRENCH')} /><p>괌/사이판/호주/뉴질랜드</p><span>({data.filter(item => item.packCategory === 'FRENCH').length})</span>
                        </div>
                        <div className={styles['packList-filter']}>
                            <input type="checkbox" checked={checkboxStates['미국/하와이/캐나다/중남미']} onChange={() => toggleCheckbox('ETC')} /><p>미국/하와이/캐나다/중남미</p><span>({data.filter(item => item.packCategory === 'ETC').length})</span>
                        </div>
                    </div>
                </div>
            </div>
            <FontAwesomeIcon icon={faCircleChevronUp} className={styles['icon-Circle']} onClick={scrollToTop}/>
        </div>
    );
};

export default PackageList;
