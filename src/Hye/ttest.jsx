import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import * as tf from '@tensorflow/tfjs';
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
                const firstModel = await tf.loadLayersModel('/component/major_model_params.json');
                console.log('aa');
                // 두 번째 모델 로드
                const secondModel = await tf.loadLayersModel('/component/middle_model_params.json');

                // 세 번째 모델 로드
                const thirdModel = await tf.loadLayersModel('/component/minor_model_params.json');

                // 입력 데이터 생성 (첫 번째 모델에 입력될 데이터)
                const inputData1 = tf.tensor2d([
                    [getGender(userInfo.birth),calculateAge(userInfo.birth) ,getCurrentMonth()] // userInfo에서 나이와 월을 가져와서 사용
                ]);

                // 첫 번째 모델에 입력 데이터 제공하여 예측 수행
                const outputData1 = firstModel.predict(inputData1);

                // 두 번째 모델에 입력 데이터 생성 (첫 번째 모델의 출력값을 사용)
                const inputData2 = tf.tensor2d(
                    [getGender(userInfo.birth),calculateAge(userInfo.birth) ,getCurrentMonth(),
                    outputData1.dataSync() // 첫 번째 모델의 출력값을 사용
                ]);

                // 두 번째 모델에 입력 데이터 제공하여 예측 수행
                const outputData2 = secondModel.predict(inputData2);

                // 세 번째 모델에 입력 데이터 생성 (두 번째 모델의 출력값을 사용)
                const inputData3 = tf.tensor2d([
                    getGender(userInfo.birth),calculateAge(userInfo.birth) ,getCurrentMonth(),
                    outputData1.dataSync(),outputData2.dataSync() // 두 번째 모델의 출력값을 사용
                ]);

                // 세 번째 모델에 입력 데이터 제공하여 예측 수행
                const outputData3 = thirdModel.predict(inputData3);

                // 출력 데이터 확인
                console.log('Third Model Output:', outputData3.dataSync());

                // 모델 사용 후 메모리 해제
                inputData1.dispose();
                inputData2.dispose();
                inputData3.dispose();
                outputData1.dispose();
                outputData2.dispose();
                outputData3.dispose();
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
