import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './advertisementComponent.scss'; // 스타일링 파일

const TestComponent = () => {
    const [dataset, setDataSet] = useState([]);
    const [randomAd, setRandomAd] = useState(null); // 랜덤으로 선택된 광고를 저장할 상태
    const [updataset, setUpdataSet] = useState([]);
    const isInitialMount = useRef(true); // 초기 마운트를 추적하기 위한 참조
    const intervalRef = useRef(null); // interval 참조

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await axios.get('http://localhost:8988/admin/advertises/all');
                console.log('Initial Data:', response.data); // 성공 시 응답 데이터 출력
                const newData = response.data.map(ad => ({
                    ...ad,
                    id: parseInt(ad.id)
                }));
                setDataSet(newData); // 변환된 데이터 저장// 응답 데이터만 저장
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

    useEffect(() => {
        const mergeData = (newData, existingData) => {
            // newData가 배열인지 확인하고 배열이 아니면 배열로 변환
            if (!Array.isArray(newData)) {
                newData = [newData];
            }
            // existingData가 배열인지 확인하고 배열이 아니면 배열로 변환
            if (!Array.isArray(existingData)) {
                existingData = [existingData];
            }

            console.log('New Data:', newData);
            console.log('Existing Data:', existingData);

            const dataMap = new Map(existingData.map(item => [Number(item.id), item]));
            newData.forEach(item => {
                const itemId = Number(item.id); // id를 문자열로 변환
                if (dataMap.has(itemId)) {
                    console.log(`Updating item with id ${itemId}`);
                    dataMap.set(itemId, { ...dataMap.get(itemId), ...item }); // 기존 항목 업데이트
                } else {
                    console.log(`Adding new item with id ${itemId}`);
                    dataMap.set(itemId, item); // 새 항목의 id를 숫자형으로 변환하여 추가
                }
            });
            return Array.from(dataMap.values());
        };

        const fetchUpdatedData = async () => {
            try {
                console.log('Fetching updated data...');
                const response = await axios.get('http://localhost:8988/admin/adv');
                console.log('Updated Data:', response.data); // 성공 시 응답 데이터 출력
                
                const updatedData = response.data;

                // 기존 데이터와 새로운 데이터를 병합하여 업데이트
                const mergedData = mergeData(updatedData, dataset);
                console.log('Merged Data Length:', mergedData.length);

                // 데이터가 변경된 경우에만 상태 업데이트
                if (JSON.stringify(mergedData) !== JSON.stringify(dataset)) {
                    console.log('aaaa');
                    setDataSet(mergedData);
                    setUpdataSet(mergedData);
                    axios.post('http://localhost:8988//admin/advertises/update-all', mergedData)
                    .then(response => {
                        console.log('Dataset updated on the server:', response.data);
                    })
                    .catch(error => {
                        console.error('Error updating dataset on the server:', error);
                    });
                }
            } catch (error) {
                console.error('Error fetching updated data:', error);
                setUpdataSet([]); // 오류가 발생하면 빈 배열 설정
            }
        };

        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            fetchUpdatedData(); // 처음 마운트 이후에는 fetchUpdatedData를 호출하여 업데이트된 데이터를 가져옵니다.
        }

        const interval = setInterval(fetchUpdatedData, 30000); // 60초마다 fetchUpdatedData 함수를 호출합니다.
        intervalRef.current = interval; // interval 참조 저장

        // 컴포넌트가 언마운트될 때 interval을 정리하여 메모리 누수를 방지합니다.
        return () => clearInterval(intervalRef.current);
    }, [dataset]); // 'dataset'을 두 번째 인자로 전달하여 dataset이 변경될 때마다 실행되도록 설정합니다.


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
