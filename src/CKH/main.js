import React from "react";
import "./main.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Popular from "./Components/Popular/Popular";
import Offers from "./Components/Offers/Offers";
import About from "./Components/About/About";
import Blog from "./Components/Blog/Blog";
import Banner from "./Components/banner/About"
import Card from "./Components/Card/Card"
import Sliders from "./Components/slider/Slider"


const App = () => {
  return (
    <>
      <Navbar />  
      <Sliders/>
      <Card/>
      <Banner />
      <Popular />
      <Offers />
      <About />
      <Blog />
      <Footer />
    </>
  );
};

export default App;
