import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App'
import Login from './DEOK/Login_SingUp/Login_Signup';
import KakaoLogin from './DEOK/Login_SingUp/KaKaoLogin';
import LodgingDetail from './YOUNG/lodging/LodgingDetail';
import PreLodging from './YOUNG/lodging/preLodgingDetail';
import PlanMain from './YEON/planMain';
import RestaurantDetail from './SUNG/Restaurant/RestaurantDetail';
import RestaurantList from './SUNG/Restaurant/RestaurantList';
import LodgingList from './YOUNG/lodging/LodgingList';
import FindId from './YOUNG/member/findId';
import FindPW01 from './YOUNG/member/findPW01';
import FindPW02 from './YOUNG/member/findPW02';
import PackageList from './GUN/PackageList';
import RentCarList from './GUN/RentCarList ';
import PackageDetail from "./GUN/PackageIndex";
import RentcarDetail from "./Hye/rentcarDitail";
import SearchField from "./YOUNG/searchField/Search_field";
import Test from "./Hye/advertisement";
import GoogleLogin from "./DEOK/Login_SingUp/GoogleLogin";
import MyPage from "./DEOK/MyPage/Mypage";
import RentCarTest from './GUN/RentCarIndex';
import Airport from "./YOUNG/Seat/SeatBooking";
import Succcess from "./BBS/patment/Success";
import SuccessLoging from "./BBS/patment/SuccessLoging";
import Fail from "./BBS/patment/Fail";
import AirportList from "./YOUNG/Airport/AirportList";
import NaverLogin from "./SUNG/NaverLogin";
import Cart from "./DEOK/Cart/Cart";

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login/oauth2/callback/kakao" element={<KakaoLogin />} />
                <Route path="/lodgingDetail/:id" element={<LodgingDetail />} />
                <Route path="/prelodging" element={<PreLodging />} />
                <Route path="/planMain" element={<PlanMain />} />
                <Route path="/restaurantDetail/:id" element={<RestaurantDetail />} />
                <Route path="/findID" element={<FindId />} />
                <Route path="/findPW01" element={<FindPW01 />} />
                <Route path="/findPW02" element={<FindPW02 />} />
                <Route path="/restaurant/list" element={<RestaurantList />} />
                <Route path="/LodgingList" element={<LodgingList />} />
                <Route path="/rentcardetail" element={<RentcarDetail />} />
                <Route path="/searchField" element={<SearchField />} />
                <Route path="/test" element={<Test />} />
                <Route path="/login/oauth2/callback/google" element={<GoogleLogin />} />
                <Route path="/PackageDetail/:id" element={<PackageDetail />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/PackageTour/list" element={<PackageList />} />
                <Route path="/car/list" element={<RentCarList />} />
                <Route path="/RentCarTest/:id" element={<RentCarTest />} />
                <Route path="/Airport" element={<Airport />} />
                <Route path="/PaymentSuccess" element={<Succcess />} />
                <Route path="/PaymentFail" element={<Fail />} />
                <Route path="/AirportList" element={<AirportList />} />
                <Route path="/PaymentSuccess" element={<Succcess />} />
                <Route path="/PaymentSuccessLoging" element={<SuccessLoging />} />
                <Route path="/login/oauth2/callback/naver" element={<NaverLogin />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;


