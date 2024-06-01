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
      .get("http://localhost:8988/PackageTour/readEightPackageTour")
      .then((response) => {
        const fetchedProducts = response.data.map((item) => ({
          id: item.id,
          relationshipId: item.relationshipId,
          attractionId: item.attractionId,
          tourPackLodging: item.tour_pack_lodging,
          tourPackFlight: item.tour_pack_flight,
          tourPackCar: item.tour_pack_car,
          tourPackRestaurant: item.tour_pack_restaurant,
          tourPackStartDate: item.tourPackStartDate,
          tourPackEndDate: item.tourPackEndDate,
          tourPackCity: item.tourPackCity,
          category: item.category,
          allProductState: item.allProductState,
          images: "/images/" + item.image01,
          name: item.tour_pack_name,
          description: item.tour_pack_description,
          price: item.price,
          discount: item.discount,
          parking: item.parking,
          pet: item.pet,
          wifi: item.wifi,
          shuttle: item.shuttle,
          breakfast: item.breakfast,
          nation: item.nation,
          allProductState: item.all_product_state,
        }));
        setProducts(fetchedProducts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const product = products.map((item, index) => (
    <Product
      key={index}
      id={item.id}
      name={item.name}
      img={item.images}
      price={item.price}
      description={item.description}
    />
  ));

  return (
    <div className="CardApp">
      <h1 className="cardpk1">✈️여행 패키지로 떠나는 여행️️</h1>
      {/* ❗  */}
      <Carousel responsive={responsive}>
        {product}
      </Carousel>
    </div>
  );
}