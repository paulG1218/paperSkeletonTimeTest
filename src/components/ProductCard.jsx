import React from "react";
import { Card, Col } from "react-bootstrap";
import "../css/ProductCard.css";

const ProductCard = ({ title, description, image, price }) => {
  return (
    <Col className="card-column">
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
    </Col>
  );
};

export default ProductCard;
