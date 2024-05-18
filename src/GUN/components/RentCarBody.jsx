import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './RentCarBody.module.css';
import axios from "axios";

function App() {
    return (
        <div className={styles.bodyContainer}>
            <div className={styles.bannerTitle}>지점 정보
                
            </div>
            <div className={styles.bodyBanner}>
                <ul >
                    <li className={styles.innerBanner}>지점 : </li>
                    <li className={styles.innerBanner}>주소 : </li>
                    <li className={styles.innerBanner}>전화번호 : </li>
                    <li className={styles.innerBanner}>이메일 : </li>
                </ul>
            </div>
        </div>
    );
}
export default App;