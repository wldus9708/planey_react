import React, { useState, useRef, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './RentCarFoot.module.css';
import { BsMegaphone } from "react-icons/bs";
import { LuHotel } from 'react-icons/lu';
import { IoBusOutline, IoRestaurantOutline } from 'react-icons/io5';
import { TbBeach } from 'react-icons/tb';
import Payment from './payment';
import PaymentStyles from './payment.module.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faCheck, faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';


function RentCarFoot() {


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
        }, []);

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
                            <label style={{ color: icons.megaphone ? "white" : "black" }}>유의사항</label>
                        </li>
                        <li onClick={() => handleIcon('beach')}
                            style={{ cursor: "pointer", backgroundColor: icons.beach ? "orange" : "transparent", borderRadius: "5px" }} className='liicon'>
                            <TbBeach style={{ fontSize: "30px", color: icons.beach ? "white" : "black" }} />
                            <label style={{ color: icons.beach ? "white" : "black" }}>보험내용</label>
                        </li>
                        <li onClick={() => handleIcon('hotel')}
                            style={{ cursor: "pointer", backgroundColor: icons.hotel ? "orange" : "transparent", borderRadius: "5px" }} className='liicon'>
                            <LuHotel style={{ fontSize: "30px", color: icons.hotel ? "white" : "black" }} />
                            <label style={{ color: icons.hotel ? "white" : "black" }}>취소/변경정보</label>
                        </li>

                    </ul>
                </div>
            </div>
            <div className={styles.content} ref={contentRef}>
                <ul className={styles.packageList}>
                    <li id="megaphone" className={highlightedItem === "megaphone" ? styles.active : ""}>
                        <p>유의 사항</p>
                        <p>
                            InnerDescription
                        </p>
                    </li>
                    <hr />
                    <li id="beach" className={highlightedItem === "beach" ? styles.active : ""}>
                        <h2><p>보험내용</p></h2>
                        <p>
                            렌트카 보험안내<br /><br />
                            ◆ 렌터카는 종합보험 (대인:무한/대물:2,000만원/자손:1,500만원)에 기본가입되어 있습니다.<br />
                            -단독사고 및 자차과실 100% 사고 일 경우 대인,대물,자손 접수 시  면책금이 발생합니다.<br />
                            -대인 : 1인 기준 30만원 / 대물 : 1건 기준 30~50만원 / 자손 : 1인 기준 30만원 씩 발생.<br />

                            ◆ 보험 보상과 관련하여 임대차 계약서 뒷면 약관에 기재된 내용을 숙지바랍니다.<br /><br />
                            ※ 교통법규<br /><br />
                            -차량 운전자는 교통법규를 준수하셔야 하며, 제반사항은 임차인의 책임입니다.<br />
                            -사고의 경우 도로교통법 위반 시에는 보험보상의 일부 혜택을 받지 못할 수도 있습니다.<br /><br />
                            ※ 계약연장<br /><br />
                            -계약기간을 연장하여 사용코자 할 경우에는 사전에 동의를 받아야 합니다.<br />
                            -사전 동의 없이 연장사용 중에 발생한 보험 및 차량 손해에 대해서는 보상이나 면책을 받지 못할 수 있습니다.<br /><br />

                            차량손해면책 제도<br /><br />
                            운전자 과실에 의한 차량 손해(손, 망실)는 임차인의 책임입니다.<br />
                            차량대여 계약시 사용자와 렌트카 회사간의 약정에 따라 사용자의 책임을 감면해주는 제도로서, 사고 발생시에는 고객님께서 차종에 따른 면책금을 따로 지불하셔야 하며, 보상한도는 보험회사에서 보상해주는 차량보험가액까지이며, 만일 이 금액을 초과하는 사고 발생에 대한 부분은 고객님께서 보상하셔야 합니다.<br />
                            차량사고 발생시 자사 지정정비업소에서 최초견적을 내며 견적비용에 의의가 있을시에는 고객이 영업소 관할구역내에 1급자동차정비업소에 견적의뢰하며 견적이 차이가 많이 나는경우 지정정비업소에서 재견적을 받아 조정하거나 고객과 협의하여 정비업소등을 결정한다.<br />
                            1. 일반자차 : 보상한도내 수리비(20%),휴차보상료(1일 대여료 50%)등의 면책금 부담.<br />
                            보상한도 초과금액은 고객부담<br /><br />
                            (단독사고 및 자차과실 100% 사고일 경우 면책금 30~50만원 발생)<br /><br />
                            2. 고급자차 : 보상한도 금액 내에서 수리비+휴차보상료 면제<br /><br />
                            (단독사고 및 자차과실 100% 사고일 경우 면책금 30~50만원 발생)<br />
                            3. 수퍼자차 : 자차 보상한도 무제한<br />
                            4. 자차특약 : 휠.타이어.출동서비스.견인(10Km이내)<br />
                            5. 자차제외항목 : 차량키.휠.타이어.출동서비스.견인(사고포함).구난.체인.네비게이션.실내부품<br /><br />
                            ***보험적용불가 : 모든 자차 및 특약은 1회성(1사고 1건)이며, 13대 중과실, 우도內사고/미보고(사고발생 직후 사고현장) 사고는 자차 및 특약 적용되지 않습니다.<br /><br />

                            <ul>
                            <li><h3>다음의 경우는 보험처리 및 차량손해(자차) 면책처리가 불가능합니다.</h3></li>
                            <li>- 임차인의 고의로 인한 사고</li>
                            <li>- 무면허 운전사고</li>
                            <li>- 음주운전, 약물중독운전 사고 - 렌트카를 경기용이나 연습용, 테스트용으로 사용하던 중 발생한 사고</li>
                            <li>- 임차인(임차인과 기록된 공동임차인 포함) 이외의 제3자가 렌트카를 사용하여 발생한 사고</li>
                            <li>- 본인 부주의로 인한 차량도난사고</li>
                            <li>- 정원초과로 인한 사고</li>
                            <li>- 사고 후 당사 미보고 사고</li>
                            <li>- 1사고 1건 초과 사고</li>
                            <li>- 우도내에서 발생하는 모든 사고.</li>
                            <li>- 타이어펑크 및 타이어파손 비용, 사고견인, 현장출동(배터리방전,키분실 등)비용은 자차에 적용되지 않습니다. (고객부담)</li>
                            </ul>
                        </p>
                    </li>
                    <hr />
                    <li id="hotel" className={highlightedItem === "hotel" ? styles.active : ""}>
                        <h2><p>취소/변경정보</p></h2>
                        <p>

                            예약취소<br /><br />

                            <li>인수시간 72시간 이전 취소시 수수료 : 0%</li>
                            <li>인수시간 72시간 이내 취소시 수수료 : 30%</li>
                            <li>인수시간 24시간 이내 취소시 수수료 : 50%</li>
                            <li>No Show/대여조건 미달 수수료 : 100%</li>
                            <li>※ No Show란 고객이 예약취소를 하지 않은 채 예약시간에 나타나지 않는 것을 의미합니다.</li>

                            예약 변경<br /><br />

                            일정/업체/차종 변경불가 취소 후 재예약은 가능 조기반납가능(차액환불불가)
                            <ul>
                                <li>- 당일 결제 후 인수하는 차량의 취소는 즉시 수수료가 발생합니다.</li>
                                <li>- 차량예약일 기준으로 최대 72시간 이내 인수차량의 취소는 결제일과 상관없이 수수료가 발생합니다.</li>
                                <li>- 인수 당일 항공기 결항, 선박 결박건에 한하여 확인서를 접수해주시면 100% 환불 가능합니다. (결항, 결박 확인서 당일 접수 필수)</li>
                                <li>- 예약취소 처리는 24시간 365일 자동으로 처리되나 일부 렌터카 업체의 경우 자동처리가 불가능 합니다. 예약확인 메뉴에서 취소 처리가 되지 않을 경우 고객센터(업무시간 내)로 연락 주시기 바랍니다.</li>
                                <li>- 차량 이미지 및 정보는 변경될 수 있습니다.</li>
                                <li>- 면허증 분실(미지참)시에는 대체서류(운전경력증명서와 주민등록증) 확인 후 차량 인수가 가능합니다.</li>
                                <li>- 외국인(국제면허증) 대여조건은 각 렌트 업체마다 기준이 다르며, 예약 전 반드시 고객센터로 확인 후 예약 부탁드립니다. (대여조건 미충족 시 취소규정에 따라 수수료 발생)</li>
                            </ul>
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

export default RentCarFoot;
