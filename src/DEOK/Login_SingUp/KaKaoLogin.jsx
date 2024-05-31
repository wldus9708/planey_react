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

    const kakaoLogin = async () => {
        await axios.get(`http://localhost:8988/login/oauth2/callback/kakao?code=${code}`)
            .then(async (response) => {
                setCookie("accessToken", response.data.accessToken, { path: '/' });

                // 로그인 성공 플래그 설정
                localStorage.setItem('kakaoLoginSuccess', 'true');

                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        kakaoLogin();
    }, []); // 빈 배열을 의존성 배열로 사용하여 컴포넌트가 마운트될 때 한 번만 실행

    return (
        <>
            {/* 로그인 진행중... */}
        </>
    );
};

export default KaKaoLogin;
