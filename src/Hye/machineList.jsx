import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './mcListComponent.scss'; // 스타일링 파일
import { useCookies } from 'react-cookie';

const TestComponent = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [cookies] = useCookies(['accessToken']);
    const [chackdata, setChackData]=useState(null);
    const [combinedData, setCombinedData] = useState('');
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
            // console.log('aa');
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
        // console.log(dataToSend);
            // 스프링으로 데이터 전송
            const response = await axios.post('http://localhost:8988/admin/send-data', dataToSend, {
                headers: {
                    Authorization:`Bearer ${cookies.accessToken}`,
                    'Content-Type': 'application/json',
                }
            });
            setChackData(response.data);
            // console.log('Modified user info and additional data sent to Spring:', response.data);

        } catch (error) {
            console.log('Error sending modified user info and additional data to Spring:', error);
        }
    };
    sendModifiedUserInfoToSpring();
    },[userInfo]);
    useEffect(() => {
        if (chackdata) {
            const combined = `${chackdata.major_category}${chackdata.middle_category}${chackdata.minor_category}`;
            setCombinedData(combined);
            // console.log(combinedData);
        }
    }, [chackdata]);
    const getPlaceName = (combinedData) => {
        switch (combinedData) {
            case '000':
                return '강릉';
            case '001':
                return '경주';
            case '002':
                return '제주시';
            case '003':
                return '독도';
            case '004':
                return '명동';
            case '010':
                return '부산';
            case '011':
                return '여수';
            case '012':
                return '인천';
            case '013':
                return '전주';
            case '014':
                return '인도';
            case '100':
                return '네덜란드';
            case '101':
                return '뉴질랜드';
            case '102':
                return '발리';
            case '103':
                return '베니스';
            case '104':
                return '보라카이';
            case '110':
                return '산토리니';
            case '111':
                return '스위스';
            case '112':
                return '아프가니스탄';
            case '113':
                return '이집트';
            case '114':
                return '이탈리아';
            default:
                return '';
        }
    };
    return (
        <div>
            {userInfo && (
                <div className="mcListment-item">
                    <div className="mcListment-content">
                        <h1>인공지능 추천서비스입니다.</h1>
                        <p className='mcListmnet-text'>{calculateAge(userInfo.birth)}세인 {getGender(userInfo.birth)}가</p>
                        <p className='mcListmnet-text'>{getCurrentMonth()}월달에 가장 많이 가는곳은</p>
                        <p className='mcListmnet-text'>{getPlaceName(combinedData)}입니다.</p>
                    </div>
                    <div className="mcListment-image">
                        <img className="mcListment-img"   src={combinedData ? require(`./component/${combinedData}.jpg`) : require('./component/제주01.jpg')}
    alt={combinedData ? getPlaceName(combinedData) : 'Default Image'} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestComponent;
