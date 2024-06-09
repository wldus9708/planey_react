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

  const confirmPayment = useCallback(async () => {
    if (!user) {
      console.error('사용자 정보가 없습니다.');
      return;
    }

    const requests = cartItems.map(async (item) => {
      const orderId = orderIds.find(id => id === item.productId);
      try {
        const response = await axios.post("http://localhost:8988/payment/detailCart", {
          paymentKey,
          orderId,
          amount: parseInt(amount),
          member_id: parseInt(user),
          cartItems: [{
            product_type: item.enum,
            count: item.count,
            childrenCount: item.children || 0,
            price: (item.price * item.count) + ((item.children || 0) * (item.childrenPrice || 0)),
            rentalStartDate: item.startDate,
            rentalEndDate: item.endDate,
          }]
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (response.status !== 200) {
          throw new Error(`결제 승인 실패: ${response.statusText}`);
        }

        await createAndSaveReservation(item, orderId, user);
        await deleteCartItem(item.cartProductId); // 결제 성공 시 장바구니 아이템 삭제
      } catch (error) {
        console.error(`요청 처리 중 오류 발생: ${error.message}`);
        return null; // 실패한 요청은 null로 반환
      }
    });

    const results = await Promise.all(requests);
    const failedRequests = results.filter(result => result === null);
    if (failedRequests.length > 0) {
      console.error(`${failedRequests.length}개의 요청 처리 실패`);
    } else {
      setIsConfirmed(true);
    }

    // cartItems에서 cartProductId를 추출하여 삭제 요청
    cartItems.forEach(async (item) => {
      try {
        const response = await axios.delete(`http://localhost:8988/cart/delete?cartProductId=${item.cartProductId}`);
        if (response.status === 200) {
          console.log(`장바구니 아이템 ${item.cartProductId} 삭제 성공`);
        } else {
          console.error(`장바구니 아이템 삭제 실패: ${response.statusText}`);
        }
      } catch (error) {
        console.error(`장바구니 아이템 삭제 실패: ${error}`);
      }
    });
  }, [paymentKey, orderIds, amount, user, cartItems]);

  async function createAndSaveReservation(item, orderId, user) {
    // 예약 데이터 생성 및 저장 로직
    // 각 엔티티 유형에 따라 다른 처리를 수행
    switch (item.enum) {
      case 'FLIGHT_ENUM':
        const flightReservation = {
          flightId: orderId,
          airportId: item.airportId,
          memberId: parseInt(user, 10),
          relationship: 10001,
          fli_res_name: item.name,
          fli_res_price: item.price,
          fli_state: "BEFORE_DEPARTURE",
          fli_res_state: 'COMPLETED',
          fli_res_capacity: item.count + item.children,
        };
        console.log('Flight Reservation Data:', flightReservation);
        await saveFlightReservation(flightReservation);
        break;
      case 'LODGING_ENUM':
        const lodgingReservation = {
          memberId: parseInt(user, 10),
          lodgingId: orderId,
          relationship: 10001,
          lodDepartureDate: new Date().toISOString(),
          lodArrivalDate: new Date().toISOString(),
          lodResTime: new Date().toISOString(),
          lodResCapacity: 1,
          lodResPrice: parseInt(item.price, 10),
          lodResState: "COMPLETED",
        };
        console.log('Lodging Reservation Data:', lodgingReservation);
        await saveLodgingReservation(lodgingReservation);
        break;
      case 'CARS_ENUM':
        const carRentalReservation = {
          memberId: parseInt(user, 10),
          car: orderId,
          relationship: 10001,
          rentalStartDate: item.startDate,
          rentalEndDate: item.endDate,
          rentalPrice: parseInt(item.price, 10),
          reservationStatus: "COMPLETED",
          carInsurance: "STANDARD_INSURANCE",
        };
        console.log('Car Rental Reservation Data:', carRentalReservation);
        await saveCarRental(carRentalReservation);
        break;
      case 'RESTAURANT_ENUM':
        const restaurantReservation = {
          restaurantId: parseInt(orderId, 10),
          memberId: parseInt(user, 10),
          relationshipId: 10001,
          restResDate: new Date().toISOString(),
          restResTime: new Date().toISOString(),
          restResCapacity: 1,
          restResPrice: parseInt(item.price, 10),
          reservationStatus: "COMPLETED",
        };
        console.log('Restaurant Reservation Data:', restaurantReservation);
        await saveRestaurantReservation(restaurantReservation);
        break;
      case 'PACKAGE_TOUR_ENUM':
        // packageTourItems가 정의되어 있지 않은 경우 빈 배열을 사용
        const packageTourItems = item.packageTourItems || [];

        const reservationPromises = packageTourItems.map(async (packageItem) => {
          switch (packageItem.enum) {
            case 'FLIGHT_ENUM':
              const flightReservation = {
                flightId: packageItem.productId,
                airportId: packageItem.airportId,
                memberId: parseInt(user, 10),
                relationship: 10001,
                fli_res_name: packageItem.name,
                fli_res_price: packageItem.price,
                fli_state: "BEFORE_DEPARTURE",
                fli_res_state: 'COMPLETED',
                fli_res_capacity: packageItem.count + packageItem.children,
              };
              console.log('Flight Reservation Data:', flightReservation);
              return saveFlightReservation(flightReservation);
            case 'LODGING_ENUM':
              const lodgingReservation = {
                memberId: parseInt(user, 10),
                lodgingId: packageItem.productId,
                relationship: 10001,
                lodDepartureDate: packageItem.startDate,
                lodArrivalDate: packageItem.endDate,
                lodResTime: new Date().toISOString(),
                lodResCapacity: packageItem.count + packageItem.children,
                lodResPrice: packageItem.price,
                lodResState: "COMPLETED",
              };
              console.log('Lodging Reservation Data:', lodgingReservation);
              return saveLodgingReservation(lodgingReservation);
            case 'CARS_ENUM':
              const carRentalReservation = {
                memberId: parseInt(user, 10),
                car: packageItem.productId,
                relationship: 10001,
                rentalStartDate: packageItem.startDate,
                rentalEndDate: packageItem.endDate,
                rentalPrice: packageItem.price,
                reservationStatus: "COMPLETED",
                carInsurance: "STANDARD_INSURANCE",
              };
              console.log('Car Rental Reservation Data:', carRentalReservation);
              return saveCarRental(carRentalReservation);
            case 'RESTAURANT_ENUM':
              const restaurantReservation = {
                restaurantId: parseInt(packageItem.productId, 10),
                memberId: parseInt(user, 10),
                relationshipId: 10001,
                restResDate: packageItem.startDate,
                restResTime: packageItem.endDate,
                restResCapacity: packageItem.count + packageItem.children,
                restResPrice: packageItem.price,
                reservationStatus: "COMPLETED",
              };
              console.log('Restaurant Reservation Data:', restaurantReservation);
              return saveRestaurantReservation(restaurantReservation);
          }
        });

        try {
          await Promise.all(reservationPromises);
          console.log('모든 예약 처리 완료');
        } catch (error) {
          console.error('예약 처리 중 오류 발생:', error);
        }
        break;
      default:
        console.error('알 수 없는 상품 유형:', item.enum);
    }
  }

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
      console.error('숙박 예약 정보를 저하는데 실패했습니다:', error);
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
        console.log('차량 대여 예약이 성공적으 처리되었습니다.');
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

  const deleteCartItem = async (cartProductId ,index) => {
    try {
      const response = await axios.delete(`http://localhost:8988/cart/delete?cartProductId=${cartProductId}`);
      if (response.status === 200) {
        console.log(`장바구니 아이템 ${cartProductId} 삭제 성공`);
      } else {
        console.error(`장바구니 아이템 삭제 실패: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`장바구니 아이템 삭제 실패: ${error}`);
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

