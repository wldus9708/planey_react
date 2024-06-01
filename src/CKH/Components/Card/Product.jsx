import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useNavigate } from "react-router-dom";
import { handleNavItemClick } from "../Navbar/Navbar";
import useUser from "../../../BBS/Log/useUser";
import { useCookies } from "react-cookie";
import "./Product.css";

export default function Product(props) {
  const user = useUser();
  const [cookies] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  // console.log("props.img:" + props.img);
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

    <Card  style={{ width: "18rem" }}>
      <Card.Img className="product--image" variant="top" src={props.img} />
        <Card.Body>
          <Card.Title className="title1">{props.name}</Card.Title>
          <Card.Text className="message1">{props.description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item className="body2">{props.price.toLocaleString()}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <button
            onClick={() =>
              handleNavItemClick(
                user,
                cookies,
                "PACKAGE_DETAIL",
                `/PackageDetail/${props.id}`,
                navigate
              )
            }
          >
            상세정보
          </button>
        </Card.Body>
    </Card>
  );
}
