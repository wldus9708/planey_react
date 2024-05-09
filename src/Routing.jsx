import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App'
import Login from './DEOK/Login_SingUp/Login_Signup';
import KakaoLogin from './GUN/SocialKakao';
import LodgingDetail from './YOUNG/LodgingDetail';
import PreLodging from './YOUNG/preLodgingDetail';
import PlanMain from './YEON/planMain';
import RestaurantDetail from './SUNG/Restaurant/RestaurantDetail';
import RestaurantList from './SUNG/Restaurant/RestaurantList';
import FindId from './YOUNG/findId';
import FindPW01 from './YOUNG/findPW01';
import FindPW02 from './YOUNG/findPW02';
import GhTest from './GUN/Package_Detail';
import PaymentTest from './GUN/components/payment';



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
                <Route path="/findID" element={<FindId />} />
                <Route path="/findPW01" element={<FindPW01 />} />
                <Route path="/findPW02" element={<FindPW02 />} />
                <Route path="/restaurantList" element={<RestaurantList />} />
                <Route path="/GhTest" element={<GhTest />} />
                <Route path="/PaymentTest" element={<PaymentTest />} />

               

            </Routes>
        </BrowserRouter>
    )
}

export default Routing;
