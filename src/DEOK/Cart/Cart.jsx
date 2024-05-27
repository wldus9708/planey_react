import styles from "./Cart.module.css";
import Navbar from "../../CKH/Components/Navbar/Navbar";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

export const Cart = () => {
  const [cookies] = useCookies(["accessToken"]);
  const [data, setData] = useState([]);

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
  }, [cookies.accessToken])

  return (
    <>
      <Navbar />
      <div style={{ padding: "3rem" }}>
      </div>
      <div className={styles.body}>

        <div className={styles.cart_title_wrap}>
          <div className={styles.tab_title}>
            <input type="checkbox" />
            <span>상품정보</span>
            <span>수량</span>
            <span>상품금액</span>

            <p>전체선택</p>
          </div>
        </div>

        {data.map((product, index) => (
          <section className={styles.cart_product_list}>
            <div key={index} className={styles.cart_product_wrap}>
              <input type="checkbox" />
              <div className={styles.cart_product_image}>
                <img src={`/images/${product.productImage}`} alt="product-img" />
              </div>

              <div className={styles.cart_product_info}>
                <p className={styles.product_name}>{product.name}</p>
                <p className={styles.price}>{product.price.toLocaleString()}원</p>
              </div>

              <div className={styles.cart_product_count}>
                <img
                  className={styles.minus}
                  src="/images/icon-minus-line.svg"
                  alt="minus"
                />

                <div className={styles.count}>
                  <span>{product.count}</span>
                </div>
                <img
                  className={styles.plus}
                  src="/images/icon-plus-line.svg"
                  alt="plus"
                />
              </div>

              <div className={styles.cart_product_price}>
                <p className={styles.total_price}>{product.price.toLocaleString()}원</p>
                <button className={styles.btn_submit}>주문하기</button>
              </div>

              <div className={styles.product_remove}>
                <img src="/images/icon-delete.svg" alt="delete" />
              </div>
            </div>
          </section>
        ))}

        <div className={styles.total}>
          <div className={styles.total_price}>
            <p className={styles.cart_product_total_price}>총 상품금액</p>
            <p className={styles.cart_product_price}>0원</p>
          </div>
          <div className={styles.pay_minus}>
            <img src="/images/icon-minus-line.svg" alt="minus" />
          </div>
          <div className={styles.sale}>
            <p className={styles.cart_product_sale}>상품 할인</p>
            <p className={styles.cart_product_sale_price}>0원</p>
          </div>
          <div className={styles.pay_plus}>
            <img src="/images/icon-plus-line.svg" alt="plus" />
          </div>
          <div className={styles.delivery}>
            <p className={styles.cart_product_delivery}>배송비</p>
            <p className={styles.cart_product_delivery_price}>0원</p>
          </div>

          <div className={styles.payment}>
            <p className={styles.cart_prouct_payment}>결제 예정 금액</p>
            <p className={styles.cart_prouct_payment_price}>0원</p>
          </div>
        </div>

      </div>
    </>
  );
};
export default Cart;
