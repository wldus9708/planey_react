import React from "react";
import "./main.css";
import Navbar from "./Components/Navbar/Navbar";
import Carousel from "./Components/Carousel/Carouselpage"
import FlashDeals from "./Components/flashDeals/FlashDeals"
import Footer from "./Components/Footer/Footer";
import Popular from "./Components/Popular/Popular";
import Offers from "./Components/Offers/Offers";
import About from "./Components/About/About";
import Blog from "./Components/Blog/Blog";
import Banner from "./Components/banner/About"



const App = ({ productItems, addToCart}) => {
  return (
    <>
      <Navbar />  
      <Carousel/>
      <Banner />
      <FlashDeals productItems={productItems} addToCart={addToCart} />/
      <Popular />
      <Offers />
      <About />
      <Blog />
      <Footer />
    </>
  );
};

export default App;
