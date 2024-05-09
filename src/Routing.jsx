import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App'
import Login from './DEOK/Login_SingUp/Login_Signup';
import KakaoLogin from './GUN/SocialKakao';
import LodgingDetail from './YOUNG/LodgingDetail';
import PreLodging from './YOUNG/preLodgingDetail';
import PlanMain from './YEON/planMain';
import RestaurantDetail from './SUNG/Restaurant/RestaurantDetail';
import Agreement from './YOUNG/Agreement';

function Routing() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login/Socialkakao" element={<KakaoLogin />} />
                <Route path="/lodgingDetail" element={<LodgingDetail />} />
                <Route path="/prelodging" element={<PreLodging />} />
                <Route path="/planMain" element={<PlanMain />} />
                <Route path="/restaurantDetail/:id" element={<RestaurantDetail />} />
                <Route path="/agreement" element={<Agreement />} />

            </Routes>
        </BrowserRouter>
    )
}

export default Routing;
