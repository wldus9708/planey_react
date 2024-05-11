import React from "react";
import "./main.css";
import Navbar from "./Components/Navbar/Navbar";
import Carousel from "./Components/Carousel/Carouselpage"
import Footer from "./Components/Footer/Footer";
import Popular from "./Components/Popular/Popular";
import Offers from "./Components/Offers/Offers";
import About from "./Components/About/About";
import Blog from "./Components/Blog/Blog";
import Tests from "./Components/Carousel/test";
import Maps from "./Components/Map/Map";

const App = () => {
  return (
    <>
      <Navbar />  
      <Carousel/>
      <Tests />
      {/* <Maps/> */}
      {/* <Cards /> */}
      <Popular />
      <Offers />
      <About />
      <Blog />
      <Footer />

    </>
  );
};

export default App;
