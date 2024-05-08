import React, { useState } from 'react';
import Style from './style.css'



const ProductDetails = () => {
    // 아이콘 형식의 패키지 스테이터스를 표시 할 useState
    const [CalendarIcon, setCalendarIcon] = useState("images/CalendarIcon.png");
    // 첫 번째 이미지의 소스(src)를 상태로 관리
    const [mainImage, setMainImage] = useState("images/Jeju.png");
    // 이미지를 클릭했을 때 실행될 함수
    const handleImageClick = (newSrc) => {
        setMainImage(newSrc); // 클릭된 이미지의 소스(src)를 첫 번째 이미지의 소스로 설정
    };
    return (
        <div className="container">
            <div className="box">
                <div className="images">
                    <div className="img-holder active" onClick={() => handleImageClick("images/Jeju.png")}>
                        <img src={mainImage} alt="Headphone" />
                    </div>
                    <div className="img-holder" onClick={() => handleImageClick("images/Jeju01.png")}>
                        <img src="images/Jeju01.png" alt="Headphone" />
                    </div>
                    <div className="img-holder" onClick={() => handleImageClick("images/Jeju-Harubang.png")}>
                        <img src="images/Jeju-Harubang.png" alt="Headphone" />
                    </div>
                    <div className="img-holder" onClick={() => handleImageClick("images/Jeju02.png")}>
                        <img src="images/Jeju02.png" alt="Headphone" />
                    </div>
                </div>
                <div className="basic-info">
                    <h2>[제주 패키지] 2박3일 식도락여행</h2>
                    <div className="rate">
                        <i className="filled fas fa-star"></i>
                        <i className="filled fas fa-star"></i>
                        <i className="filled fas fa-star"></i>
                        <i className="filled fas fa-star"></i>
                        <i className="filled fas fa-star"></i>
                    </div>
                    <span>799,000 원</span>
                    <div className="options">
                        <a href="#">예약하기</a> &nbsp;
                        <a href="#">저 장</a>
                    </div>
                </div>
                <div className="description">
                    <p>하나팩 스탠다드 2.0
                        패키지여행의 핵심인 편리함과 효율성을 강조한
                        온전히 여행에 집중하는 하나투어의 대표여행상품입니다.
                        합리적으로 인하된 가격으로 선택관광이 진행되며,
                        가이드&기사 경비는 상품가에 포함되어 있고,
                        단체 여행객만을 위한 쇼핑센터는 방문하지 않습니다..</p>
                    <div className='iconsContainer'>

                    </div>

                    <ul className="features">
                        <li><i className="fa-solid fa-circle-check"></i>Supported Feature</li>
                        <li><i className="fa-solid fa-circle-check"></i>Supported Feature</li>
                        <li><i className="fa-solid fa-circle-check"></i>Supported Feature</li>
                        <li><i className="fa-solid fa-circle-xmark"></i>Unsupported Feature</li>
                        <li><i className="fa-solid fa-circle-xmark"></i>Unsupported Feature</li>
                    </ul>
                    <ul className="social">
                        <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                        <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                    </ul>
                </div>
            </div>
            <div className='box'>
                <div className='basic-info'>

                    <div className="options">
                        <div className='mainSchedule'>
                            <span>여행 주요일정</span>
                            <a href="#">항공 여정 보기</a> &nbsp;
                            <a href="#">다른 출발일 선택</a>
                        </div>
                        <div className='basic-info'>
                        <ul>
                            <li><p>일정</p></li>
                            <li><p>여행도시</p></li>
                            <li><p>예약현황</p></li>
                        </ul>
                        <hr />
                        </div>
                    </div>


                    <span>상품가격</span>
                    <table className='priceTable'>
                        <tr>
                            <th>구분</th>
                            <th>성인</th>
                            <th>아동</th>
                            <th>유아</th>
                        </tr>
                        <tr>
                            <td>기본상품</td>
                            <td>원</td>
                            <td>원</td>
                            <td>원</td>
                        </tr>
                    </table>
                    <ul>
                        <li>유류할증료 및 제세공과금은 유가와 환율에 따라 변동될 수 있습니다.</li>
                        <li>아동, 유아요금은 성인 2인과 같은 방 사용조건이며, 미충족시 아동추가 요금이 발생합니다.</li>
                        <li>1인 객실 사용시 추가요금 발생됩니다.</li>
                        <li>1인 객실 사용료 : 140,000원</li>
                        
                    </ul>
                    <hr />
                    <div>
                        <span>테마소개</span>
                        <div><img src='' alt='광고배너'></img></div>
                        <div>
                            <ul>핵심포인트</ul>
                            <div>

                            </div>

                        </div>
                    </div>
                </div>




            </div>
        </div>

    );
};

export default ProductDetails;
