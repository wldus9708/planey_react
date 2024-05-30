import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import './PaymentCss.css'; // CSS 파일 import

export function SuccessCartPage() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // 컴포넌트 함수 내에서 호출
  const user = searchParams.get("member_id"); // 쿼리 파라미터에서 user 데이터를 파싱
  const paymentKey = searchParams.get("paymentKey");
  const orderIds = JSON.parse(decodeURIComponent(searchParams.get("orderIds"))); // 배열로 파싱
  const amount = searchParams.get("amount");
  let cartItems = searchParams.get("cartItems");

  try {
    cartItems = cartItems ? JSON.parse(decodeURIComponent(cartItems)) : [];
  } catch (error) {
    console.error('장바구니 아이템 파싱 중 오류 발생:', error);
    cartItems = [];
  }

  const formattedAmount = Number(amount).toLocaleString(); // 금액에 천 단위 쉼표 추가

  useEffect(() => {
    if (!user || !paymentKey || !orderIds || !amount || cartItems.length === 0) {
      navigate("/"); // 필요한 정보가 없으면 홈으로 리다이렉트
      console.error('필요한 정보가 부족합니다.');
      if (!user) console.error('사용자 정보가 없습니다.');
      if (!paymentKey) console.error('paymentKey 정보가 없습니다.');
      if (!orderIds) console.error('orderIds 정보가 없습니다.');
      if (!amount) console.error('amount 정보가 없습니다.');
      if (cartItems.length === 0) console.error('cartItems 정보가 없습니다.');
      // navigate("/"); // 필요한 정보가 없으면 홈으로 리다이렉트
    } else {
      // 현재 상태를 변경하여 뒤로가기를 방지
      window.history.replaceState(null, document.title, window.location.pathname);
    }
  }, [user, paymentKey, orderIds, amount, cartItems, navigate]);

  const saveCartReservation = async (reservationData) => {
    try {
      const response = await fetch(`http://localhost:8988/payment/saveCartReservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reservationData)
      });

      if (response.ok) {
        console.log('장바구니 예약이 성공적으로 처리되었습니다.');
      } else {
        console.error('장바구니 예약 정보를 저장하는데 실패했습니다:', response.statusText);
      }
    } catch (error) {
      console.error('장바구니 예약 정보를 저장하는데 실패했습니다:', error);
    }
  };

  const confirmPayment = useCallback(async () => {
    if (!user) {
      console.error('사용자 정보가 없습니다.');
      return;
    } else {
      console.log("사용자 아이디: " + user);
      console.log("paymentKey: " + paymentKey);
      console.log("orderIds: " + orderIds);
      console.log("amount: " + amount);
      console.log("cartItems:");
      cartItems.forEach(item => {
        console.log("Enum: " + item.enum);
        console.log("count: " + item.count);
        console.log("price: " + ((item.price * item.count) + ((item.children || 0) * (item.childrenPrice || 0))));
      });
    }
    try {
      // 각 아이템에 대해 개별적으로 요청을 보냄
      for (const item of cartItems) {
        const orderId = orderIds.find(id => id === item.productId); // 각 아이템에 대해 개별 orderId 생성
        const response = await fetch("http://localhost:8988/payment/detailCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: parseInt(amount),
            member_id: parseInt(user),
            cartItems: [{
              product_type: item.enum,
              count: item.count,
              childrenCount: item.children || 0, // 어린이 수를 포함
              price: (item.price * item.count) + ((item.children || 0) * (item.childrenPrice || 0)) // 어린이 가격 포함
            }]
          })
        });

        console.log("사용자 아이디: " + user);
        console.log("paymentKey: " + paymentKey);
        console.log("orderId: " + orderId);
        console.log("amount: " + amount);
        console.log("cartItems:");
        console.log("Enum: " + item.enum);
        console.log("count: " + item.count);
        console.log("price: " + ((item.price * item.count) + ((item.children || 0) * (item.childrenPrice || 0))));

        if (!response.ok) {
          console.error('결제 승인 실패:', response.statusText);
          return; // 하나라도 실패하면 중단
        }
      }

      setIsConfirmed(true);
    } catch (error) {
      console.error('결제 승인 중 오류 발생:', error);
    }
  }, [paymentKey, orderIds, amount, user, cartItems]);

  return (
    <div className="wrapper w-100 bbsToss">
      {isConfirmed ? (
        <div
          className="flex-column align-center confirm-success w-100 max-w-540"
          style={{
            display: "flex"
          }}
        >
          <img
            src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
            width="120"
            height="120"
          />
          <h2 className="title">결제를 완료했어요</h2>
          <div className="response-section w-100">
            <div className="flex justify-between">
              <span className="response-label">결제 금액</span>
              <span id="amount" className="response-text">
                {formattedAmount}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="response-label">주문번호</span>
              <span id="orderId" className="response-text">
                {orderIds.join(', ')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="response-label">paymentKey</span>
              <span id="paymentKey" className="response-text">
                {paymentKey}
              </span>
            </div>
          </div>

          <div className="w-100 button-group">
            <div className="flex" style={{ gap: "16px" }}>
              <a
                className="btn w-100"
                href="http://localhost:3000/mypage"
              >
                마이페이지로 가기
              </a>
              <a
                className="btn w-100"
                href="http://localhost:3000/"
                target="_blank"
                rel="noopner noreferer"
              >
                홈으로 가기
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-column align-center confirm-loading w-100 max-w-540">
          <div className="flex-column align-center">
            <img
              src="https://static.toss.im/lotties/loading-spot-apng.png"
              width="120"
              height="120"
            />
            <h2 className="title text-center">결제 요청 성공</h2>
            <h4 className="text-center description">결제 승인하고 완료해보세요.</h4>
          </div>
          <div className="w-100">
            <button className="btn primary w-100" onClick={confirmPayment}>
              결제 승인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SuccessCartPage;
