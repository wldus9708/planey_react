import styles from "./Cart.module.css";
import Navbar from "../../CKH/Components/Navbar/Navbar";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { handleNavItemClick } from "./../../CKH/Components/Navbar/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';

export const Cart = () => {
  const [cookies] = useCookies(["accessToken"]);
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [user, setUser] = useState(null); // 사용자 정보를 저장할 상태 추가
  const navigate = useNavigate();
  console.log(data);

  // 사용자 정보 가져오기
  useEffect(() => {
    if (cookies.accessToken) {
      axios.get('http://localhost:8988/member/detailPage', {
        headers: {
          Authorization: `${cookies.accessToken}`,
        },
      })
        .then((response) => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('사용자 정보 가져오는 중 오류 발생:', error);
        });
    } else {
      navigate('/login');
      alert("결제 전에 로그인을 해주세요.");
    }
  }, [cookies.accessToken, navigate]);

  // 장바구니 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8988/cart/list", {
          headers: {
            Authorization: cookies.accessToken
          }
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [cookies.accessToken]);

  // 할인 금액 계산
  useEffect(() => {
    const calculateDiscount = () => {
      let totalDiscount = 0;
      selectedItems.forEach(index => {
        const product = data[index];
        if (product.category === "PackageDetail") {
          totalDiscount += Number(product.price * product.count * (product.discount / 100));
        }
      });
      setDiscount(totalDiscount);
    };

    calculateDiscount();
  }, [selectedItems, data]);

  // 수량 변경 
  const handleCountChange = async (index, delta, type) => {
    const updatedData = [...data];
    const newCount = updatedData[index][type] + delta;
    if (newCount < 1) return; // 수량이 0 이하 방지
    try {
      await axios.put(`http://localhost:8988/cart/update`, {
        cartProductId: updatedData[index].cartProductId,
        type: type,
        count: newCount
      });
      updatedData[index][type] = newCount;
      setData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (index) => {
    const updatedSelectedItems = [...selectedItems];
    if (updatedSelectedItems.includes(index)) {
      const itemIndex = updatedSelectedItems.indexOf(index);
      updatedSelectedItems.splice(itemIndex, 1);
    } else {
      updatedSelectedItems.push(index);
    }
    setSelectedItems(updatedSelectedItems);
    setSelectAll(updatedSelectedItems.length === data.length);
  };

  // 삭제 핸들러
  const handleDelete = async (cartProductId, index) => {
    try {
      await axios.delete(`http://localhost:8988/cart/delete?cartProductId=${cartProductId}`, {
        headers: {
          Authorization: cookies.accessToken
        }
      });
      const updatedData = data.filter((_, i) => i !== index);
      setData(updatedData);
      const updatedSelectedItems = selectedItems.filter((i) => i !== index).map(i => i > index ? i - 1 : i);
      setSelectedItems(updatedSelectedItems);
    } catch (error) {
      console.log(error);
    }
  };

  // 전체 선택 핸들러
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const allIndices = data.map((_, index) => index);
      setSelectedItems(allIndices);
    }
    setSelectAll(!selectAll);
  };

  // 총 가격 계산
  const getTotalPrice = () => {
    return selectedItems.reduce((total, index) => total + getPrice(index), 0);
  };

  // 개별 상품 가격 계산
  const getPrice = (index) => {
    const product = data[index];
    const childrenCount = product.children || 0; // 어린이 수를 0으로 초기화
    if (product.category === "lodgingDetail" || product.category === "airportDetail") {
      return (product.price * product.count) + (childrenCount * product.price * 0.5); // 어린이 가격은 성인 가격의 50%
    } else {
      return product.price * product.count;
    }
  };

  // 결제 성공 시 예약 데이터 저장 함수
  const saveCartReservation = (reservationData) => {
    axios.post(`http://localhost:8988/payment/saveCartReservation`, reservationData)
      .then(response => {
        if (response.data) {
          console.log('장바구니 예약이 성공적으로 처리되었습니다.');
        }
      })
      .catch(error => {
        console.error('장바구니 예약 정보를 저장하는데 실패했습니다:', error);
      });
  };

  // 결제 성공 처리 함수
  const handlePaymentSuccess = (amount) => {
    const reservationData = {
      memberId: user.id,
      cartItems: selectedItems.map(index => data[index]),
      totalAmount: amount,
      reservationDate: new Date(),
      reservationState: "COMPLETED",
    };
    saveCartReservation(reservationData);
  };

  // 결제 요청 함수
  const handlePayment = () => {
    const totalAmount = getTotalPrice() - discount;
    
    if (totalAmount <= 0) {
      alert("결제할 상품을 선택해 주세요.");
      return;
    }

    // productId가 있는지 확인하고, 없으면 오류 메시지를 출력
    const orderIds = selectedItems.map(index => {
      const item = data[index];
      if (!item || !item.productId) {
        console.error("오류: 상품 정보가 올바르지 않습니다.", item);
        return null; // 또는 적절한 기본값 설정
      }
      return item.productId;
    }).filter(id => id !== null); // null 값을 제거

    if (orderIds.length === 0) {
      alert("유효한 상품이 선택되지 않았습니다.");
      return;
    }

    const cartItemsData = selectedItems.map(index => {
      const item = data[index];
      return {
        productId: item.productId,
        cartProductId: item.cartProductId, // cartProductId 추가
        category: item.category,
        enum: item.enum,
        count: item.count,
        price: item.price,
        children: item.children || 0,
        childrenPrice: (item.price / 2),
        name: item.name,
        departurePlace: item.departurePlace,
        airportId: item.airportId,
        startDate: item.startDate,
        endDate: item.endDate,
      };
    });

    // orderId를 적절한 형식으로 변환
    const orderId = `order_${orderIds.join('_')}`.substring(0, 64);

    const successUrl = `http://localhost:3000/PaymentSuccessCart?member_id=${user.id}&orderIds=${encodeURIComponent(JSON.stringify(orderIds))}&cartItems=${encodeURIComponent(JSON.stringify(cartItemsData))}`;

    const clientKey = 'test_ck_EP59LybZ8BvQWvXPnDEW86GYo7pR';
    loadTossPayments(clientKey)
      .then(tossPayments => {
        tossPayments.requestPayment('CARD', {
          amount: totalAmount,
          orderId: orderId, // 적절한 형식의 orderId 사용
          orderName: '장바구니 결제',
          successUrl: successUrl,
          failUrl: "http://localhost:3000/PaymentFail",
        })
        .then((response) => {
          if (response.success) {
            handlePaymentSuccess(response.amount);
          }
        })
        .catch((error) => {
          console.error('결제 중 오류 발생:', error);
          alert("결제 실패.");
        });
      })
      .catch(error => {
        console.error('토스페이먼츠 로딩 중 오류 발생:', error);
        alert("결제 애플리케이션 로딩 실패.");
      });
  };
  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
  };
  const handleMultipleClicks = (cartProductId, index, user, cookies, navigate) => {
    handleDelete(cartProductId, index);
    handleNavItemClick(user, cookies, 'CART_DELETE', null, navigate);
  };
  const handleScrollToTopAndNavItemClick = () => {
    scrollToTop();
    handleNavItemClick(user, cookies, 'CART_SCROLLTOP', null, navigate);
  };


  return (
    <>
      <Navbar />
      <div style={{ padding: "3rem" }}></div>
      <div className={styles.body}>
        <div className={styles.cart_title_wrap}>
          <div className={styles.tab_title}>
            <input type="checkbox" checked={selectAll} onChange={handleSelectAll} onClick={() => handleNavItemClick(user, cookies, 'CART_CHECK', null, navigate)} />
            <span>상품정보</span>
            <span>수량</span>
            <span>상품금액</span>
            <p>전체선택</p>
          </div>
        </div>

        {data.map((product, index) => (
          <section key={index} className={styles.cart_product_list}>
            <div className={styles.cart_product_wrap}>
              <input
                type="checkbox"
                checked={selectedItems.includes(index)}
                onChange={() => handleCheckboxChange(index)}
                onClick={() => handleNavItemClick(user, cookies, 'CART_CHECK', null, navigate)}
              />

              {/* 상품 이미지 */}
              <Link to={`/${product.category}/${product.productId}`}>
                <div className={styles.cart_product_image}>
                  <img src={`/images/${product.productImage}`} alt="product-img" />
                </div>
              </Link>
              {/* 상품 이미지 */}

              {/* 상품 설명 */}
              <div className={styles.cart_product_info}>
                <p className={styles.product_name}>{product.name}</p>
                <p className={styles.price}>{product.price.toLocaleString()}원</p>
                <p className={styles.startDate}>{product.startDate ? product.startDate.split('T')[0] : ''} {product.endDate ? `~ ${product.endDate.split('T')[0]}` : ''}</p>
              </div>
              {/* 상품 설명 */}

              {/* 수량 */}
              {product.category === "lodgingDetail" || product.category === "airportDetail" ? (
                <>
                  <div className={styles.cart_product_count}>
                    <p>성인</p>
                    <img
                      className={styles.minus}
                      src="/images/icon-minus-line.svg"
                      alt="minus"
                      onClick={() => handleCountChange(index, -1, 'count')}
                    />
                    <div className={styles.count}>
                      <span>{product.count}</span>
                    </div>
                    <img
                      className={styles.plus}
                      src="/images/icon-plus-line.svg"
                      alt="plus"
                      onClick={() => handleCountChange(index, 1, 'count')}
                    />
                  </div>
                  <div className={styles.cart_product_count}>
                    <p>어린이<span>(50% 할인)</span></p>
                    <img
                      className={styles.minus}
                      src="/images/icon-minus-line.svg"
                      alt="minus"
                      onClick={() => handleCountChange(index, -1, 'children')}
                    />
                    <div className={styles.count}>
                      <span>{product.children}</span>
                    </div>
                    <img
                      className={styles.plus}
                      src="/images/icon-plus-line.svg"
                      alt="plus"
                      onClick={() => handleCountChange(index, 1, 'children')}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.cart_product_count}>
                    <img
                      className={styles.minus}
                      src="/images/icon-minus-line.svg"
                      alt="minus"
                      onClick={() => handleCountChange(index, -1, 'count')}
                    />
                    <div className={styles.count}>
                      <span>{product.count}</span>
                    </div>
                    <img
                      className={styles.plus}
                      src="/images/icon-plus-line.svg"
                      alt="plus"
                      onClick={() => handleCountChange(index, 1, 'count')}
                    />
                  </div>
                  <div></div>
                </>
              )}
              {/* 수량 */}

              {/* 가격 */}
              <div className={styles.cart_product_price}>
                <p className={styles.total_price}>{getPrice(index).toLocaleString()}원</p>
              </div>
              {/* 가 */}

              {/* 삭제 버튼 */}
              <div className={styles.product_remove}>
                <img
                  src="/images/icon-delete.svg"
                  alt="delete"
                  onClick={() => handleMultipleClicks(product.cartProductId, index, user, cookies, navigate)}
                />
              </div>
              {/* 삭제 버튼 */}

            </div>
          </section>
        ))}

        <div className={styles.total}>
          <div className={styles.total_price}>
            <p className={styles.cart_product_total_price}>총 상품금액</p>
            <p className={styles.cart_product_price}>{getTotalPrice().toLocaleString()}원</p>
          </div>
          <div className={styles.pay_minus}>
            <img src="/images/icon-minus-line.svg" alt="minus" />
          </div>
          <div className={styles.sale}>
            <p className={styles.cart_product_sale}>상품 할인</p>
            <p className={styles.cart_product_sale_price}>{discount.toLocaleString()}원</p>
          </div>
          <div className={styles.payment}>
            <p className={styles.cart_prouct_payment}>결제 예정 금액</p>
            <p className={styles.cart_prouct_payment_price}>{(getTotalPrice() - discount).toLocaleString()}원</p>
          </div>
          <button className={styles.btn_submit} onClick={handlePayment}>주문하기</button>
        </div>
        <FontAwesomeIcon icon={faCircleChevronUp} className={styles['icon-Circle']} onClick={handleScrollToTopAndNavItemClick} />
      </div>
    </>
  );
};
export default Cart;
