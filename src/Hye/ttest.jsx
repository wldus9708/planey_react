import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const UserInfoDisplay = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [cookies] = useCookies(['accessToken']);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8988/member/detailPage', {
                    headers: {
                        Authorization: cookies.accessToken // 요청에 토큰 추가
                    }
                });
                console.log('User Info:', response.data);
                setUserInfo(response.data);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    // 나이를 계산하는 함수
    const calculateAge = (birth) => {
        const currentYear = new Date().getFullYear();
       let birthYear = parseInt(birth.substring(0, 2), 10);
        if (birthYear < 40) {
            birthYear += 2000;
        } else {
            birthYear += 1900;
        }
        return currentYear - birthYear;
    };

    // 성별을 반환하는 함수
    const getGender = (birth) => {
        const genderCode = parseInt(birth.charAt(6), 10);
        return genderCode === 1 || genderCode === 3 ? '남자' : '여자';
    };

    // 현재 달을 반환하는 함수
    const getCurrentMonth = () => {
        return new Date().getMonth() + 1;
    };

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
