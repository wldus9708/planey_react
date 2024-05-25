import React, { useState, useRef, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './PackageFoot.module.css';
import { BsMegaphone } from "react-icons/bs";
import { LuHotel } from 'react-icons/lu';
import { IoBusOutline, IoRestaurantOutline } from 'react-icons/io5';
import { TbBeach } from 'react-icons/tb';
import Payment from './payment';
import PaymentStyles from './payment.module.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faCheck, faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';


function PackageFoot() {
    
    
    const [selectedItem, setSelectedItem] = useState(null);
    const [highlightedItem, setHighlightedItem] = useState(null);

    const wrapperRef = useRef(null);
    const contentRef = useRef(null);

    const [icons, setIcons] = useState({
        megaphone: false,
        beach: false,
        hotel: false,
        restaurant: false,
        vehicle: false
    });

    const DataFetchingComponent = () => {
        const [data, setData] = useState([]);
        const [loading, setloading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://localhost:8988/restaurant/list')
                    setData(response.data);
                    setloading(false);
                } catch (error) {
                    setError(error);
                    setloading(false);
                }
            };

            fetchData();
        },[]);

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
    }


    useEffect(() => {


        const handleScroll = () => {
            const contentElements = contentRef.current.querySelectorAll("li");
            contentElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const topOffset = rect.top;
                const bottomOffset = rect.bottom;

                if (topOffset < window.innerHeight / 2 && bottomOffset > window.innerHeight / 2) {
                    const id = element.id;
                    setHighlightedItem(id);
                    setIcons({
                        megaphone: id === 'megaphone',
                        beach: id === 'beach',
                        hotel: id === 'hotel',
                        restaurant: id === 'restaurant',
                        vehicle: id === 'vehicle'
                    });
                }
            });
        };

        const wrapper = wrapperRef.current;
        wrapper.addEventListener("scroll", handleScroll);
        return () => wrapper.removeEventListener("scroll", handleScroll);
    }, []);

    const handleIcon = (what) => {
        setSelectedItem(what);
        if (contentRef.current) {
            const targetElement = contentRef.current.querySelector(`#${what}`);
            if (targetElement) {
                const wrapperRect = wrapperRef.current.getBoundingClientRect();
                const targetRect = targetElement.getBoundingClientRect();
                const offset = targetRect.top - wrapperRect.top + wrapperRef.current.scrollTop;
                wrapperRef.current.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        }

        setIcons({
            megaphone: what === 'megaphone',
            beach: what === 'beach',
            hotel: what === 'hotel',
            restaurant: what === 'restaurant',
            vehicle: what === 'vehicle'
        });
    };

    return (
        <div ref={wrapperRef} className={styles.wrapper}>
            <div className={styles.sidebar}>
                <div className={styles.sideMenu}>
                    <ul className={styles.packageList}>
                        <li onClick={() => handleIcon('megaphone')}
                            style={{ cursor: "pointer", backgroundColor: icons.megaphone ? "orange" : "transparent", borderRadius: "5px" }} className='liicon'>
                            <BsMegaphone style={{ fontSize: "30px", color: icons.megaphone ? "white" : "black" }} />
                            <label style={{ color: icons.megaphone ? "white" : "black" }}>핵심 포인트</label>
                        </li>
                        <li onClick={() => handleIcon('beach')}
                            style={{ cursor: "pointer", backgroundColor: icons.beach ? "orange" : "transparent", borderRadius: "5px" }} className='liicon'>
                            <TbBeach style={{ fontSize: "30px", color: icons.beach ? "white" : "black" }} />
                            <label style={{ color: icons.beach ? "white" : "black" }}>관광지</label>
                        </li>
                        <li onClick={() => handleIcon('hotel')}
                            style={{ cursor: "pointer", backgroundColor: icons.hotel ? "orange" : "transparent", borderRadius: "5px" }} className='liicon'>
                            <LuHotel style={{ fontSize: "30px", color: icons.hotel ? "white" : "black" }} />
                            <label style={{ color: icons.hotel ? "white" : "black" }}>숙소</label>
                        </li>
                        <li onClick={() => handleIcon('restaurant')}
                            style={{ cursor: "pointer", backgroundColor: icons.restaurant ? "orange" : "transparent", borderRadius: "5px" }} className='liicon'>
                            <IoRestaurantOutline style={{ fontSize: "30px", color: icons.restaurant ? "white" : "black" }} />
                            <label style={{ color: icons.restaurant ? "white" : "black" }}>식사</label>
                        </li>
                        <li onClick={() => handleIcon('vehicle')}
                            style={{ cursor: "pointer", backgroundColor: icons.vehicle ? "orange" : "transparent", borderRadius: "5px" }} className='liicon'>
                            <IoBusOutline style={{ fontSize: "30px", color: icons.vehicle ? "white" : "black" }} />
                            <label style={{ color: icons.vehicle ? "white" : "black" }}>이동수단</label>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.content} ref={contentRef}>
                <ul className={styles.packageList}>
                    <li id="megaphone" className={highlightedItem === "megaphone" ? styles.active : ""}>
                        <p>핵심 내용</p>
                        <p>
                            InnerDescription
                        </p>
                    </li>
                    <hr />
                    <li id="beach" className={highlightedItem === "beach" ? styles.active : ""}>
                        <p>관광지 내용</p>
                        <p>
                            InnerDescription
                        </p>
                    </li>
                    <hr />
                    <li id="hotel" className={highlightedItem === "hotel" ? styles.active : ""}>
                        <p>숙소 내용</p>
                        <p>
                            InnerDescription
                        </p>
                    </li>
                    <hr />
                    <li id="restaurant" className={highlightedItem === "restaurant" ? styles.active : ""}>
                        <p>식사 내용</p>
                        <p>
                            InnerDescription
                        </p>
                    </li>
                    <hr />
                    <li id="vehicle" className={highlightedItem === "vehicle" ? styles.active : ""}>
                        <p>이동수단 내용</p>
                        <p>
                            InnerDescription
                        </p>
                    </li>
                    <hr />
                </ul>
            </div>
            <div className={PaymentStyles.wrapper}>
            </div>
        </div>
    );
}

export default PackageFoot;
