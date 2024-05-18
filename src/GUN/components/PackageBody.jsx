import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './PackageBody.module.css';
import axios from "axios";

function App() {
    return (
        <div className={styles.bodyContainer}>
            <div className={styles.bannerTitle}>기내 제공 서비스
                
            </div>
            <div className={styles.bodyBanner}>
                <ul >
                    <li className={styles.innerBanner}>국내항</li>
                    <li className={styles.innerBanner}>조식 제공 : </li>
                    <li className={styles.innerBanner}>셔틀 : </li>
                    <li className={styles.innerBanner}>와이파이 : </li>
                    <li className={styles.innerBanner}>반려동물 동승 : </li>
                    <li className={styles.innerBanner}>주차공간 : </li>
                    <li className={styles.innerBanner}>할인률 : n%</li>
                </ul>
            </div>
        </div>
    );
}
export default App;