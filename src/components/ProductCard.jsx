import React from "react";
import { Card, Col, NavLink } from "react-bootstrap";
import "../css/ProductCard.css";

const ProductCard = ({ title, description, image, price, productId }) => {
  return (
    <Col className="card-column">
      <NavLink href={`/products/${productId}`}>
        <Card className="productCard">
          <Card.Img
            src={image}
            alt={`image of ${title}`}
            width="306px"
            height="490px"
          />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>${price}</Card.Text>
          </Card.Body>
        </Card>
      </NavLink>
    </Col>
  );
};

export default ProductCard;
