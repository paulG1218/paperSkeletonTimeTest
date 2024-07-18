import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import "../css/Cart.css";
import { useLoaderData } from "react-router-dom";
import CartCard from "../components/CartCard.jsx";
import { useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.price * item.quantity;
    });
    setSubTotal(count.toFixed(2));
    setShipping((9.99 + count * 0.07).toFixed(2));
    setTotal();
  }, [cart]);

  const cartCards = cart.map((item, i) => {
    return <CartCard key={i} item={item} cartPos={i} />;
  });

  return (
    <Container className="cart-container">
      <Row className="cart-row">
        <Col className="cart-cards-col">
          <h2 className="cart-header">Cart</h2>
          {cartCards}
        </Col>
        <Col className="cart-info-col">
          <p className="cart-info-heading">login and earn rewards</p>
          <Button className="cart-login-btn">login</Button>
          <Row>
            <Col>
              <p className="cart-info-text left">sub total</p>
              <p className="cart-info-text left">estimated shipping</p>
            </Col>
            <Col>
              <p className="cart-info-text right">${subTotal}</p>
              <p className="cart-info-text right">${shipping}</p>
            </Col>
          </Row>
          <hr className="cart-info-divider" />
          <Row>
            <Col>
              <p className="cart-info-total left">total</p>
            </Col>
            <Col>
              <p className="cart-info-total right">
                ${Number(subTotal) + Number(shipping)}
              </p>
            </Col>
          </Row>
          <Button className="checkout-btn">continue to checkout</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
