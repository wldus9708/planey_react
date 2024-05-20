import React, { useState } from 'react';
import styels from './SeatBooking.module.css';

const SEAT_ROWS = [
  ['1A', '1B', '1C', '1D', '1E', '1F'],
  ['2A', '2B', '2C', '2D', '2E', '2F'],
  ['3A', '3B', '3C', '3D', '3E', '3F'],
  ['4A', '4B', '4C', '4D', '4E', '4F'],
  ['5A', '5B', '5C', '5D', '5E', '5F'],
  ['6A', '6B', '6C', '6D', '6E', '6F'],
  ['7A', '7B', '7C', '7D', '7E', '7F'],
  ['8A', '8B', '8C', '8D', '8E', '8F'],
  ['9A', '9B', '9C', '9D', '9E', '9F'],
  ['10A', '10B', '10C', '10D', '10E', '10F'],
];
const reservedSeats = ['1A', '3C', '5E']; // 예약된 좌석 정보
const SeatBooking = () => {
  
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatChange = (event) => {
    const { id, checked } = event.target;
  
    // 예약된 좌석인지 확인
    const isReserved = reservedSeats.includes(id);

    // 예약된 좌석이 아니면 선택 여부 업데이트
    if (!isReserved) {
      setSelectedSeats(prevSelectedSeats =>
        checked
          ? [...prevSelectedSeats, id]
          : prevSelectedSeats.filter(seat => seat !== id)
      );
    }
  };
  



  return (
<div className={styels.body}>
    <div className={styels.plane}>
      <div className={styels.select}>
        <h5 className={styels.h5}>좌석을 선택 해주세요.</h5>
      </div>
      <div className={styels.exit}></div>
      <ol>
        {SEAT_ROWS.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol className={styels.seats}>
              {row.map(seatId => (
                <li className={styels.seat} key={seatId}>
                
                  <input
                    type="checkbox"
                    id={seatId}
                    checked={selectedSeats.includes(seatId)}
                    onChange={handleSeatChange}
                    disabled={reservedSeats.includes(seatId)} // 예약된 좌석인 경우 disabled 속성 적용
                  />
                  <label htmlFor={seatId}>{seatId}</label>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
      <div className={styels.exit}></div>

    </div>
    </div>
    
  );
};

export default SeatBooking;