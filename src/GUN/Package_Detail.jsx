import React, { useState } from 'react';
import Style from './style.css'
import Payment from './components/payment';



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
                        <li><i className="fa-solid fa-circle-check"></i>패키지 날짜</li>
                        <li><i className="fa-solid fa-circle-check"></i>기온</li>
                        <li><i className="fa-solid fa-circle-check"></i>풍량</li>
                        <li><i className="fa-solid fa-circle-xmark"></i>강수</li>
                        <li><i className="fa-solid fa-circle-xmark"></i>여기에 기상청 테이블</li>
                    </ul>
                </div>
            </div>
            <div className='box1'>
                <div className='images'>
                    <div className='basic-info'>
                        <h3>상품가격</h3>
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
                        <div className='description'>
                            <ul>
                                <li><p>유류할증료 및 제세공과금은 유가와 환율에 따라 변동될 수 있습니다.</p></li>
                                <li><p>아동, 유아요금은 성인 2인과 같은 방 사용조건이며, 미충족시 아동추가 요금이 발생합니다.</p></li>
                                <li><p>1인 객실 사용시 추가요금 발생됩니다.</p></li>
                                <li><p>1인 객실 사용료 : 원</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Payment></Payment>
            </div>
            <div className='box2'>
                <div className='basic-info'>
                    <h3>패키지 구성</h3>
                </div>
                <br />
                <div className='basic-info'>
                    <table className='tripSchedule'>
                        <tr>
                            <th>MON</th>
                            <th>TUE</th>
                            <th>WED</th>
                            <th>THU</th>
                            <th>FRI</th>
                            <th>SAT</th>
                            <th>SUN</th>
                        </tr>
                        <tr>
                            <td><img src='images/Hanra.png' alt='monPic' /></td>
                            <td><img src='images/Hanra.png' alt='tuePic' /></td>
                            <td><img src='images/Hanra.png' alt='wedPic' /></td>
                            <td><img src='images/Hanra.png' alt='thuPic' /></td>
                            <td><img src='images/Hanra.png' alt='friPic' /></td>
                            <td><img src='images/Hanra.png' alt='satPic' /></td>
                            <td><img src='images/Hanra.png' alt='sunPic' /></td>
                        </tr>
                        <tr>
                            <td><p>한라산</p></td>
                            <td><p>한라산</p></td>
                            <td><p>한라산</p></td>
                            <td><p>한라산</p></td>
                            <td><p>한라산</p></td>
                            <td><p>한라산</p></td>
                            <td><p>한라산</p></td>
                        </tr>
                    </table>
                    <div className='basic-info'>
                        <h3>숙소</h3>
                    </div>
                    <div className='basic-info'>
                        <h3>이동수단</h3>
                    </div>
                    <div className='basic-info'>
                        <h3>레스토랑</h3>
                    </div>
                </div>
            </div>
            <div className='box2'>
                <div className="product-details-container">
                    {/* Payment 컴포넌트 우측에 배치 */}
                    <div className="product-details">
                        <div className='mainSchedule'>
                            <h3>여행 주요일정</h3>
                            <a href="#">항공 여정 보기</a> &nbsp;
                            <a href="#">다른 출발일 선택</a>
                        </div>
                        <div className='basic-info'>
                            <div>
                                <table>
                                    <tr>
                                        <th>일정</th>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <th>여행도시</th>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <th>예약현황</th>
                                        <td>3</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="payment-container">
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductDetails;
