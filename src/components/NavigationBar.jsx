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
} from "react-bootstrap";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { IoIosHeartEmpty } from "react-icons/io";
import "../css/NavigationBar.css";

const NavigationBar = () => {
  return (
    <>
      <Navbar className="navigationBar top">
        <Container fluid className="topNavigationContainer">
          <Navbar.Brand href="/" className="logo">
            <h1>melon <img src="../../public/melon-icon.svg" alt="logo" /></h1>
          </Navbar.Brand>
          <Col>
            <Nav  style={{"font-weight": "800", "padding-top": "24px",}}>
              <Col xs={{ span: 5, offset: 3 }}>
                <InputGroup style={{
                  "border": "1px solid #484343",
                  "border-radius": "4px",
                  "background-color": "#FFECDA",
                  "max-width": "35rem",
                  "max-height": "5rem",
                  "color": "#484343"
                }}>
                  <Nav.Link
                    className="searchButton"
                    style={{
                      "background-color": "#FFECDA",
                      "font-size": "24px",
                      "color": "#484343",
                      "border": "none",
                      "max-height": "24px",
                      "padding-top": "3px"
                    }}
                  >
                    <IoMdSearch style={{"vertical-align": "top"}}/>
                  </Nav.Link>
                  <Form.Control
                    type="search"
                    placeholder="Find your next fit"
                    className="searchBar"
                    style={{
                      "padding-top": "6px",
                      "font-size": "12px",
                      "background-color": "#FFECDA",
                      "border": "none",
                      "font-weight": "400",
                    }}
                  />
                </InputGroup>
              </Col>
              <Col xs={{ span: 4 }} style={{"color": "black", "font-size": "14px", display: "flex", "margin-left": "5rem"}}>
                <Nav.Link href="/login">
                <p style={{"color": "black"}}><VscAccount style={{"font-size": "18px", "vertical-align": "top", "margin-top": "2px", "margin-right": "3px"}}/> login / register</p>
                </Nav.Link>
                <Nav.Link href="#favorites">
                <p style={{"color": "black"}}><IoIosHeartEmpty style={{"font-size": "24px", "vertical-align": "top"}}/> favorites</p>
                </Nav.Link>
                <Nav.Link>
                  <p style={{"color": "black"}}><MdOutlineShoppingCart style={{"font-size": "24px", "vertical-align": "top"}}/> 0</p>
                </Nav.Link>
              </Col>
            </Nav>
          </Col>
        </Container>
      </Navbar>
      <Navbar className="navigationBar bottom">
        <Container fluid>
          <Col>
            <Nav style={{"margin-left": "25vw", "margin-right": "20vw"}} variant="underline" >
                <Nav.Link href="/new" style={{"color": "black", "font-size": "14px"}}>new arrivals</Nav.Link>
                <Nav.Link href="/men" style={{"color": "black", "font-size": "14px"}}>men</Nav.Link>
                <Nav.Link href="/women" style={{"color": "black", "font-size": "14px"}}>women</Nav.Link>
                <Nav.Link href="/accessories" style={{"color": "black", "font-size": "14px"}}>accessories</Nav.Link>
                <Nav.Link href="/shoes" style={{"color": "black", "font-size": "14px"}}>shoes</Nav.Link>
                <Nav.Link href="/sale" style={{"color": "black", "font-size": "14px"}}>sale</Nav.Link>
            </Nav>
          </Col>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
