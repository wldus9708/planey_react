import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import '../../BBS/patment/PaymentCss.css'; // CSS 파일 import


export function SuccessPage() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // 컴포넌트 함수 내에서 호출
  const user = searchParams.get("member_id"); // 쿼리 파라미터에서 user 데이터를 파싱
  const rentCar = searchParams.get("rentCar"); // 쿼리 파라미터에서 user 데이터를 파싱
  const paymentKey = searchParams.get("paymentKey");
  const product_id = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  console.log("product_id:" + product_id);

  const formattedAmount = Number(amount).toLocaleString(); // 금액에 천 단위 쉼표 추가

  useEffect(() => {
    if (!user || !rentCar || !paymentKey || !product_id || !amount) {
      // navigate("/"); // 필요한 정보가 없으면 홈으로 리다이렉트
    } else {
      // 현재 상태를 변경하여 뒤로가기를 방지
      window.history.replaceState(null, document.title, window.location.pathname);
    }
  }, [user, rentCar, paymentKey, product_id, amount, navigate]);

  const saveRentCarReservation = async (reservationData) => {
    console.log("예약 데이터 전송 중:", reservationData); // 로그 추가
    try {
      const response = await fetch('http://localhost:8988/payment/saveRentCarReservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData)
      });

      if (response.ok) {
        console.log('렌트카 예약이 성공적으로 처리되었습니다.');
      } else {
        console.error('렌트카 예약 정보를 저장하는데 실패했습니다:', response.statusText);
      }
    } catch (error) {
      console.error('렌트카 예약 정보를 저장하는 중 오류 발생:', error);
    }
  };

  const confirmPayment = useCallback(async () => {
    if (!user) {
      console.error('사용자 정보가 없습니다.');
      return;
    } else {
      console.log("사용자 아이디: " + user);
      console.log("차: " + rentCar);
      console.log("paymentKey: " + paymentKey);
      console.log("orderId:" + product_id);
      console.log("amount:" + amount);
    }
    try {
      const response = await fetch("http://localhost:8988/payment/detailRentCar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          paymentKey,
          product_id,
          amount,
          member_id: user,
          product_type: rentCar,
        })
      });

      if (response.ok) {
        setIsConfirmed(true);
        // 결제 성공 시 예약 정보 저장

        const rentCarId = parseInt(product_id.replace('order_', ''), 10);
        saveRentCarReservation({
          memberId: parseInt(user, 10), // Long 타입으로 변환
          rentCarId: isNaN(rentCarId) ? 0 : rentCarId,
          relationship: 10001,
          rentalStartDate: new Date().toISOString(),
          rentalEndDate:new Date().toISOString(),
          rentalPrice:parseInt(amount, 10),
          reservationStatus: "COMPLETED",
          carInsurance: "STANDARD_INSURANCE",
        });
      } else {
        console.error('결제 승인 실패:', response.statusText);
      }
    } catch (error) {
      console.error('결제 승인 중 오류 발생:', error);
    }
  }, [paymentKey, product_id, amount, user, rentCar]);

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
