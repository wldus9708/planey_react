import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const UserInfoDisplay = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [cookies] = useCookies(['accessToken']);
    const navigate = useNavigate();
    useEffect(() => {
        const dd =async()=>{
            try{
                const response = await axios.get('http://localhost:8988/error/ttest')
            }catch(error){
                if (error.response) {
                    // HTTP 상태 코드에 따라 리디렉션
                    if (error.response) {
                        const statusCode = error.response.status;
                        navigate(`/ErrorPage?status=${statusCode}`);
                    }
                  } else {
                    navigate('/ErrorPage');
                  }
            }
        }
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
        dd();
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

            console.log('Modified user info and additional data sent to Spring:', response.data);

        } catch (error) {
            console.error('Error sending modified user info and additional data to Spring:', error);
        }
    };
    sendModifiedUserInfoToSpring();
    },[userInfo]);

    return (
        <div>
            <h2>User Info</h2>
            {userInfo ? (
                <div>
                    <p>Name: {userInfo.name}</p>
                    <p>Email: {userInfo.email}</p>
                    <p>Age: {calculateAge(userInfo.birth)}</p>
                    <p>Current Month: {getCurrentMonth()}</p>
                    <p>Gender: {getGender(userInfo.birth)}</p>
                </div>
            ) : (
                <p>Loading user info...</p>
            )}
        </div>
    );
};

export default UserInfoDisplay;
