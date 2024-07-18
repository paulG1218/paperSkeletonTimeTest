import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import "../css/Product.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Product = () => {
  const { product } = useLoaderData();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

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
      <button
        className="size-radio"
        key={i}
        style={{
          backgroundColor: `${sizeRadioState === i ? "black" : "white"}`,
          color: `${sizeRadioState === i ? "white" : "black"}`,
        }}
        onClick={() => {
          setSizeRadioState(i);
        }}
      >
        {size}
      </button>
    );
  });

  const handleCart = async () => {
    const cartData = {
      productId: productId,
      image: image,
      price: price,
      title: title,
      quantity: 1,
      size: sizes[sizeRadioState],
      color: colors[colorRadioState],
    };
    let existingIndex;
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      console.log(`testing cart at: ${i}`);
      if (
        item.productId === cartData.productId &&
        item.size === cartData.size &&
        item.color === cartData.color
      ) {
        console.log("match found!");
        existingIndex = i;
      }
    }
    if (existingIndex !== undefined) {
      const res = await axios.put("/api/editCart", {
        quantity: cart[existingIndex].quantity + 1,
        cartPos: existingIndex,
      });
      dispatch({
        type: "cartCheck",
        payload: res.data,
      });
    } else {
      dispatch({
        type: "addCart",
        payload: cartData,
      });
      const res = await axios.post("/api/cart", cartData);

      console.log(res.data);
    }
  };
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
          <button className="add-cart-btn" onClick={handleCart}>
            Add to Cart
          </button>
          <button className="favorite-btn">
            <img src="/favorite.svg" alt="heart" className="favorites-svg" />
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default Product;
