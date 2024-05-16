import React, { useState, useRef, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './PackageFoot.module.css';
import { BsMegaphone } from "react-icons/bs";
import { LuHotel } from 'react-icons/lu';
import { IoBusOutline, IoRestaurantOutline } from 'react-icons/io5';
import { TbBeach } from 'react-icons/tb';
import Payment from './payment';
import PaymentStyles from './payment.module.css';

function PackageFoot() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [megaphone, setMegaphone] = useState(false);
    const [beach, setBeach] = useState(false);
    const [hotel, setHotel] = useState(false);
    const [restaurant, setRestaurant] = useState(false);
    const [vehicle, setVehicle] = useState(false);
    const [highlightedItem, setHighlightedItem] = useState(null);

    const [activeSection, setActiveSection] = useState(null);

    const wrapperRef = useRef(null);
    const contentRef = useRef(null);
    const sidebarRef = useRef(null);
    const footerRef = useRef(null);

    const [icons, setIcons] = useState({
        megaphone: false,
        beach: false,
        hotel: false,
        restaurant: false,
        vehicle: false
    });

    useEffect(() => {
        const handleScroll = () => {
            const contentElements = contentRef.current.querySelectorAll("li");
    
            contentElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const topOffset = rect.top;
                const bottomOffset = rect.bottom;
    
                if (topOffset < window.innerHeight / 2 && bottomOffset > window.innerHeight / 2) {
                    setHighlightedItem(element.id);
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
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIcons({
            megaphone: false,
            beach: false,
            hotel: false,
            restaurant: false,
            vehicle: false
        }
        );
        handleIconScroll(what);




        switch (what) {
            case 'megaphone':
                setSelectedItem('megaphone');
                setIcons(prevState => ({
                    ...prevState,
                    megaphone: true
                }));
                break;
            case 'beach':
                setSelectedItem('beach');
                setIcons(prevState => ({
                    ...prevState,
                    beach: true
                }));
                break;
            case 'hotel':
                setSelectedItem('hotel');
                setIcons(prevState => ({
                    ...prevState,
                    hotel: true
                }));
                break;
            case 'restaurant':
                setSelectedItem('restaurant');
                setIcons(prevState => ({
                    ...prevState,
                    restaurant: true
                }));
                break;
            case 'vehicle':
                setSelectedItem('vehicle');
                setIcons(prevState => ({
                    ...prevState,
                    vehicle: true
                }));
                break;
            default:
                break;
        }
    };

    const handleIconScroll = (sectionId) => {
        switch (sectionId) {
            case 'megaphone':
                setIcons(prevState => ({ ...prevState, megaphone: true }));
                break;
            case 'beach':
                setIcons(prevState => ({ ...prevState, beach: true }));
                break;
            case 'hotel':
                setIcons(prevState => ({ ...prevState, hotel: true }));
                break;
            case 'restaurant':
                setIcons(prevState => ({ ...prevState, restaurant: true }));
                break;
            case 'vehicle':
                setIcons(prevState => ({ ...prevState, vehicle: true }));
                break;
            default:
                break;
        }
    };




    return (
        <div ref={wrapperRef} className={styles.wrapper}>
            <div className={styles.sidebar}>
                <div className={styles.sideMenu}>

                    <ul className={styles.packageList}>
                        <li onClick={() => handleIcon('megaphone')}
                            style={{ cursor: "pointer", backgroundColor: icons.megaphone ? "orange" : "transparent", borderRadius: "5px" }} className='liicon'>
                            {megaphone ?
                                (<BsMegaphone style={{ padding: "1px", borderRadius: "5px", fontSize: "30px", color: icons.megaphone ? "white" : "black" }} />)
                                :
                                (<BsMegaphone style={{ fontSize: "30px", color: icons.megaphone ? "white" : "black" }} />)
                            }
                            <label style={{ color: icons.megaphone ? "white" : "black" }}>핵심 포인트</label>
                        </li>
                        <li onClick={() => handleIcon('beach')}
                            style={{ cursor: "pointer", backgroundColor: icons.beach ? "orange" : "transparent", borderRadius: "5px" }} className='liicon'>
                            {beach ?
                                (<TbBeach style={{ padding: "1px", borderRadius: "5px", fontSize: "30px", color: icons.beach ? "white" : "black" }} />)
                                :
                                (<TbBeach style={{ fontSize: "30px", color: icons.beach ? "white" : "black" }} />)
                            }
                            <label style={{ color: icons.beach ? "white" : "black" }}>관광지</label>
                        </li>
                        <li onClick={() => handleIcon('hotel')}
                            style={{ cursor: "pointer", backgroundColor: icons.hotel ? "orange" : "transparent", borderRadius: "5px" }} className='liicon'>
                            {hotel ?
                                (<LuHotel style={{ padding: "1px", borderRadius: "5px", fontSize: "30px", color: icons.hotel ? "white" : "black" }} />)
                                :
                                (<LuHotel style={{ fontSize: "30px", color: icons.hotel ? "white" : "black" }} />)
                            }
                            <label style={{ color: icons.hotel ? "white" : "black" }}>숙소</label>
                        </li>
                        <li onClick={() => handleIcon('restaurant')}
                            style={{ cursor: "pointer", backgroundColor: icons.restaurant ? "orange" : "transparent", borderRadius: "5px" }} className='liicon'>
                            {restaurant ?
                                (<IoRestaurantOutline style={{ padding: "1px", borderRadius: "5px", fontSize: "30px", color: icons.restaurant ? "white" : "black" }} />)
                                :
                                (<IoRestaurantOutline style={{ fontSize: "30px", color: icons.restaurant ? "white" : "black" }} />)
                            }
                            <label style={{ color: icons.restaurant ? "white" : "black" }}>식사</label>
                        </li>
                        <li onClick={() => handleIcon('vehicle')}
                            style={{ cursor: "pointer", backgroundColor: icons.vehicle ? "orange" : "transparent", borderRadius: "5px" }} className='liicon'>
                            {vehicle ?
                                (<IoBusOutline style={{ padding: "1px", borderRadius: "5px", fontSize: "30px", color: icons.vehicle ? "white" : "black" }} />)
                                :
                                (<IoBusOutline style={{ fontSize: "30px", color: icons.vehicle ? "white" : "black" }} />)
                            }
                            <label style={{ color: icons.vehicle ? "white" : "black" }}>이동수단</label>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.content} ref={contentRef}>
                <ul className={styles.packageList}>
                    <li id="megaphone" className={highlightedItem === "megaphone" ? styles.active : ""} onClick={() => handleIcon('megaphone')}>
                        <p>핵심 내용</p>
                        <p>
                            하나팩 세이브
                            가성비, 효율성, 편리함을 담은 실속형 상품입니다.
                            단체쇼핑센터 방문과 선택 관광이 있으며
                            가이드&기사 경비가 불포함되어 추가 경비가 있습니다.
                            ✅ 상품 핵심포인트<br />
                            ① 출발 무한 대기 없이, 우린 4인부터 출발 가능😎<br />
                            ② 아낌없이 주는 달랏, 출발 요일별로 제공되는 선물🎁<br />
                            *해당 프로모션은 출발 요일에따라 한번만 제공되는 프로모션입니다. (ex, 월요일 출발 고객 치맥세트 1회 제공)
                            ③ 달랏 시내 호텔 투숙으로 야시장 도보 이동 가능🏤<br />
                            ④ 달랏여행도 식후경👍<br />
                            ⑤ 영원한 봄의 도시 달랏, 핵심관광지 방문🌷<br />
                            ⑥ 배고픈 여행은 NO! 1일 1간식 🌮<br />
                            ⑦ 달랏에서 가장 HOT한 달랏야시장 방문 포함✨<br />
                            ⑧ 달랏 야시장에서 즐기는 낭만포차투어 (꼬치+맥주 제공)🍺<br />
                            ⑨ 랑비엔 SUV 포함 🚙<br />
                            예약 전, 필수 체크리스트<br />
                            - 입국 제한 해제 및 최소인원 충족시 출발 가능<br />
                            - 입국현황 확인: 요즘시대 해외여행 (바로가기)<br />
                            - 출발 가능 여부는 출발일 기준 1개월 전 안내<br />
                            - 출입국 절차에 따라 일정 변동성有<br />
                            하나투어와 함께, 즐거운 안심여행 "SAFETY&JOY"<br />
                            ① 호텔/관광지: 국가별 안전지침 준수<br />
                            ② 차량 : 차량 소독 및 손소독제 비치<br />
                            ③ 가이드 : 백신 접종 완료, 마스크착용, 체온 측정<br />
                            해외 긴급 의료지원 서비스
                            ※ 본 서비스는 한국어시스트카드에서 제공됩니다.<br />
                            ① 365일 24시간 한국 알람 센터 운영<br />
                            ② 여행 중 긴급 도움 필요시 의료 지원 / 긴급상황 지원<br />
                            ③ 서비스 상세안내 (바로가기)<br />
                            ④ 해외▶한국 무료국제전화 국가별 안내 리스트 (바로가기)<br />
                            스페셜포함
                        </p>
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                    </li>
                    <hr />
                    <li id="beach" className={highlightedItem === "beach" ? styles.active : ""} onClick={() => handleIcon('beach')}>
                        <p>관광지 내용</p>
                        <p>
                            스페셜포함
                            [세이브전용]랑비엔 지프차 투어, [세이브전용]달랏 야시장 낭만포차투어(꼬치+맥주 제공)<br />
                            ◆ 더 보여 달랏!<br />
                            영원한 봄의 도시 달랏 핵심관광지 방문<br />
                            #쓰엉흐엉호수 #크레이지하우스 #바오다이황제여름별장 #달랏야시장<br />
                            #랑비엔(SUV 탑승 포함) #죽림사원 #다딴라폭포<br />
                            #자수박물관 #달랏기차역 #린푸억사원<br />
                            1<br />
                            1<br />
                            1<br />
                            1<br />
                            1<br />
                            1<br />
                            1<br />
                        </p>
                    </li>
                    <hr />
                    <li id="hotel" className={highlightedItem === "hotel" ? styles.active : ""} onClick={() => handleIcon('hotel')}>
                        <p>숙소 내용</p>
                        <p>
                            ◆ 달랏 시내 호텔 투숙으로 야시장 도보 이동 가능🏤<br />
                            *자유여행객들이 많이 찾는 달랏 시내 호텔 투숙으로 야시장, 쑤안흐엉호수 등 달랏 핵심관광지 도보 이동 가능합니다.<br />
                            *예정호텔의 객실이 어려울 경우 동급의 다른 호텔로 안내해드리고 있습니다.<br />
                            ◆ 위장을 채워 달랏<br />
                            1<br />
                            1<br />
                            1<br />
                            1<br />
                            1<br />
                            1<br />
                            1<br />
                        </p>
                    </li>
                    <hr />
                    <li id="restaurant" className={highlightedItem === "restaurant" ? styles.active : ""} onClick={() => handleIcon('restaurant')}>
                        <p>식사 내용</p>
                        <p>
                            ◆ 위장을 채워 달랏<br />
                            ① 익숙한 베트남 음식부터 이름은 낯설지만 첫 입에 반할 베트남 음식까지<br />
                            맛의 천국 베트남에서 즐기는 다양한 현지식과 심신이 지칠 때 생각 나는 든든한 한식 까지 !<br />
                            #분짜 #반쎄오 #핫팟 #우렁이요리 #닭구이+대나무통밥<br />
                            #무제한삼겹살 # 베트남가정식<br />

                            ② 식사만으로도는 부족한 당신을 위한 1일 1 베트남 간식<br />
                            #반짠느엉 #반미 #깜보<br />
                            1<br />
                            1<br />
                            1<br />
                            1<br />
                            1<br />
                            1<br />
                            1<br />
                            1<br />
                            1<br />
                        </p>
                    </li>
                    <hr />
                    <li id="vehicle" className={highlightedItem === "vehicle" ? styles.active : ""} onClick={() => handleIcon('vehicle')}>
                        <p>이동수단 내용</p>
                        <p>
                            ◆ 출입국 정보<br />
                            여행 필요서류/한국 출국 전준비사항▶<br />
                            베트남은 코로나19 검역절차 폐지로 별도 준비서류 없습니다.<br />
                            (아동은 부모 동반시에도 영문 가족관계증명서 증빙 필수)<br />
                            해외 입국 후 검역 규정/절차 ▶<br />
                            베트남은 입국 후 별도의 검역규정이 없어 입국 후 바로 자유로운 여행이 가능합니다.<br />
                            한국 귀국 준비사항/절차 ▶<br />
                            2023년 9월 3일부터 한국 귀국을 위한 코로나 검사는 불필요합니다.<br />
                            - 사전입력시스템(Q-code)에서 발급한 QR코드 제시<br />
                            1<br />
                            1<br />
                            1<br />
                            1<br />
                            1<br />
                            1<br />
                            1<br />
                            1<br />
                            1<br />
                        </p>
                    </li>
                    <hr />
                </ul>


            </div>
            <div className={PaymentStyles.wrapper}>
                <Payment></Payment>
            </div>
        </div>
    );
}

export default PackageFoot;
