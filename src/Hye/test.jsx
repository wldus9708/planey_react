import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestComponent = () => {
    const [testData, setTestData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8988/admin/adv');
                console.log(response.data); // 성공 시 응답 데이터 출력
                setTestData(response.data); // response.data로 설정
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // 데이터 가져오기
    }, []); // 빈 배열을 두 번째 인자로 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 설정합니다.

    return (
        <div>
            {testData.length > 0 ? (
                <ul>
                    {testData.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
                </ul>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default TestComponent;
