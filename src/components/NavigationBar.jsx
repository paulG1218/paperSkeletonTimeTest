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
import { MdOutlineClose } from "react-icons/md";
import "../css/NavigationBar.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

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
  const [passwordState, setPasswordState] = useState("");
  const [confirmPasswordState, setConfirmPasswordState] = useState("");
  const [emailState, setEmailState] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isRegistering) {
      if (passwordState === confirmPasswordState) {
        const res = await axios.post("/api/register", {
          password: passwordState,
          email: emailState,
        });
        switch (res.data.message) {
          case "success": {
            dispatch({
              type: "authenticated",
              payload: res.data.user,
            });
            setPasswordState("");
            setConfirmPasswordState("");
            setEmailState("");
            handleClose();
            break;
          }
        }
      } else {
        console.log("passswords dont match");
      }
    } else {
      const res = await axios.post("/api/login", {
        password: passwordState,
        email: emailState,
      });
      switch (res.data.message) {
        case "success": {
          dispatch({
            type: "authenticated",
            payload: res.data.user,
          });
          setPasswordState("");
          setConfirmPasswordState("");
          setEmailState("");
          handleClose();
          break;
        }
      }
    }
  };

  const handleSearch = (e) => {
    e.target.blur();
    window.location.href = `/searchResults?q=${searchState}`
  };

  console.log(window.location.href.includes('checkout'))

  if (!window.location.href.includes('checkout')) {
    return (
      <>
        <Modal show={show} className="login-modal">
          <Modal.Header>
            <Button className="close-btn" onClick={handleClose}>
              <MdOutlineClose />
            </Button>
          </Modal.Header>
          <Modal.Body>
            <h3 className="modal-title">
              {isRegistering ? "register" : "login"}
            </h3>
            <p className="modal-subtitle">
              become a member — enjoy first dibs on new products and rewards
            </p>
            <Form className="login-form" onSubmit={(e) => handleLogin(e)}>
              <Form.Label>email</Form.Label>
              <Form.Control
                type="email"
                required
                onChange={(e) => setEmailState(e.target.value)}
              />
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                required
                onChange={(e) => setPasswordState(e.target.value)}
              />
              {isRegistering && (
                <>
                  <Form.Label>confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    onChange={(e) => setConfirmPasswordState(e.target.value)}
                  />
                </>
              )}
  
              {!isRegistering && (
                <div className="login-options">
                  <Form.Check
                    className="remember-check"
                    type="check"
                    label="remember me"
                  />
                  <a href="#forgot" className="forgot-password">
                    forgot password?
                  </a>
                </div>
              )}
              <Button className="login-btn" type="submit">
                {isRegistering ? "register account" : "login"}
              </Button>
              {isRegistering ? (
                <Button
                  className="register-btn"
                  onClick={() => setIsRegistering(false)}
                >
                  login
                </Button>
              ) : (
                <Button
                  className="register-btn"
                  onClick={() => setIsRegistering(true)}
                >
                  register
                </Button>
              )}
            </Form>
          </Modal.Body>
        </Modal>
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
                    console.log(e);
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
      <Container className="checkout-container">
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
