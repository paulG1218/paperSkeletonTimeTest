import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import "../css/Product.css";

const Product = () => {
  const { product } = useLoaderData();

  const { title, description, image, price, productId, colors, sizes, tags } =
    product;

  const [colorRadioState, setColorRadioState] = useState(0);
  const [sizeRadioState, setSizeRadioState] = useState(0);

  const colorRadios = colors.map((color, i) => {
    return (
      <button
        className="color-radio"
        key={i}
        style={{
          backgroundColor: `${color}`,
          border: `${
            colorRadioState === i ? "2px solid black" : `2px solid ${color}`
          }`,
        }}
        onClick={() => {
          setColorRadioState(i);
        }}
      />
    );
  });

  const sizeRadios = sizes.map((size, i) => {
    return (
      <button className="size-radio" key={i} style={{backgroundColor: `${sizeRadioState === i ? "black" : "white"}`, color: `${sizeRadioState === i ? "white" : "black"}`}} onClick={() => {
        setSizeRadioState(i);
      }}>
        {size}
      </button>
    );
  });
  return (
    <Container className="product-container">
      <Row>
        <Col className="product-image">
          <img
            src={image}
            alt={`image of ${title}`}
            className="product-image"
          />
        </Col>
        <Col className="product-details">
          <h5 className="product-title">{title}</h5>
          <h4 className="product-price">${price}</h4>
          <p className="product-description">{description}</p>
          <small className="product-option-label">available colors:</small>
          <br />
          {colorRadios}
          <br />
          <small className="product-option-label">size:</small>
          <br />
          {sizeRadios}
          <br />
          <button className="add-cart-btn">Add to Cart</button>
          <button className="favorite-btn"><img src="/favorite.svg" alt="heart" className="favorites-svg"/></button>
        </Col>
      </Row>
    </Container>
  );
};

export default Product;
