import React, { useState, useEffect } from "react";
import "./Card.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "./Product";
import { responsive } from "./data";
import axios from "axios";
import useUser from "../../../BBS/Log/useUser";

export default function App() {
  const [products, setProducts] = useState([]);
  const user = useUser();

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
          images: require("../../../BBS/image/"+item.image01+".jpg"),
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

  const productComponents = products.map((item, index) => (
    <Product
      key={index}
      name={item.name}
      img={item.images}
      price={item.price}
      description={item.description}
    />
  ));

  return (
    <div className="CardApp">
      <h1 className="Cardh1">
        🧡PLANEY🧡 에서 {user ? `${user.name}님의 ` : ""}패키지 추천❗
      </h1>
      <Carousel responsive={responsive}>
        {productComponents}
      </Carousel>
    </div>
  );
}
