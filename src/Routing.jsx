import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App'
import Login from './DEOK/Login_SingUp/Login_Signup';
import KakaoLogin from './GUN/SocialKakao';
import LodgingDetail from './YOUNG/lodging/LodgingDetail';
import PreLodging from './YOUNG/lodging/preLodgingDetail';
import PlanMain from './YEON/planMain';
import RestaurantDetail from './SUNG/Restaurant/RestaurantDetail';
import RestaurantList from './SUNG/Restaurant/RestaurantList';
import FindId from './YOUNG/member/findId';
import FindPW01 from './YOUNG/member/findPW01';
import FindPW02 from './YOUNG/member/findPW02';
import GhTest from './GUN/Package_Detail';
import PaymentTest from './GUN/components/payment';
import PackageFoot from './GUN/components/PackageFoot';
import PagckageDetail from  "./GUN/PackageIndex";
import RentcarDetail from "./Hye/rentcarDitail";
import Cart from "./CKH/Components/Cart/Cart";
import SearchField from "./YOUNG/searchField/Search_field";
import Test from "./Hye/test";
import GoogleLoginRedirect from "./DEOK/Login_SingUp/GoogleLoginRedirect";



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
                <Route path="/PackageFoot" element={<PackageFoot />} />
                <Route path="/PaymentTest" element={<PaymentTest />} />
                <Route path="/rentcardetail" element={<RentcarDetail />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/searchField" element={<SearchField />} />
                <Route path="/test" element={<Test/>} />
                <Route path="/oauth/redirect" element={<GoogleLoginRedirect />} />
                <Route path="/packageDetail" element={<PagckageDetail />} />

            </Routes>
        </BrowserRouter>
    )
}

export default Routing;
