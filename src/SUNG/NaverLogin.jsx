import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import jsCookies from "js-cookie";

const NaverLogin = () => {
    const navigate = useNavigate();
    const urlParams = new URL(window.location.href).searchParams;
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    const [cookies, setCookie] = useCookies([]);

    useEffect(() => {
        const naverLogin = async () => {
            if (!code || !state) {
                console.log("코드: " + code);
                console.log("스테이트: " + state);
                console.error("코드 또는 상태 매개변수가 누락되었습니다.");
                return;
            }

            console.log("코드와 상태를 사용하여 서버로 GET 요청:", code, "및", state);

            try {
                const response = await axios.get(`http://localhost:8988/login/oauth2/callback/naver?code=${code}&state=${state}`);

                console.log("서버에서의 응답:", response.data);

                // 로그인 분기처리
                if (response.data.code === "LoginSU") {

                    if (response.data.black_list === 'SUSPENDED') {
                        alert('정지된 회원입니다.');

                        if (cookies.accessToken) {
                            jsCookies.remove('accessToken');
                        }

                        navigate('/login');

                    } else if (response.data.role === 'ADMIN') {
                        // 로그인 성공 플래그 설정
                        localStorage.setItem('googleLoginSuccess', 'true');
                        setCookie("accessToken", response.data.accessToken, { path: '/' });
                        window.location.href = 'http://localhost:4000';

                    } else {
                        // 로그인 성공 플래그 설정
                        localStorage.setItem('googleLoginSuccess', 'true');
                        setCookie("accessToken", response.data.accessToken, { path: '/' });
                        navigate('/');

                    }
                }

            } catch (error) {
                console.error("API 호출 중 오류 발생:", error);
            }
        };

        naverLogin();
    }, [code, state, navigate, setCookie]);

    return (
        <div>
            {/* 로그인 중... */}
        </div>
    );
};

export default NaverLogin;
