import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const KaKaoLogin = () => {

    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");
    const [cookies, setCookie] = useCookies([]);

    const kakaoLogin = async () => {
        await axios.get(`http://localhost:8988/login/oauth2/callback/kakao?code=${code}`)
            .then((response) => {
                if (response.data.code === "SignUpSU") {
                    alert(response.data.message);
                    navigate('/login');
                } else if (response.data.code === "LoginSU") {
                    setCookie("accessToken", response.data.accessToken, { path: '/' });
                    navigate('/');
                }

            })
            .catch((error) => {
                console.log(error);
            })

    }
    kakaoLogin();
    return (
        <>
            로그인 진행중...
        </>
    )
}
export default KaKaoLogin;