import styles from "./Cart.module.css";
import Navbar from "../../CKH/Components/Navbar/Navbar";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Cart = () => {
  const [cookies] = useCookies(["accessToken"]);
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [discount, setDiscount] = useState(0);

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

  // 수량 변경 핸들러
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
    if (product.category === "lodgingDetail" || product.category === "flightDetail") {
      return (product.price * product.count) + (product.children * product.price * 0.5); // 어린이 가격은 성인 가격의 50%
    } else {
      return product.price * product.count;
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "3rem" }}></div>
      <div className={styles.body}>
        <div className={styles.cart_title_wrap}>
          <div className={styles.tab_title}>
            <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
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
              </div>
              {/* 상품 설명 */}

              {/* 수량 */}
              {product.category === "lodgingDetail" || product.category === "flightDetail" ? (
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
              {/* 가격 */}

              {/* 삭제 버튼 */}
              <div className={styles.product_remove}>
                <img
                  src="/images/icon-delete.svg"
                  alt="delete"
                  onClick={() => handleDelete(product.cartProductId, index)}
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
          <button className={styles.btn_submit}>주문하기</button>
        </div>
      </div>
    </>
  );
};
export default Cart;
