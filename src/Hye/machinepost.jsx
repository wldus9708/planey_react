import React, { useState } from 'react';
import Cookies from 'js-cookie';

const MyComponent = () => {
  const [result, setResult] = useState(null);

  const handleButtonClick = () => {
    // 쿠키에서 사용자 정보를 읽어옴
    const gender = Cookies.get('gender');
    const age = Cookies.get('age');
    const currentMonth = new Date().getMonth() + 1; // 현재 달을 가져옴

    // 현재 시간과 사용자 정보를 서버에 전송
    fetch('/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gender, age, currentMonth }),
    })
      .then(response => response.json())
      .then(data => {
        setResult(data);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <button onClick={handleButtonClick}>데이터 예측하기</button>
      {result && (
        <div>
          <p>결과:</p>
          <ul>
            <li>{result.data1}</li>
            <li>{result.data2}</li>
            <li>{result.data3}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
