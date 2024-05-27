import React from "react";
import "./main.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Popular from "./Components/Popular/Popular";
import Offers from "./Components/Offers/Offers";
import About from "./Components/About/About";
import Blog from "./Components/Blog/Blog";
// import Banner from "./Components/banner/About"
import Card from "./Components/Card/Card"
import Advertise from "../Hye/advertisement";
import McAdvertise from "../Hye/machineget";
// import Home from "./Components/Home/CarouselPage";
import AirCard from "./Components/AirCard/Card"
import HotelCard from "./Components/hotelCard/Card"
import PakCard from "./Components/PakCard/Card"
// import Sliders from "./Components/slider/Slider"
import Hero from "./Components/Hero/Hero"
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies] = useCookies(['accessToken']);
  const isLoggedIn = !!cookies.accessToken;

  return (
    <>
      <Navbar /> 
      <Hero />
      {/* <Home /> */}
      <Card/>
      {/* <Banner /> */}
      <Popular />
      {isLoggedIn ? <McAdvertise /> : <Advertise />}
      <Offers />
      <About />
      <PakCard/>
      <AirCard/>
      <HotelCard/>
      <Advertise/>
      <Blog />
      <Footer />
      {/* <Sliders/> */}
    </>
  );
};

export default App;
