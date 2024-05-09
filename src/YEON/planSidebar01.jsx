import React from 'react';
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./planMain.module.css";

function content() {
    const navigate = useNavigate();

    const handleMenuClick = (key) => {
        navigate(key);
    };

    return (
        <div className={styles.div}>
            <Menu
                onClick={({ key }) => handleMenuClick(key)}
                items={[
                    {
                        label: "일정",
                        key: "/planMain"
                        
                    },
                    {
                        label: "볼거리",
                        key: "/planMain/attraction"
                    },
                    {
                        label: "숙박",
                        key: "/planMain/lodging"
                    },
                    {
                        label: "일정 만들기",
                        key: "/planMain/scheduleMake"
                    },
                ]}
            />
        </div>
    )
}

export default content;