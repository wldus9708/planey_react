import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './PackageHead.module.css';
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import NavBar from "../../CKH/Components/Navbar/Navbar"
import { handleNavItemClick } from "./../../CKH/Components/Navbar/Navbar";
import useUser from "../../BBS/Log/useUser";

const PackageHead = () => {
    const [data, setData] = useState([]);
    const navigator = useNavigate();
    const [cookies] = useCookies(['accessToken']);
    let { id } = useParams();
    const [packageTour, setPackgeTour] = useState(null);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [paymentInfo, setPaymentInfo] = useState(null);
    const user = useUser();
    const navigate = useNavigate();

    // 이미지 목록을 위한 상태 추가
    const [imageList, setImageList] = useState([
        'images/pack01.png'
    ]);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8988/PackageTour/detail/${id}`)
            .then((response) => {
                if (response.data) {
                    setPackgeTour(response.data); // 패키지 정보 설정
                    // console.log(response.data);
                }
                setActiveImageIndex(0); // 초기 인덱스 설정
            })
            .catch(error => {
                console.log('이미지 이름을 가져오는 중 오류 발생:', error);
            })

    }, [id]);

    const addToCart = async () => {
        await axios.post(`http://localhost:8988/cart/insert?productId=${id}`, {}, {
            headers: {
                Authorization: cookies.accessToken
            }
        })
        .then((response) => {
            // console.log(response);
            alert(response.data.message);
        })
        .catch((err) => {
            // console.log(err);
        })
    };
    const handleAddToCartClick = () => {
        addToCart();
        handleNavItemClick(user, cookies, 'CART_ADD', null, navigate);
      };
      
      const handleBuyNowClick = () => {
        handleNavItemClick(user, cookies, 'PAYMENT', null, navigate);
      };

    return (
        <div className={styles.LodgingBody}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.lodgingDiv}>
                        <div className={styles.lodgingDivLeft}>
                            <div className={styles.imgContainer}>
                            <img
                                    src={packageTour && packageTour[`image0${activeImageIndex + 1}`] ? `/images/${packageTour[`image0${activeImageIndex + 1}`]}` : null}
                                    alt={`images${activeImageIndex + 1}`}
                                />
                            </div>
                            <div className={styles.packDetailhoverContainer}>
                                {[1, 2, 3, 4, 5].map(index => (
                                    <div
                                        key={index}
                                        className={styles.packDetailactive}
                                        onMouseOver={() => setActiveImageIndex(index - 1)}
                                    >
                                        <img
                                            src={packageTour && packageTour[`image0${index}`] ? `/images/${packageTour[`image0${index}`]}` : null}
                                            alt={`images${index}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.lodgingDivRight}>

                            <div className={styles.lodgingHeader}>
                                <span className={styles.lodgingName}>
                                    {packageTour && packageTour.tour_pack_name}
                                </span>
                                <img src="/images/star.png" alt="star" className={styles.starImage} />
                                <span className={styles.lodgingRating}>&nbsp;&nbsp;5.0</span>
                            </div>

                            <hr />
                            <br />
                            <span className={styles.lodgingAddress}>목적지 : {packageTour && packageTour.tourPackCity} </span>
                            <br />
                            <span className={styles.lodgingSchdule}>여행일정 : &nbsp; {packageTour && packageTour.tourPackEndDate} ~ {packageTour && packageTour.tourPackStartDate} </span>
                            <br />
                            <span className={styles.lodgingPrice}> {packageTour && packageTour.price.toLocaleString()}원</span>

                            <p className={styles.lodgingDescription}>
                            {packageTour && packageTour.tour_pack_description}
                            </p>
                            <div className={styles.btnGroups}>
                                <button type="button" onClick={handleAddToCartClick} className={styles.addCartBtn}>
                                    <i className='fas fa-shopping-cart'></i>
                                    장바구니 추가
                                </button>
                                <button type="button" className={styles.buyNowBtn} onClick={handleBuyNowClick}>
                                    <i className='fas fa-wallet'></i>
                                    예약 하러 가기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default PackageHead;