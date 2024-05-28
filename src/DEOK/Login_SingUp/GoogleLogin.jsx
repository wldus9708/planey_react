import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logUserAction } from "../../BBS/Log/LogService"; // logUserAction 함수 임포트
import useUser from "../../BBS/Log/useUser"; // useUser 훅 임포트

const GoogleLoginRedirect = () => {
    const [cookies, setCookie] = useCookies([]);
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");
    const clientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
    const user = useUser(); // 사용자 정보 가져오기

    const googleLogin = async () => {
        try {
            const response = await axios.get(`http://localhost:8988/login/oauth2/callback/google?code=${code}`, {
                params: {
                    clientSecret: clientSecret
                }
            });

            if (response.data.code === "SignUpSU") {
                alert(response.data.message);
                navigate('/login');
            } else if (response.data.code === "LoginSU") {
                setCookie("accessToken", response.data.accessToken, { path: '/' });

                // 로그인 성공 플래그 설정
                localStorage.setItem('googleLoginSuccess', 'true');

                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user) {
            googleLogin();
        } else {
            googleLogin();
            console.log("사용자 정보가 없습니다.");
        }
    }, [user]); // user를 의존성 배열에 추가

    return (
        <>
            로그인 진행중...
        </>
    );
};

export default GoogleLoginRedirect;
