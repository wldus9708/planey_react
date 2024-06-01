import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { handleNavItemClick } from "../Navbar/Navbar";
import useUser from "../../../BBS/Log/useUser";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


export default function Product(props) {
  const user = useUser();
  const [cookies] = useCookies(['accessToken']);
  const navigate = useNavigate();

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
        <Card.Title><h2 className="title1">{props.name}</h2></Card.Title>
        <Card.Text>
        <h2 className="message1">{props.description}</h2>
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item><h2 className="price2">{props.price}원 부터~</h2></ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <button
          onClick={() => handleNavItemClick(user, cookies, 'HOTEL_DETAIL', `/lodgingDetail/${props.id}`, navigate)}>
          <h3 className="info1">상세정보</h3>
        </button>
      </Card.Body>
    </Card>
  );
}
