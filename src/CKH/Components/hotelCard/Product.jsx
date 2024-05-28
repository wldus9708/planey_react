import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";


export default function Product(props) {
  return (

    // <div className="card">
    //   <img className="product--image" src={props.img} alt="product image" />
    //   <h2>{props.name}</h2>
    //   <p className="price">{props.price}</p>
    //   <p>{props.description}</p>
    //   <p>
    //     <button>상세정보 보기</button>
    //   </p>
    // </div>

    <Card style={{ width: "18rem" }}>
      <Card.Img className="product--image" variant="top" src={props.img} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          {props.description}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{props.price}원 부터~</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Link to={`/lodgingDetail/${props.id}`}>
          <button>상세정보</button>
        </Link>
      </Card.Body>
    </Card>
  );
}
