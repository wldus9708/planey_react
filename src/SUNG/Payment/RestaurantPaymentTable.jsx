import axios from 'axios';
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import styles from "./PaymentTable.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronUp, faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import RestaruantPaymentDetail from '../../YOUNG/PaymentDetail/RestaurantpaymentDetail'
import { useCookies } from 'react-cookie';

const TABLE_HEADS = [
    "상품이름",
    "일정",
    "결제금액",
    "상세",
    "삭제"
];

const RestaurantPaymentTable = ({ endpoint }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [totalDataCount, setTotalDataCount] = useState(0);
    const [data, setData] = useState([]);
    const [cookies] = useCookies(['accessToken']);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoadingData(true); // 데이터 로딩 시작
            try {
                const response = await axios.get(endpoint, {
                    headers: {
                        Authorization: `${cookies.accessToken}`
                    }
                });
                console.log('전체 데이터:', response.data);
                const allData = response.data;
                setTotalDataCount(allData.length);

                const startIndex = (currentPage - 1) * 10;
                const endIndex = currentPage * 10;
                const newData = allData ? allData.slice(startIndex, endIndex) : [];
                console.log(startIndex);
                console.log(endIndex);

                if (currentPage === 1) {
                    setData(newData);
                } else {
                    setData(prevData => [...prevData, ...newData]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoadingData(false); // 데이터 로딩 종료
            }
        };

        fetchData();
    }, [currentPage, endpoint]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight &&
                data.length < totalDataCount
            ) {
                setCurrentPage(prevPage => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [data, totalDataCount]);

    useEffect(() => {
        setCurrentPage(1); // 엔드포인트가 바뀔 때 페이지를 초기화
        setData([]); // 데이터 초기화
    }, [endpoint]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        const circleChevronUpIcon = document.querySelector(`.${styles['icon-Circle']}`);
        if (circleChevronUpIcon) {
            circleChevronUpIcon.addEventListener('click', scrollToTop);
        }

        return () => {
            if (circleChevronUpIcon) {
                circleChevronUpIcon.removeEventListener('click', scrollToTop);
            }
        };
    }, []);

    // 김윤영
    const [showModal, setShowModal] = useState(false); 

    const handleOpenModal = () => {
        setShowModal(true); // 모달 열기
    };

    const handleCloseModal = () => {
        setShowModal(false); // 모달 닫기
    };
    // 끝

    return (
        <section className={styles['content-payment-table']}>
            <div className={styles['data-table-diagram']}>
                <table>
                    <thead>
                        <tr>
                            {TABLE_HEADS.map((th, index) => (
                                <th key={index}>{th}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoadingData ? (
                            Array.from({ length: 1 }).map((_, rowIndex) => (
                                <tr key={rowIndex}>
                                    {TABLE_HEADS.map((_, cellIndex) => (
                                        <td key={cellIndex}>
                                            <span className={styles['skeleton-cell']}></span>
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : data.length > 0 ? (
                            data.map((dataItem, index) => (
                                <tr key={index}>
                                    <td className={styles[`column-0`]}>
                                        <Link to={`/restaurantDetail/${dataItem.restId}`}>{dataItem.restName}</Link>
                                    </td>
                                    <td className={styles[`column-1`]}><span>{dataItem.restResDate}</span></td>
                                    <td className={styles[`column-2`]}><span>{dataItem.restResPrice}</span></td>
                                    {/* 결제내역 상세보기 -모달 */}
                                    <td className={styles[`column-3`]}><span>
                                        <FontAwesomeIcon icon={faCirclePlus}
                                         className={styles['icon-Plus']}
                                         onClick={handleOpenModal} />
                                    </span>
                                        <Modal
                                            className={styles['modal-content']}
                                            show={showModal}
                                            onHide={handleCloseModal}
                                            animation={false}
                                            backdrop={false} // 모달 외부 클릭 시 닫히지 않도록 설정
                                            keyboard={false} // ESC 키 등 키보드 입력으로 닫히지 않도록 설정
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title style={{fontSize: '16px'}}>예약내역 상세 정보</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                               <RestaruantPaymentDetail/>
                                            </Modal.Body>
                                        </Modal>

                                    </td>
                                    <td className={styles[`column-4`]}><span><FontAwesomeIcon icon={faCircleMinus} className={styles['icon-Delete']} /></span></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td align="center" colSpan={TABLE_HEADS.length}>
                                    결제내역이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <FontAwesomeIcon icon={faCircleChevronUp} className={styles['icon-Circle']} />
            </div>
        </section>
    );
};

RestaurantPaymentTable.propTypes = {
    endpoint: PropTypes.string.isRequired
};

export default RestaurantPaymentTable;
