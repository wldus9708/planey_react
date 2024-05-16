import React from "react";

export default function Product(props) {
  return (
    <div className="card">
      <img className="product--image" src={props.img} alt="product image" />
      <h2>{props.name}</h2>
      <p className="price">{props.price}</p>
      <p>{props.description}</p>
      <p>
        <button>상세정보 보기</button>
      </p>
    </div>
  );
}