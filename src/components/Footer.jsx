import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  NavDropdown,
  Collapse,
} from "react-bootstrap";
import "../css/Footer.css";

const Footer = () => {
  if (!window.location.href.includes('checkout')) {

    return (
      <>
        <Navbar className="footer top">
          <Container fluid>
            <Navbar.Brand className="footer-logo">
              <h1>
                melon <img src="/melon-icon.svg" alt="logo" />
              </h1>
            </Navbar.Brand>
          </Container>
        </Navbar>
        <Navbar className="footer bottom">
          <Container fluid>
            <Col className="news-letter" xs={6}>
              <h2 className="news-letter">Catch every deal.</h2>
              <h3 className="news-letter">
                Subscribe to our newsletter for 10% off.
              </h3>
              <InputGroup>
                <Form.Control
                  className="subscribe-input"
                  placeholder="enter your email"
                ></Form.Control>
                <Button className="subscribe-btn">subscribe</Button>
              </InputGroup>
            </Col>
            <Col className="footer-link">
              <Nav className="footer-link">
                <h5 className="footer-link">SHOP</h5>
                <Nav.Link className="footer-link" href="#new">
                  new arrivals
                </Nav.Link>
                <Nav.Link className="footer-link" href="#men">
                  men
                </Nav.Link>
                <Nav.Link className="footer-link" href="#women">
                  women
                </Nav.Link>
                <Nav.Link className="footer-link" href="#shoes">
                  shoes
                </Nav.Link>
                <Nav.Link className="footer-link" href="#accessories">
                  accessories
                </Nav.Link>
                <Nav.Link className="footer-link" href="#sale">
                  sale
                </Nav.Link>
              </Nav>
            </Col>
            <Col className="footer-link">
              <Nav className="footer-link">
                <h5 className="footer-link">ABOUT</h5>
                <Nav.Link className="footer-link" href="#faq">
                  faq
                </Nav.Link>
                <Nav.Link className="footer-link" href="#careers">
                  careers
                </Nav.Link>
                <Nav.Link className="footer-link" href="#returns">
                  return policy
                </Nav.Link>
              </Nav>
            </Col>
            <Col className="footer-link">
              <Nav className="footer-link">
                <h5 className="footer-link">ACCOUNT</h5>
                <Nav.Link className="footer-link" href="#orders">
                  orders
                </Nav.Link>
                <Nav.Link className="footer-link" href="#favorites">
                  favorites
                </Nav.Link>
              </Nav>
            </Col>
          </Container>
        </Navbar>
      </>
    );
  }
};

export default Footer;
