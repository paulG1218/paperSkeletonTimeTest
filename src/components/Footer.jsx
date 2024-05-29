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
import "../css/Footer.css"

const Footer = () => {
  return (
    <>
      <Navbar className="footer top">
        <Container>
            <Navbar.Brand className="logo">
                <h1>melon <img src="../../public/melon-icon.svg" alt="logo" /></h1>
            </Navbar.Brand>
        </Container>
      </Navbar>
      <Navbar className="footer bottom">
        <Container >
                <Col className="news-letter" xs={6}>
                    <h2>Catch every deal.</h2>
                    <h3>Subscribe to our newsletter for 10% off.</h3>
                    <InputGroup>
                        <Form.Control placeholder="enter your email"></Form.Control>
                        <Button className="subscribe-btn">subscribe</Button>
                    </InputGroup>
                </Col>
                <Col style={{"vertical-align": "top", "height": "398px"}}>
                    <h5>SHOP</h5>
                    <p>new arrivals</p>
                    <p>men</p>
                    <p>women</p>
                    <p>shoes</p>
                    <p>accessories</p>
                    <p>sale</p>
                </Col>
                <Col style={{"vertical-align": "top", "height": "398px"}}>
                    <h5>ABOUT</h5>
                    <p>faq</p>
                    <p>careers</p>
                    <p>return policy</p>
                </Col>
                <Col style={{"vertical-align": "top", "height": "398px"}}>
                    <h5>ACCOUNT</h5>
                    <p>orders</p>
                    <p>favorites</p>
                </Col>
        </Container>
      </Navbar>
    </>
  )
}

export default Footer
