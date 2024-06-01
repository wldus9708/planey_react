import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from 'axios';
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
    } else {
      // 현재 상태를 변경하여 뒤로가기를 방지
      window.history.replaceState(null, document.title, window.location.pathname);
    }
  }, [user, paymentKey, orderIds, amount, cartItems, navigate]);

  const saveCartReservation = async (reservationData) => {
    try {
      const response = await axios.post('http://localhost:8988/payment/saveCartReservation', reservationData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
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
        console.log(item.name);
        console.log("Enum: " + item.enum);
        console.log("count: " + item.count);
        console.log("price: " + ((item.price * item.count) + ((item.children || 0) * (item.childrenPrice || 0))));
      });
    }
    try {
      // 각 아이템에 대해 개별적으로 요청을 보냄
      for (const item of cartItems) {
        const orderId = orderIds.find(id => id === item.productId); // 각 아이템에 대해 개별 orderId 생성
        const response = await axios.post("http://localhost:8988/payment/detailCart", {
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
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });

        console.log("사용자 아이디: " + user);
        console.log("paymentKey: " + paymentKey);
        console.log("orderId: " + orderId);
        console.log("amount: " + amount);
        console.log("cartItems:");
        console.log("Enum: " + item.enum);
        console.log("count: " + item.count);
        console.log("count: " + item);
        console.log("price: " + ((item.price * item.count) + ((item.children || 0) * (item.childrenPrice || 0))));

        if (response.status !== 200) {
          console.error('결제 승인 실패:', response.statusText);
          return; // 하나라도 실패하면 중단
        }

        // 각 엔티티에 대한 예약 데이터 생성 및 전송
        switch (item.enum) {
          case 'FLIGHT_ENUM':
            const flightReservation = {
              flightId: orderId, 
              airportId: item.airportId, // x
              memberId: parseInt(user, 10), // Long 타입으로 변환
              relationship: 10001,
              fli_res_name: item.name, //x
              fli_res_price: item.price,
              fli_state: "BEFORE_DEPARTURE", // item.fli_state 대신 item.flightState 사용
              fli_res_state: 'COMPLETED',
              fli_res_capacity: item.count+item.children,
            };
            console.log('Flight Reservation Data:', flightReservation);
            await saveFlightReservation(flightReservation);
            break;
          case 'LODGING_ENUM':
            const lodgingReservation = {
              memberId: parseInt(user, 10), // Long 타입으로 변환
              lodgingId: orderId,
              relationship: 10001,
              lodDepartureDate: new Date().toISOString(), // ISO 8601 형식의 문자열
              lodArrivalDate: new Date().toISOString(), // ISO 8601 형식의 문자열
              lodResTime: new Date().toISOString(), // ISO 8601 형식의 문자열
              lodResCapacity: 1, // 총 인원 (예시로 1명 설정)
              lodResPrice: parseInt(amount, 10), // Integer 타입으로 변환
              lodResState: "COMPLETED",
            };
            console.log('Lodging Reservation Data:', lodgingReservation);
            await saveLodgingReservation(lodgingReservation);
            break;
          case 'CARS_ENUM':
            const carRentalReservation = {
              memberId: parseInt(user, 10), // Long 타입으로 변환 // o
              car: orderId, // o
              relationship: 10001,
              rentalStartDate: item.rentalStartDate,
              rentalEndDate: item.rentalEndDate,
              rentalPrice: parseInt(amount, 10),
              reservationStatus: "COMPLETED",
              carInsurance: "STANDARD_INSURANCE",
            };
            console.log('Car Rental Reservation Data:', carRentalReservation);
            await saveCarRental(carRentalReservation);
            break;
          case 'RESTAURANT_ENUM':
            const restaurantReservation = {
              restaurantId: parseInt(orderId, 10), // 문자열을 숫자로 변환
              memberId: parseInt(user, 10), // 문자열을 숫자로 변환
              relationshipId: 10001,
              restResDate: new Date().toISOString(), // 현재 시간
              restResTime: new Date().toISOString(), // 예약 시간 추가
              restResCapacity: 1, // 총 인원 (필요에 따라 수정)
              restResPrice: parseInt(amount, 10), // 문자열을 숫자로 변환
              reservationStatus: "COMPLETED",
            };
            console.log('Restaurant Reservation Data:', restaurantReservation);
            await saveRestaurantReservation(restaurantReservation);
            break;
          default:
            console.error('알 수 없는 상품 유형:', item.enum);
        }
      }

      // 결제가 성공되면 예약을 저장
      // await는 비동기 함수가 완료될 때까지 기다리는 역할을 합니다.
      // 여기서는 saveCartReservation 함수가 완료될 때까지 기다립니다.
      const cartReservation = {
        paymentKey,
        orderIds,
        amount: parseInt(amount, 10),
        member_id: parseInt(user, 10),
        cartItems
      };
      console.log('Cart Reservation Data:', cartReservation);
      await saveCartReservation(cartReservation);

      setIsConfirmed(true);
    } catch (error) {
      console.error('결제 승인 중 오류 발생:', error);
    }
  }, [paymentKey, orderIds, amount, user, cartItems]);

  // 각 엔티티에 대한 예약 저장 함수
  const saveFlightReservation = async (reservationData) => {
    try {
      const response = await axios.post(`http://localhost:8988/payment/saveFlightReservation`, reservationData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        console.log('항공 예약이 성공적으로 처리되었습니다.');
      } else {
        console.error('항공 예약 정보를 저장하는데 실패했습니다:', response.statusText);
      }
    } catch (error) {
      console.error('항공 예약 정보를 저장하는데 실패했습니다:', error);
    }
  };

  const saveLodgingReservation = async (reservationData) => {
    try {
      const response = await axios.post(`http://localhost:8988/payment/saveLodgingReservation`, reservationData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        console.log('숙박 예약이 성공적으로 처리되었습니다.');
      } else {
        console.error('숙박 예약 정보를 저장하는데 실패했습니다:', response.statusText);
      }
    } catch (error) {
      console.error('숙박 예약 정보를 저장하는데 실패했습니다:', error);
    }
  };

  const saveCarRental = async (reservationData) => {
    try {
      const response = await axios.post(`http://localhost:8988/payment/saveRentCarReservation`, reservationData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        console.log('차량 대여 예약이 성공적으로 처리되었습니다.');
      } else {
        console.error('차량 대여 예약 정보를 저장하는데 실패했습니다:', response.statusText);
      }
    } catch (error) {
      console.error('차량 대여 예약 정보를 저장하는데 실패했습니다:', error);
    }
  };

  const saveRestaurantReservation = async (reservationData) => {
    try {
      const response = await axios.post(`http://localhost:8988/payment/saveRestaurantReservation`, reservationData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        console.log('식당 예약이 성공적으로 처리되었습니다.');
      } else {
        console.error('식당 예약 정보를 저장하는데 실패했습니다:', response.statusText);
      }
    } catch (error) {
      console.error('식당 예약 정보를 저장하는데 실패했습니다:', error);
    }
  };

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
                href="/"
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
