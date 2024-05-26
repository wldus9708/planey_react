import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from './PackageBody.module.css';

const PackageBody = () => {
    const [packageTour, setPackgeTour] = useState(null);
    let { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8988/PackageTour/detail/${id}`)
            .then((response) => {
                if (response.data) {
                    setPackgeTour(response.data);
                    console.log(response.data);
                }
            })
            .catch(error => {
                console.error('패키지 정보를 가져오는 중 오류 발생:', error);
            });
    }, [id]);

    return (
        <div className={styles.bodyContainer}>
            <div className={styles.bannerTitle}>공항 제공 서비스</div>
            <div className={styles.bodyBanner}>
                <ul>
                    <li className={styles.innerBanner}>
                        항공 타입&nbsp;:&nbsp; {packageTour && packageTour.tourPackCity ? '국내항' : '해외항'}
                    </li>
                    <li className={styles.innerBanner}>
                        조식 제공&nbsp;:&nbsp; 
                        <span className={packageTour && packageTour.breakfast ? styles.allowed : styles.notAllowed}>
                            {packageTour && packageTour.breakfast ? '제공' : '미제공'}
                        </span>
                    </li>
                    <li className={styles.innerBanner}>
                        셔틀&nbsp;:&nbsp; 
                        <span className={packageTour && packageTour.shuttle ? styles.allowed : styles.notAllowed}>
                            {packageTour && packageTour.shuttle ? '제공' : '미제공'}
                        </span>
                    </li>
                    <li className={styles.innerBanner}>
                        와이파이&nbsp;:&nbsp; 
                        <span className={packageTour && packageTour.wifi ? styles.allowed : styles.notAllowed}>
                            {packageTour && packageTour.wifi ? '제공' : '미제공'}
                        </span>
                    </li>
                    <li className={styles.innerBanner}>
                        반려동물 동승&nbsp;:&nbsp; 
                        <span className={packageTour && packageTour.petFriendly ? styles.allowed : styles.notAllowed}>
                            {packageTour && packageTour.petFriendly ? '허용' : '불허용'}
                        </span>
                    </li>
                    <li className={styles.innerBanner}>
                        주차공간&nbsp;:&nbsp; 
                        <span className={packageTour && packageTour.parking ? styles.allowed : styles.notAllowed}>
                            {packageTour && packageTour.parking ? '제공' : '미제공'}
                        </span>
                    </li>
                    <li className={styles.innerBanner}>
                        할인률&nbsp;:&nbsp; {packageTour && packageTour.discount}%
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PackageBody;
