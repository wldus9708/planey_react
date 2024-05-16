import "./Card.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "./Product";
import { productData, responsive } from "./data";

export default function App() {
  const product = productData.map((item) => (
    <Product
      name={item.name}
      img={item.img}
      price={item.price}
      description={item.description}
    />
  ));

  return (
    <div className="CardApp">
      <h1 className="Cardh1">키워드 추천</h1>
      <Carousel responsive={responsive}>
        {product}
      </Carousel>
    </div>
  );
}