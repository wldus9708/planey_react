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
      .get("http://localhost:8988/lodging/randomList")
      .then((response) => {
        const fetchedProducts = response.data.map((item) => ({
            id: item.id,
            name: item.lodName,
            address: item.lodAddress,
            addressDetail: item.lodAddressDetail,
            price: item.lodPrice,
            latitude: item.lodLatitude,
            longitude: item.lodLongitude,
            description: item.lodDescription,
            image: "../../../../public/images/"+item.lodImage01,
            category: item.lodCategory,
            allProductState: item.allProductState,
        }));
        setProducts(fetchedProducts);
    })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const product = products.map((item) => (
    console.log(item.image),
    <Product
      name={item.name}
      img={item.image}
      price={item.price}
      description={item.description}
    />
  ));

  return (
    <div className="CardApp">
      <h1 className="Cardh1">호텔</h1>
      <Carousel responsive={responsive}>
        {product}
      </Carousel>
    </div>
  );
}