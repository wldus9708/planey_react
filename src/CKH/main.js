import React from "react";
import "./main.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Popular from "./Components/Popular/Popular";
import Offers from "./Components/Offers/Offers";
import About from "./Components/About/About";
import Blog from "./Components/Blog/Blog";
import Card from "./Components/Card/Card"
import Advertise from "../Hye/advertisement";
import McAdvertise from "../Hye/machineget";
import AirCard from "./Components/AirCard/Card"
import HotelCard from "./Components/hotelCard/Card"
import PakCard from "./Components/PakCard/Card"
import Hero from "./Components/Hero/Hero"
import { useCookies } from "react-cookie";
import NewBanner from "./Components/NewBanner/NewBanner"
// import Test from "./Components/Test/Test"

const App = () => {
  const [cookies] = useCookies(['accessToken']);
  const isLoggedIn = !!cookies.accessToken;

  return (
    <>
      <Navbar /> 
      <Hero />
      {/* <Test/> */}
      <Card/>
      <NewBanner/>
      <Popular />
      {isLoggedIn ? <McAdvertise /> : <Advertise />}
      <Offers />
      {/* <About /> */}
      <PakCard/>
      <AirCard/>
      <HotelCard/>
      <Advertise/>
      <Blog />
      <Footer />
    </>
  );
};

export default App;
