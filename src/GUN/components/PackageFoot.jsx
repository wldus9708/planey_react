import React, { useState, useRef, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './PackageFoot.module.css';
import { BsMegaphone } from "react-icons/bs";
import { MdFlightTakeoff } from "react-icons/md";
import { LuHotel } from 'react-icons/lu';
import { IoRestaurantOutline } from 'react-icons/io5';
import { TbBeach } from 'react-icons/tb';
import PaymentStyles from './payment.module.css';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

function PackageFoot() {
    const { id } = useParams();
    const [flight, setFlight] = useState(null);
    const [restaurant, setRestaurant] = useState(null);
    const [lodging, setLodging] = useState(null);
    const [attraction, setAttraction] = useState(null);
    const [data, setData] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [highlightedItem, setHighlightedItem] = useState(null);

    const wrapperRef = useRef(null);
    const contentRef = useRef(null);

    const [icons, setIcons] = useState({
        megaphone: false,
        flight: false,
        beach: false,
        hotel: false,
        restaurant: false
    });

    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const packageTourRes = await axios.get(`http://localhost:8988/PackageTour/detail/${id}`);
                    const packageTourResponse = packageTourRes.data;
                    setData(packageTourResponse);

                    const flightRes = await axios.get(`http://localhost:8988/products/flight/detail/${packageTourResponse.tour_pack_flight}`);
                    setFlight(flightRes.data);

                    const restaurantRes = await axios.get(`http://localhost:8988/restaurant/detail/${packageTourResponse.tour_pack_restaurant}`);
                    setRestaurant(restaurantRes.data);

                    const lodgingRes = await axios.get(`http://localhost:8988/lodging/detail/${packageTourResponse.tour_pack_lodging}`);
                    setLodging(lodgingRes.data);

                    const attractionRes = await axios.get(`http://localhost:8988/attraction/${packageTourResponse.attractionId}`);
                    setAttraction(attractionRes.data);
                    
                } catch (error) {
                    console.error('데이터를 불러오는 중 에러 발생:', error);
                    navigator("/errorpage")
                }
            };

            fetchData();
        }
    }, [id]);



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
                        flight: id === 'flight',
                        beach: id === 'beach',
                        hotel: id === 'hotel',
                        restaurant: id === 'restaurant'
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
            flight: what === 'flight',
            beach: what === 'beach',
            hotel: what === 'hotel',
            restaurant: what === 'restaurant'
        });
    };

    console.log(flight)

    return (
        <div ref={wrapperRef} className={styles.wrapper}>
            <div className={styles.sidebar}>
                <div className={styles.sideMenu}>
                    <ul className={styles.packageList}>
                        <li onClick={() => handleIcon('megaphone')}
                            style={{ cursor: "pointer", backgroundColor: icons.megaphone ? "orange" : "transparent", borderRadius: "5px" }} className='liicon'>
                            <BsMegaphone style={{ fontSize: "30px", color: icons.megaphone ? "white" : "black" }} />
                            <label style={{ color: icons.megaphone ? "white" : "black" }}>패키지 설명</label>
                        </li>
                        <li onClick={() => handleIcon('flight')}
                            style={{ cursor: "pointer", backgroundColor: icons.flight ? "orange" : "transparent", borderRadius: "5px" }} className='liicon'>
                            <MdFlightTakeoff style={{ fontSize: "30px", color: icons.flight ? "white" : "black" }} />
                            <label style={{ color: icons.flight ? "white" : "black" }}>항공</label>
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
                    </ul>
                </div>
            </div>
            <div className={styles.content} ref={contentRef}>
                <ul className={styles.packageList}>
                    <li id="megaphone" className={highlightedItem === "megaphone" ? styles.active : ""}>
                        <h4>패키지 설명</h4>
                        <p>
                            {data ? data.tour_pack_description : '' }
                        </p>
                    </li>
                    <hr />
                    <li id="flight" className={highlightedItem === "flight" ? styles.active : ""}>
                        <h4>항공</h4>
                        <img
                            className={styles.PackImage}
                            src={attraction && attraction[`attImage01`]
                                ? `/images/${attraction[`attImage01`]}`
                                : null}
                            alt={``}
                        />
                        <table className={styles.carTable}>
                            <tbody>
                                <tr>
                                    <th>명소 이름</th>
                                    <td>{attraction && attraction.attName}</td>
                                </tr>
                                <tr>
                                    <th>숙소 주소</th>
                                    <td>{attraction && attraction.attAddress}</td>
                                </tr>
                                <tr>
                                    <th>숙소 설명</th>
                                    <td>{attraction && attraction.attDescription}</td> {/*텍스트 줄변경*/}
                                </tr>
                            </tbody>
                        </table>
                    </li>
                    <hr />
                    <li id="beach" className={highlightedItem === "beach" ? styles.active : ""}>
                        <h4>관광지</h4>
                        <img
                            className={styles.PackImage}
                            src={attraction && attraction[`attImage01`]
                                ? `/images/${attraction[`attImage01`]}`
                                : null}
                            alt={``}
                        />
                        <table className={styles.carTable}>
                            <tbody>
                                <tr>
                                    <th>명소 이름</th>
                                    <td>{attraction && attraction.attName}</td>
                                </tr>
                                <tr>
                                    <th>숙소 주소</th>
                                    <td>{attraction && attraction.attAddress}</td>
                                </tr>
                                <tr>
                                    <th>숙소 설명</th>
                                    <td>{attraction && attraction.attDescription}</td> {/*텍스트 줄변경*/}
                                </tr>
                            </tbody>
                        </table>
                    </li>
                    <hr />
                    <li id="hotel" className={highlightedItem === "hotel" ? styles.active : ""}>
                        <h4>숙소</h4>
                        <img
                            className={styles.PackImage}
                            src={`/images/${lodging && lodging[`lodImage01`]}`}
                            alt={``}
                        />
                        <table className={styles.carTable}>
                            <tbody>
                                <tr>
                                    <th>숙소 이름</th>
                                    <td>{lodging && lodging.lodName}</td>
                                </tr>
                                <tr>
                                    <th>숙소 유형</th>
                                    <td>{lodging && lodging.lodCategory}</td>
                                </tr>
                                <tr>
                                    <th>숙소 주소</th>
                                    <td>{lodging && lodging.lodAddress}</td>
                                </tr>
                                <tr>
                                    <th>숙소 설명</th>
                                    <td>{lodging && lodging.lodDescription}</td> {/*텍스트 줄변경*/}
                                </tr>
                            </tbody>
                        </table>
                    </li>
                    <hr />
                    <li id="restaurant" className={highlightedItem === "restaurant" ? styles.active : ""}>
                        <h4>식당</h4>
                        <img
                            className={styles.PackImage}
                            src={`/images/${restaurant && restaurant[`restImage01`]}`}
                            alt={``}
                        />
                        <table className={styles.carTable}>
                            <tbody>
                                <tr>
                                    <th>식당 이름</th>
                                    <td>{restaurant && restaurant.restName}</td>
                                </tr>
                                <tr>
                                    <th>식사 종류</th>
                                    <td>{restaurant && restaurant.restCategory}</td>
                                </tr>
                                <tr>
                                    <th>수용 인원</th>
                                    <td>{restaurant && restaurant.restCapacity}명</td>
                                </tr>
                                <tr>
                                    <th>식당 설명</th>
                                    <td>{restaurant && restaurant.restDescription.split('.').map((line, index) => (
                                        <div key={index}>{line}</div>
                                    ))}</td> {/*텍스트 줄변경*/}
                                </tr>
                            </tbody>
                        </table>
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


