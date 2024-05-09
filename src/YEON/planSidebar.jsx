import React from 'react';
import './planSidebar.module.css'; // CSS 파일 가져오기
import styles from "./planSidebar.module.css";

const Sidebar = ({ onButtonClick }) => {
    return (
        <div className={styles.plansidebar}> {/* 'sidebar' 클래스 추가 */}
            <button className={styles.planbutton} onClick={() => onButtonClick('component1')}>메인</button>
            <button className={styles.planbutton} onClick={() => onButtonClick('component2')}>날짜 확인</button>
            <button className={styles.planbutton} onClick={() => onButtonClick('component3')}>명소 및 숙소 확인</button>
        </div>
    );
};

export default Sidebar;