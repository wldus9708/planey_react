import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import './PaymentCss.css'; // CSS 파일 import

export function SuccessPage() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // 컴포넌트 함수 내부에서 호출
  const user = searchParams.get("member_id"); // 쿼리 파라미터에서 user 데이터를 파싱
  const restaurant = searchParams.get("restaurant"); // 쿼리 파라미터에서 user 데이터를 파싱
  const paymentKey = searchParams.get("paymentKey");
  const product_id = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  const formattedAmount = Number(amount).toLocaleString(); // 금액에 천 단위 쉼표 추가

  useEffect(() => {
    if (!user || !restaurant || !paymentKey || !product_id || !amount) {
      navigate("/"); // 필요한 정보가 없으면 홈으로 리다이렉트
    } else {
      // 현재 상태를 변경하여 뒤로가기를 방지
      window.history.replaceState(null, document.title, window.location.pathname);
    }
  }, [user, restaurant, paymentKey, product_id, amount, navigate]);

  const saveRestaurantReservation = async (reservationData) => {
    try {
      const response = await fetch(`http://localhost:8988/payment/saveRestaurantReservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reservationData)
      });

      if (response.ok) {
        console.log('레스토랑 예약이 성공적으로 처리되었습니다.');
      } else {
        console.error('레스토랑 예약 정보를 저장하는데 실패했습니다:', response.statusText);
      }
    } catch (error) {
      console.error('레스토랑 예약 정보를 저장하는데 실패했습니다:', error);
    }
  };

  const confirmPayment = useCallback(async () => {
    if (!user) {
      console.error('사용자 정보가 없습니다.');
      return;
    } else {
      console.log("사용자 아이디" + user);
      console.log("레스토랑" + restaurant);
      console.log("paymentKey: " + paymentKey);
      console.log("orderId:" + product_id);
      console.log("amount:" + amount);
    }
    try {
      const response = await fetch("http://localhost:8988/payment/detail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          paymentKey,
          product_id,
          amount,
          member_id: user,
          product_type: restaurant,
        })
      });
  
      if (response.ok) {
        setIsConfirmed(true);
        const reservationData = {
          restaurantId: parseInt(product_id.replace('order_', '')), // 문자열을 숫자로 변환
          memberId: parseInt(user), // 문자열을 숫자로 변환
          relationshipId: 10001,
          restResDate: new Date().toISOString(), // 현재 시간
          restResTime: new Date().toISOString(), // 예약 시간 추가
          restResCapacity: 1, // 총 인원 (필요에 따라 수정)
          restResPrice: parseInt(amount), // 문자열을 숫자로 변환
          reservationStatus: "COMPLETED",
        };
        await saveRestaurantReservation(reservationData);
      } else {
        console.error('결제 승인 실패:', response.statusText);
      }
    } catch (error) {
      console.error('결제 승인 중 오류 발생:', error);
    }
  }, [paymentKey, product_id, amount, user, restaurant]);

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
                {product_id}
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

export default SuccessPage;
