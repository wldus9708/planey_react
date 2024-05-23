import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './advertisementComponent.scss'; // 스타일링 파일

const TestComponent = () => {
    const [dataset, setDataSet] = useState([]);
    const [randomAd, setRandomAd] = useState(null); // 랜덤으로 선택된 광고를 저장할 상태
  

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await axios.get('http://localhost:8988/admin/advertises/all');
                console.log('Initial Data:', response.data); // 성공 시 응답 데이터 출력
                setDataSet(response.data); // 응답 데이터만 저장
                const activeAds = response.data.filter(ad => ad.statusDate === 'ACTIVE'); // 'ACTIVE' 상태 필터링

                if (activeAds.length > 0) {
                    const randomIndex = Math.floor(Math.random() * activeAds.length);
                    setRandomAd(activeAds[randomIndex]); // 랜덤으로 하나 선택
                }
            } catch (error) {
                console.error('Error fetching initial data:', error);
                setDataSet({ error: 'Error fetching initial data' }); // 오류 메시지를 저장
            }
        };

        fetchInitialData(); // 처음 데이터 가져오기
    }, []); // 빈 배열을 두 번째 인자로 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 설정합니다.


    return (
        <div>
            {randomAd ? (
                <div className="advertisement-item">
                    <div className="advertisement-content">
                        <h1>{randomAd.title}</h1>
                        <h3>{randomAd.content}</h3>
                        <h3>{randomAd.image}</h3>
                    </div>
                    <div className="advertisement-image">
                        <img className="advertisement-img" src={require(`./component/${randomAd.image}`)} alt={randomAd.title} />
                    </div>
                </div>
            ) : dataset.length > 0 ? (
                <p>No ACTIVE advertisements found</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TestComponent;