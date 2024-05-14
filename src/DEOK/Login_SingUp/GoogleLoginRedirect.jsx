import axios from "axios";
import { useCookies } from "react-cookie";

const GoogleLoginRedirect = () => {

    const [cookies, setCookie] = useCookies([]);
    const REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
    const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;



    const params = new URLSearchParams(window.location.search);
    const authorizationCode = params.get("code");

    if (authorizationCode) {
        const data = {
            "code": authorizationCode,
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "redirect_uri": REDIRECT_URI,
            "grant_type": "authorization_code"
        }
        console.log(data)
        axios
            .post("https://oauth2.googleapis.com/token", data)
            .then((response) => {
                setCookie("accessToken", response.data.accessToken);
                // navigator('/');
            })
            .catch((error) => {
                console.log(error)
            });
    }



    return (
        <>
        </>
    )
}

export default GoogleLoginRedirect;