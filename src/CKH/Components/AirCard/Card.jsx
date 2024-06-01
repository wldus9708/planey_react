import "./Card.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "./Product";
import { productData, responsive } from "./data";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8988/products/allFlights")
      .then((response) => {
        const fetchedProducts = response.data.map((item) => ({
          id: item.id,
          departureDate: item.fli_departure_date,
          arrivalDate: item.fli_arrival_date,
          departurePlace: item.fli_departure_place,
          arrivalPlace: item.fli_arrival_place,
          departureTime: item.fli_departure_time,
          arrivalTime: item.fli_arrival_time,
          totalTime: item.fli_total_time,
          brand: item.fli_brand,
          brandImage: "/images/" + item.fli_brand_image,
          price: item.fli_price,
          category: item.category,
          allProductState: item.allProductState,
        }));
        setProducts(fetchedProducts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const product = products.map((item,index) => (
    

    <Product
    key={index}
    name={item.brand}
    img={item.brandImage}
    price={item.price}
    description = {item.departureDate+"에 출발해서"+item.arrivalDate+"에 도착하는"+item.arrivalPlace+"행 "+item.brand+" 비행기 입니다."}
    />
  ));

  return (
    <div className="CardApp">
      <h1 className="Cardhair">좋은 자리💺 미리 예약하자❗❗ 🛫</h1>
      <Carousel responsive={responsive}>
        {product}
      </Carousel>
    </div>
  );
}