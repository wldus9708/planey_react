import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App'
import Login from './DEOK/Login_SingUp/Login_Signup';
import KakaoLogin from './GUN/SocialKakao';

function Routing() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login/Socialkakao" element={<KakaoLogin />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;