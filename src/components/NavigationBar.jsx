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
} from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import "../css/NavigationBar.css";

const NavigationBar = () => {

  const dispatch = useDispatch()

  const userId = useSelector((state) => state.userId);
  const email = useSelector((state) => state.email)
  const searchTerm = useSelector((state) => state.searchTerm)

  const [show, setShow] = useState(false);
  const [passwordState, setPasswordState] = useState('')
  const [confirmPasswordState, setConfirmPasswordState] = useState('')
  const [emailState, setEmailState] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [searchState, setSearchState] = useState(searchTerm)

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const sessionCheck = async () => {
    await axios.get("/api/sessionCheck").then((res) => {
      if (res.data.userId) {
        dispatch({
          type: "authenticated",
          payload: res.data,
        });
        console.log(res.data.userId);
      } else {
        console.log(res.data);
      }
    });
  };

  useEffect(() => sessionCheck, [userId])

  const handleLogin = async (e) => {
    e.preventDefault()

    if (isRegistering) {
      if (passwordState === confirmPasswordState) {
        const res = await axios.post("/api/register", {password: passwordState, email: emailState})
        switch (res.data.message) {
          case "success": {
            dispatch({
              type: "authenticated",
              payload: res.data.userId,
            });
            setPasswordState('')
            setConfirmPasswordState('')
            setEmailState('')
            handleClose()
            break;
          }
        }
      } else {
        console.log("passswords dont match")
      }
    } else {
      const res = await axios.post("/api/login", {password: passwordState, email: emailState})
      switch (res.data.message) {
        case "success": {
          dispatch({
            type: "authenticated",
            payload: res.data.userId,
          });
          setPasswordState('')
          setConfirmPasswordState('')
          setEmailState('')
          handleClose()
          break;
        }
    }
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()

    dispatch({
      type: "search",
      payload: searchState
    });
  }

  return (
    <>
      <Modal show={show} className="login-modal">
        <Modal.Header>
          <Button className="close-btn" onClick={handleClose}>
            <MdOutlineClose />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <h3 className="modal-title">{isRegistering? "register" : "login"}</h3>
          <p className="modal-subtitle">
            become a member — enjoy first dibs on new products and rewards
          </p>
          <Form className="login-form" onSubmit={(e) => handleLogin(e)}>
            <Form.Label>email</Form.Label>
            <Form.Control type="email" required onChange={(e) => setEmailState(e.target.value)}/>
            <Form.Label>password</Form.Label>
            <Form.Control type="password" required onChange={(e) => setPasswordState(e.target.value)}/>
              {isRegistering && 
                <>
                  <Form.Label>confirm password</Form.Label>
                  <Form.Control type="password" required onChange={(e) => setConfirmPasswordState(e.target.value)}/>
                </>
              }
            
            {!isRegistering && <div className="login-options">
              <Form.Check
                className="remember-check"
                type="check"
                label="remember me"
              />
              <a href="#forgot" className="forgot-password">
                forgot password?
              </a>
            </div>}
            <Button className="login-btn" type="submit">{isRegistering ? "register account" : "login"}</Button>
            {isRegistering ?
            <Button className="register-btn" onClick={() => setIsRegistering(false)}>login</Button>:
            <Button className="register-btn" onClick={() => setIsRegistering(true)}>register</Button>}
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
              <Nav.Link className="search-button" onClick={(e) => handleSearch(e)}>
                <img src="/search.svg" alt="search" className="search-svg"/>
              </Nav.Link>
              <Form.Control
                type="search"
                placeholder="Find your next fit"
                className="search-bar"
                onChange={(e) => setSearchState(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && handleSearch(e)}
              />
            </InputGroup>
          </Col>
          <Col className="links-column">
            <Nav.Link onClick={handleOpen}>
              <p className="login-link">
                <img src="/account.svg" alt="account" className="account-svg" /> {userId? email : 'login / register'}
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
