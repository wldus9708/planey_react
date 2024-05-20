import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App'
import Login from './DEOK/Login_SingUp/Login_Signup';
import KakaoLogin from './GUN/SocialKakao';
import LodgingDetail from './YOUNG/lodging/LodgingDetail';
import PreLodging from './YOUNG/lodging/preLodgingDetail';
import PlanMain from './YEON/planMain';
import RestaurantDetail from './SUNG/Restaurant/RestaurantDetail';
import RestaurantList from './SUNG/Restaurant/RestaurantList';
import LodgingList from './YOUNG/lodging/LodgingList';
import FindId from './YOUNG/member/findId';
import FindPW01 from './YOUNG/member/findPW01';
import FindPW02 from './YOUNG/member/findPW02';
import PaymentTest from './GUN/components/payment';
import PackageFoot from './GUN/components/PackageFoot';
import PackageList from './GUN/PackageList';
import PagckageDetail from "./GUN/PackageIndex";
import RentcarDetail from "./Hye/rentcarDitail";
import SearchField from "./YOUNG/searchField/Search_field";
import Test from "./Hye/advertisement";
import GoogleLoginRedirect from "./DEOK/Login_SingUp/GoogleLoginRedirect";
import MyPage from "./DEOK/MyPage/Mypage_Client"
import RentCarTest from './GUN/RentCarIndex';
import Airport from "./YOUNG/Seat/SeatBooking"


function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login/Socialkakao" element={<KakaoLogin />} />
                <Route path="/lodgingDetail/:id" element={<LodgingDetail />} />
                <Route path="/prelodging" element={<PreLodging />} />
                <Route path="/planMain" element={<PlanMain />} />
                <Route path="/restaurantDetail/:id" element={<RestaurantDetail />} />
                <Route path="/findID" element={<FindId />} />
                <Route path="/findPW01" element={<FindPW01 />} />
                <Route path="/findPW02" element={<FindPW02 />} />
                <Route path="/restaurant/list" element={<RestaurantList />} />
                <Route path="/LodgingList" element={<LodgingList />} />
                <Route path="/PackageFoot" element={<PackageFoot />} />
                <Route path="/PaymentTest" element={<PaymentTest />} />
                <Route path="/rentcardetail" element={<RentcarDetail />} />
                <Route path="/searchField" element={<SearchField />} />
                <Route path="/test" element={<Test />} />
                <Route path="/oauth/redirect" element={<GoogleLoginRedirect />} />
                <Route path="/packageDetail" element={<PagckageDetail />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/PackageTour/list" element={<PackageList />} />
                <Route path="/RentCarTest" element={<RentCarTest />} />
                <Route path="/Airport" element={<Airport />} />

            </Routes>
        </BrowserRouter>
    )
}

export default Routing;

