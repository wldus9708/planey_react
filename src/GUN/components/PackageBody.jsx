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
    {/* <div className={styles.bannerTitle}>공항 제공 서비스</div> */}
        <table className={styles.serviceTable}>
            <tbody>
                <tr className={styles.innerBanner}>
                    <td>항공 타입</td>
                    <td>{packageTour && packageTour.tourPackCity ? '국내항' : '해외항'}</td>
                </tr>
                <tr className={styles.innerBanner}>
                    <td>조식 제공</td>
                    <td>
                        <span className={packageTour && packageTour.breakfast ? styles.allowed : styles.notAllowed}>
                            {packageTour && packageTour.breakfast ? '제공' : '미제공'}
                        </span>
                    </td>
                </tr>
                <tr className={styles.innerBanner}>
                    <td>셔틀</td>
                    <td>
                        <span className={packageTour && packageTour.shuttle ? styles.allowed : styles.notAllowed}>
                            {packageTour && packageTour.shuttle ? '제공' : '미제공'}
                        </span>
                    </td>
                </tr>
                <tr className={styles.innerBanner}>
                    <td>와이파이</td>
                    <td>
                        <span className={packageTour && packageTour.wifi ? styles.allowed : styles.notAllowed}>
                            {packageTour && packageTour.wifi ? '제공' : '미제공'}
                        </span>
                    </td>
                </tr>
                <tr className={styles.innerBanner}>
                    <td>반려동물 동승</td>
                    <td>
                        <span className={packageTour && packageTour.petFriendly ? styles.allowed : styles.notAllowed}>
                            {packageTour && packageTour.petFriendly ? '허용' : '불허용'}
                        </span>
                    </td>
                </tr>
                <tr className={styles.innerBanner}>
                    <td>주차공간</td>
                    <td>
                        <span className={packageTour && packageTour.parking ? styles.allowed : styles.notAllowed}>
                            {packageTour && packageTour.parking ? '제공' : '미제공'}
                        </span>
                    </td>
                </tr>
                <tr className={styles.innerBanner}>
                    <td>할인률</td>
                    <td>{packageTour && packageTour.discount}%</td>
                </tr>
            </tbody>
        </table>
   
</div>

    );
};

export default PackageBody;
