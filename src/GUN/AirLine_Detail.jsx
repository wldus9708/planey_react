import React from 'react';
import Style from './style.css'

const ProductDetails = () => {
    return (
        <div className="container">
            <div className="box">
                <div className="images">
                    <div className="img-holder active">
                        <img src="images/Jeju.png" alt="Headphone" />
                    </div>
                    <div className="img-holder">
                        <img src="images/Jeju01.png" alt="Headphone" />
                    </div>
                    <div className="img-holder">
                        <img src="images/Jeju-Harubang.png" alt="Headphone" />
                    </div>
                    <div className="img-holder">
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
        </div>
    );
};

export default ProductDetails;
