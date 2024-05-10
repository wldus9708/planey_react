import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from '../../YOUNG/LodgingDetail.module.css';
import axios from "axios";

function PackageFoot() {
    return (
        <div className={styles.LodgingBody}>
            <div>
                <div>
                사이드 바 영역
                <ul>
                    <li>핵심 포인트</li>
                    <li>관광지</li>
                    <li>숙소</li>
                    <li>식사</li>
                    <li>이동수단</li>
                    
                </ul>
                </div>
                <div>
                본문 영역
                </div>
            </div>
        </div>


    );
}
export default PackageFoot;