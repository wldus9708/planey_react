import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import './TestComponent.scss'; // 스타일링 파일
import img1 from './component/바다01.jpg'
const TestComponent = () => {
    const [dataset, setDataSet] = useState(null);
    const [randomAd, setRandomAd] = useState(null); // 랜덤으로 선택된 광고를 저장할 상태

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8988/admin/advertises/all');
                console.log(response.data); // 성공 시 응답 데이터 출력
                setDataSet(response.data); // 응답 데이터만 저장
                const activeAds = response.data.filter(ad => ad.statusDate === 'ACTIVE'); // 'ACTIVE' 상태 필터링

                if (activeAds.length > 0) {
                    const randomIndex = Math.floor(Math.random() * activeAds.length);
                    setRandomAd(activeAds[randomIndex]); // 랜덤으로 하나 선택
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setDataSet({ error: 'Error fetching data' }); // 오류 메시지를 저장
            }
        };

        fetchData(); // 데이터 가져오기
    }, []); // 빈 배열을 두 번째 인자로 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 설정합니다.

    return (
        <div>
            {randomAd ? (
                <div className="advertisement-item">
                    <div className="advertisement-image">
                <img src={require(`./component/${randomAd.image}`)} alt={randomAd.title} />
                </div>
                <div className="advertisement-content">
                    <p>{randomAd.title}</p>
                    <p>{randomAd.content}</p>
                    <p>{randomAd.image}</p>
                </div>
                
            </div>
            ) : dataset ? (
                <p>No ACTIVE advertisements found</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TestComponent;
