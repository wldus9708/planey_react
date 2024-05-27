import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logUserAction } from "../../BBS/Log/LogService"; // logUserAction 함수 임포트
import useUser from "../../BBS/Log/useUser"; // useUser 훅 임포트

const KaKaoLogin = () => {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");
    const [cookies, setCookie] = useCookies([]);
    const user = useUser(); // 사용자 정보 가져오기
    console.log(user);

    const kakaoLogin = async () => {
        await axios.get(`http://localhost:8988/login/oauth2/callback/kakao?code=${code}`)
            .then(async (response) => {
                
                    setCookie("accessToken", response.data.accessToken, { path: '/' });

                    // 로그인 성공 후 로그 기록
                    const timestamp = new Date().toISOString();
                    const logData = {
                        memberId: response.data.memberId || user?.id, // 서버에서 반환된 사용자 ID 사용
                        username: response.data.username || user?.name, // 서버에서 반환된 사용자 이름 사용
                        action: 'KAKAO_LOGIN',
                        timestamp: timestamp,
                        ipAddress: '', // IP 주소는 서버에서 설정
                        userAgent: navigator.userAgent,
                        details: `${response.data.username || user?.name} 님이 ${timestamp}에 'KAKAO_LOGIN'를 성공하셨습니다.`,
                    };

                    await logUserAction(logData, response.data.accessToken);
                    console.log("로그인 성공 로그:", logData);

                    navigate('/');
                
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (user) {
            kakaoLogin();
        } else {
            console.log("사용자 정보가 없습니다.");
        }
    }, [user]); // user를 의존성 배열에 추가

    return (
        <>
            로그인 진행중...
        </>
    );
};

export default KaKaoLogin;
