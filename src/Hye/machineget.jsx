import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './advertisementComponent.scss'; // 스타일링 파일
import { useCookies } from 'react-cookie';

const UserInfoDisplay = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [cookies] = useCookies(['accessToken']);
    const [chackdata, setChackData]=useState(null);
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8988/member/detailPage', {
                    headers: {
                        Authorization: cookies.accessToken, // 요청에 토큰 추가
                        'Content-Type': 'application/json',
                    }
                });
                
                const result = response.data;
                console.log('User Info:', result);
                setUserInfo(result);

            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, [cookies.accessToken]);
    const getGender = (birth) => {
        const genderCode = parseInt(birth.charAt(6));
        return genderCode === 1 || genderCode === 3 ? '남자' : '여자';
    };
    // 나이를 계산하는 함수
    const calculateAge = (birth) => {
        const currentYear = new Date().getFullYear();
        const gender = parseInt(birth.substring(6,7));
        let birthYear = parseInt(birth.substring(0, 2));
        if (gender>2) {
            birthYear += 2000;
        } else {
            birthYear += 1900;
        }
        return currentYear - birthYear;
    };

    // 성별을 반환하는 함수
    

    // 현재 달을 반환하는 함수
    const getCurrentMonth = () => {
        return new Date().getMonth() + 1;
    };
  // 수정된 사용자 정보와 함께 성별, 나이, 현재 월 값을 스프링으로 보내는 함수
    useEffect(()=>{
        const sendModifiedUserInfoToSpring = async () => {
            console.log('aa');
            if (!userInfo) return;
            try {
            // 성별, 나이, 현재 월 값 계산
            const gender = parseInt(userInfo.birth.substring(6,7));;
            const age = calculateAge(userInfo.birth);
            const month = getCurrentMonth();

        // 수정된 사용자 정보와 함께 데이터를 맵 형식으로 생성
        const dataToSend = {
            gender: gender,
            age: age,
            month: month
        };
        console.log(dataToSend);
            // 스프링으로 데이터 전송
            const response = await axios.post('http://localhost:8988/admin/send-data', dataToSend, {
                headers: {
                    Authorization:`Bearer ${cookies.accessToken}`,
                    'Content-Type': 'application/json',
                }
            });
            setChackData(response.data);
            console.log('Modified user info and additional data sent to Spring:', response.data);

        } catch (error) {
            console.error('Error sending modified user info and additional data to Spring:', error);
        }
    };
    sendModifiedUserInfoToSpring();
    },[userInfo]);

    return (
        <div>
            {randomAd ? (
                <div className="advertisement-item">
                    <div className="advertisement-content">
                        <p>인공지능 추천서비스입니다.</p>
                        <p>{userInfo.birth}살인</p>
                        <p>{getGender(userInfo.birth)}가</p>
                        <p>{getCurrentMonth()}달에 가장 많이 가는곳입니다.</p>
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
