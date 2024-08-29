import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Col,
  Form,
  InputGroup,
  Button,
  Modal,
  NavLink,
  Row
} from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../css/NavigationBar.css";
import { useSearchParams } from "react-router-dom";
import LoginModal from "./LoginModal.jsx";

const NavigationBar = () => {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const userId = useSelector((state) => state.userId);
  const email = useSelector((state) => state.email);
  const isAdmin = useSelector((state) => state.isAdmin);
  const cartCount = useSelector((state) => {
    const cart = state.cart;
    let count = 0;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]) {
        count = count + Number(cart[i].quantity);
      }
    }
    return count;
  });

  const [show, setShow] = useState(false);
  const [searchState, setSearchState] = useState(searchParams.get("q") || "");

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const sessionCheck = async () => {
    await axios.get("/api/sessionCheck").then((res) => {
      if (res.data.user) {
        dispatch({
          type: "authenticated",
          payload: res.data.user,
        });
      } else {
        console.log(res.data);
      }
    });
  };

  const cartCheck = async () => {
    const res = await axios.get("/api/cart");
    dispatch({
      type: "cartCheck",
      payload: res.data,
    });
  };

  useEffect(() => sessionCheck, [userId]);
  useEffect(() => cartCheck, [cartCount]);

  const handleSearch = (e) => {
    e.target.blur();
    window.location.href = `/searchResults?q=${searchState}`
  };

  if (!window.location.href.includes('checkout')) {
    return (
      <>
        <LoginModal show={show} handleClose={handleClose}/>
        <Navbar className="navigation-bar top">
          <Container fluid className="top-navigation-container">
            <Col className="logo-column">
              <Navbar.Brand href="/" className="header-logo">
                <h1 className="header-logo">
                  melon <img src="/melon-icon.svg" alt="logo" />
                </h1>
              </Navbar.Brand>
            </Col>
            <Col className="search-column">
              <InputGroup className="search-group">
                <Nav.Link
                  className="search-button"
                  onClick={(e) => handleSearch(e)}
                >
                  <img src="/search.svg" alt="search" className="search-svg" />
                </Nav.Link>
                <Form.Control
                  type="search"
                  placeholder="Find your next fit"
                  className="search-bar"
                  value={searchState}
                  onReset={(e) => console.log(e)}
                  onChange={(e) => {
                    setSearchState(e.target.value);
                  }}
                  onKeyUp={(e) => e.key === "Enter" && handleSearch(e)}
                />
              </InputGroup>
            </Col>
            <Col className="links-column">
              {isAdmin && (
                <Nav.Link href="/adminDash">
                  <p className="dashboard-link">
                    <img src="/control.svg" alt="" className="control-svg"/>
                    Dashboard
                  </p>
                </Nav.Link>
              )}
              <Nav.Link onClick={handleOpen}>
                <p className="login-link">
                  <img src="/account.svg" alt="account" className="account-svg" />{" "}
                  {userId ? email : "login / register"}
                </p>
              </Nav.Link>
              <Nav.Link href="#favorites">
                <p className="favorites-link">
                  <img
                    src="/favorite.svg"
                    alt="heart"
                    className="favorites-svg"
                  />{" "}
                  favorites
                </p>
              </Nav.Link>
              <Nav.Link href="/cart">
                <p className="cart-link">
                  <img src="/cart.svg" alt="cart" className="cart-svg" />{" "}
                  {cartCount}
                </p>
              </Nav.Link>
            </Col>
          </Container>
        </Navbar>
        <Navbar className="navigation-bar bottom">
          <Container className="category-container" fluid>
            <Nav variant="underline" className="justify-content-center" as={Col}>
              <Nav.Link className="category" href="#browse/new">
                new arrivals
              </Nav.Link>
              <Nav.Link className="category" href="/browse/all?g=men">
                men
              </Nav.Link>
              <Nav.Link className="category" href="/browse/all?g=women">
                women
              </Nav.Link>
              <Nav.Link className="category" href="/browse/accessories">
                accessories
              </Nav.Link>
              <Nav.Link className="category" href="/browse/shoes">
                shoes
              </Nav.Link>
              <Nav.Link className="category" href="#browse/sale">
                sale
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  } else {
    return (
      <Container className="checkout-nav-container">
          <Col>
            <NavLink className="return-cart-link" href="/cart">
              <img src="/arrow_back.svg" alt="<--" className="return-cart-arrow"/>
              back to shopping cart</NavLink>
          </Col>
          <Col>
            <Navbar.Brand href="/" className="checkout-logo">
              <h1 className="header-logo">
                melon <img src="/melon-icon.svg" alt="logo" />
              </h1>
            </Navbar.Brand>
          </Col>
          <Col></Col>
      </Container>
    )
  }
};

export default NavigationBar;
