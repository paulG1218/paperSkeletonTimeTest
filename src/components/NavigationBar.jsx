import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Col,
  Form,
  InputGroup,
  Button,
  Modal,
} from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import "../css/NavigationBar.css";

const NavigationBar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  return (
    <>
      <Modal show={show} className="login-modal">
        <Modal.Header>
          <Button className="close-btn" onClick={handleClose}>
            <MdOutlineClose />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <h3 className="modal-title">login</h3>
          <p className="modal-subtitle">
            become a member — enjoy first dibs on new products and rewards
          </p>
          <Form className="login-form">
            <Form.Label>email</Form.Label>
            <Form.Control type="email" />
            <Form.Label>password</Form.Label>
            <Form.Control type="password" />
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
            <Button className="login-btn">login</Button>
            <Button className="register-btn">register</Button>
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
              <Nav.Link className="search-button">
                <img src="/search.svg" alt="search" className="search-svg"/>
              </Nav.Link>
              <Form.Control
                type="search"
                placeholder="Find your next fit"
                className="search-bar"
              />
            </InputGroup>
          </Col>
          <Col className="links-column">
            <Nav.Link onClick={handleOpen}>
              <p className="login-link">
                <img src="/account.svg" alt="account" className="account-svg" /> login / register
              </p>
            </Nav.Link>
            <Nav.Link href="#favorites">
              <p className="favorites-link">
                <img src="/favorite.svg" alt="heart" className="favorites-svg" /> favorites
              </p>
            </Nav.Link>
            <Nav.Link href="#cart">
              <p className="cart-link">
                <img src="/cart.svg" alt="cart" className="cart-svg" /> 0
              </p>
            </Nav.Link>
          </Col>
        </Container>
      </Navbar>
      <Navbar className="navigation-bar bottom">
        <Container className="category-container" fluid>
          <Nav variant="underline" className="justify-content-center" as={Col}>
            <Nav.Link className="category" href="/new">
              new arrivals
            </Nav.Link>
            <Nav.Link className="category" href="/men">
              men
            </Nav.Link>
            <Nav.Link className="category" href="/women">
              women
            </Nav.Link>
            <Nav.Link className="category" href="/accessories">
              accessories
            </Nav.Link>
            <Nav.Link className="category" href="/shoes">
              shoes
            </Nav.Link>
            <Nav.Link className="category" href="/sale">
              sale
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
