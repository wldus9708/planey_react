import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NaverLogin = () => {
    const navigate = useNavigate();
    const urlParams = new URL(window.location.href).searchParams;
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const [cookies, setCookie] = useCookies([]);

    useEffect(() => {
        const naverLogin = async () => {
            if (!code || !state) {
                console.error("코드 또는 상태 매개변수가 누락되었습니다.");
                return;
            }

            console.log("코드와 상태를 사용하여 서버로 GET 요청:", code, "및", state);

            try {
                const response = await axios.get(`http://localhost:8988/login/oauth2/code/naver?code=${code}&state=${state}`);

                console.log("서버에서의 응답:", response.data);

                if (response.data.code === "Success") {
                    alert(response.data.message);
                    navigate('/login');
                } else if (response.data.code === "Success1") {
                    setCookie("accessToken", response.data.accessToken, { path: '/' });
                    setCookie("refreshToken", response.data.refreshToken, { path: '/' });
                    navigate('/');
                } else {
                    console.error("예상치 못한 응답 코드:", response.data.code);
                }
            } catch (error) {
                console.error("API 호출 중 오류 발생:", error);
            }
        };

        naverLogin();
    }, [code, state, navigate, setCookie]);

    return (
        <div>
            로그인 중...
        </div>
    );
};

export default NaverLogin;
