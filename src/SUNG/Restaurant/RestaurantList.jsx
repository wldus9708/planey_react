import React, { useState, useEffect } from "react";
import styles from './RestaurantList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faHeart } from '@fortawesome/free-solid-svg-icons';

const RestaurantList = () => {
    const fixedMinPrice = 1000;
    const fixedMaxPrice = 100000;
    const priceGap = 1000;
    const [rangeMinValue, setRangeMinValue] = useState(fixedMinPrice);
    const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxPrice);
    const [rangeMinPercent, setRangeMinPercent] = useState(0);
    const [rangeMaxPercent, setRangeMaxPercent] = useState(0);

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
            setRangeMinPercent(() => (rangeMinValue / fixedMaxPrice) * 100);
            setRangeMaxPercent(() => 100 - (rangeMaxValue / fixedMaxPrice) * 100);
        }
    };
    return (
        <div className={styles.restaurantBody}>
            <div className={styles['restList-container']}>
                <div className={styles['restList-left-col']}>
                    <p>200 + options</p>
                    <h1>맛집 리스트</h1>
                    <div className={styles['restList-check']}> 
            
                    </div>
                    <div className={styles['restList-house']}>
                        <div className={styles['restList-house-img']}>
                            <img src="/images/lamb.jpg" alt="" width="200px" height="200px" />
                        </div>
                        <div className={styles['restList-house-info']}>
                            <p>양식</p>
                            <h3>신촌 프렌치렉 양갈비집</h3>
                            <p>서웉특별시 신촌 거구장 옆</p>
                            <FontAwesomeIcon icon={faStar} className={styles['restList-star-icon']} />
                            <FontAwesomeIcon icon={faStar} className={styles['restList-star-icon']} />
                            <FontAwesomeIcon icon={faStar} className={styles['restList-star-icon']} />
                            <FontAwesomeIcon icon={faStar} className={styles['restList-star-icon']} />
                            <FontAwesomeIcon icon={faStarHalfAlt} className={styles['restList-star-icon']} />
                            <p>입속에 넣기도 전에 녹아버리는 양갈비 부드러움의 끝 맛집으로...</p>
                            <div className={styles['restList-house-price']}>

                                <h4>₩ 5000</h4>
                            </div>
                            <div className={styles['restList-house-info2']}>
                                <p><FontAwesomeIcon icon={faHeart} className={styles['restList-heart-icon']} />&nbsp;&nbsp;2508</p>
                            </div>
                        </div>
                    </div><div className={styles['restList-house']}>
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
                    </div><div className={styles['restList-house']}>
                        <div className={styles['restList-house-img']}>
                            <img src="/images/lamb.jpg" alt="" width="200px" height="200px" />
                        </div>
                        <div className={styles['restList-house-info']}>
                            <p>양식</p>
                            <h3>신촌 프렌치렉 양갈비집</h3>
                            <p>입속에 넣기도 전에 녹아버리는 양갈비 부드러움의 끝 맛집...</p>
                            <FontAwesomeIcon icon={faStar} className={styles['restList-star-icon']} />
                            <FontAwesomeIcon icon={faStar} className={styles['restList-star-icon']} />
                            <FontAwesomeIcon icon={faStar} className={styles['restList-star-icon']} />
                            <FontAwesomeIcon icon={faStar} className={styles['restList-star-icon']} />
                            <FontAwesomeIcon icon={faStarHalfAlt} className={styles['restList-star-icon']} />
                            <div className={styles['restList-house-price']}>

                                <h4>₩ 5000</h4>
                            </div>
                            <div className={styles['restList-house-info2']}>
                                <p><FontAwesomeIcon icon={faHeart} className={styles['restList-heart-icon']} />&nbsp;&nbsp;2508</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className={styles['restList-right-col']}>
                    <div className={styles['restList-sidebar']}>
                        <h2>select Filters</h2>
                        <div className={styles['restList-PriceSlide']} >
                            <div className={styles['restList-PriceSlideInner']} >

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
                        <h3>property type</h3>
                        <div className={styles['restList-filter']}>
                            <input type="checkbox" /><p>전체</p><span>(0)</span>
                        </div>
                        <div className={styles['restList-filter']}>
                            <input type="checkbox" /><p>한식</p><span>(0)</span>
                        </div>
                        <div className={styles['restList-filter']}>
                            <input type="checkbox" /><p>양식</p><span>(0)</span>
                        </div>
                        <div className={styles['restList-filter']}>
                            <input type="checkbox" /><p>중식</p><span>(0)</span>
                        </div>
                        <div className={styles['restList-filter']}>
                            <input type="checkbox" /><p>일식</p><span>(0)</span>
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
                        <div className={styles['restList-sidebar-link']}>
                            <a href="#">view more</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantList;
