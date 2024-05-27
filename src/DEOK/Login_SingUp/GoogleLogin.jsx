import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const GoogleLoginRedirect = () => {

    const [cookies, setCookie] = useCookies([]);

    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");
    const clientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
    axios
        .get(`http://localhost:8988/login/oauth2/callback/google?code=${code}`, {
            params: {
                clientSecret : clientSecret
            }
        })
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
            console.log(error)
        });




    return (
        <>
            로그인 진행중...
        </>
    )
}

export default GoogleLoginRedirect;