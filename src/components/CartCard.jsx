import axios from "axios";
import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "../css/CartCard.css";
import { useDispatch } from "react-redux";

const CartCard = ({ item, cartPos }) => {
  const { productId, title, price, image, quantity, size, color } = item;

  const dispatch = useDispatch();

  const [qtyState, setQtyState] = useState(quantity);

  const handleChangeQuantity = async (e) => {
    e.target.blur();
    console.log(e);
    console.log("requesting...");
    const res = await axios.put("/api/editCart", {
      quantity: Number(qtyState),
      cartPos: cartPos,
    });
    console.log(res.data);
    dispatch({
      type: "cartCheck",
      payload: res.data,
    });
  };

  return (
    <Card className="cart-card">
      <Card.Img src={image} className="cart-card-image" />
      <Card.Body className="cart-card-body">
        <Container>
          <Row>
            <Col className="cart-card-col-1">
              <Card.Title className="cart-card-title">{title}</Card.Title>
              <Card.Subtitle className="cart-card-price">
                ${price}
              </Card.Subtitle>
              <Card.Text className="cart-card-size">
                size:<button className="cart-card-size-button">{size}</button>
              </Card.Text>
            </Col>
            <Col className="cart-card-col-2">
              <img src="/delete.svg" alt="remove" className="remove-svg" />
              <Card.Text className="cart-card-qty-text">
                qty
                <input
                  className="cart-card-qty-input"
                  type="number"
                  value={qtyState}
                  onChange={(e) => setQtyState(e.target.value)}
                  onBlur={(e) => handleChangeQuantity(e)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleChangeQuantity(e)
                  }
                ></input>
              </Card.Text>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default CartCard;
