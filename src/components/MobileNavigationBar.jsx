import React, { useState, useEffect } from "react";
import { Col, Container, Navbar, Nav, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import LoginModal from "./LoginModal.jsx";
import axios from "axios";
import "../css/MobileNavigationBar.css";

const MoblieNavigationBar = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

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

  const [searchState, setSearchState] = useState(searchParams.get("q") || "");

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

  const handleCloseLogin = () => setShowLogin(false);
  const handleOpenLogin = () => setShowLogin(true);

  const handleCloseMenu = () => setShowMenu(false);
  const handleOpenMenu = () => setShowMenu(true);
  
  const handleCloseSearch = () => setShowSearch(false);
  const handleOpenSearch = () => setShowSearch(true);

  return (
    <>
      <LoginModal show={showLogin} handleClose={handleCloseLogin} />
      <Navbar className="mobile-navbar">
        <Container fluid className="mobile-navigation-container">
          <Col className={showSearch ? "mobile-search-col" : "mobile-logo-col"}>
          {showSearch ? 
          <>
            <Nav.Link className="mobile-search-btn" onClick={(e) => handleSearch(e)} >
            <img
              src="/search.svg"
              alt="search"
              className="mobile-search-svg"
              />
            </Nav.Link>
            <input type="text" className="mobile-search-bar" placeholder="search" value={searchState}
                  onReset={(e) => console.log(e)}
                  onChange={(e) => {
                    setSearchState(e.target.value);
                  }}
                  onKeyUp={(e) => e.key === "Enter" && handleSearch(e)}/>
            <img src="/close.svg" alt="close" className="mobile-close-search" onClick={handleCloseSearch}/>
          </>
            :
            <Navbar.Brand href="/" className="mobile-logo">
              <p className="mobile-logo-text">melon</p>
              <img
                src="/melon-icon.svg"
                alt="logo"
                className="mobile-logo-svg"
              />
            </Navbar.Brand>
          }
          </Col>
          <Col className="mobile-links-col" style={{display: showSearch ? "none" : "inherit"}}>
            <Nav.Link className="mobile-navbar-link">
              <img
                src="/search.svg"
                alt="search"
                className="mobile-search-svg"
                onClick={handleOpenSearch}
              />
            </Nav.Link>
            <Nav.Link className="mobile-navbar-link" onClick={handleOpenLogin}>
              <img
                src="/account.svg"
                alt="account"
                className="mobile-account-svg"
              />
            </Nav.Link>
            <Nav.Link className="mobile-navbar-link">
              <img
                src="/favorite.svg"
                alt="favorites"
                className="mobile-favorite-svg"
              />
            </Nav.Link>
            <Nav.Link className="mobile-navbar-link"  href="/cart">
              <img src="/cart.svg" alt="cart" className="mobile-cart-svg" />
              {" "}{cartCount}
            </Nav.Link>
            <Nav.Link className="mobile-navbar-link" onClick={() => showMenu ? handleCloseMenu() : handleOpenMenu()}>
              {showMenu ? 
              <img src="/close.svg" alt="close" className="mobile-close-svg" />
              :
              <img src="/menu.svg" alt="more" className="mobile-menu-svg" />
              }
            </Nav.Link>
          </Col>
        </Container>
        <Container className="mobile-dropdown" style={{display: showMenu ? "flex" : "none"}}>
          <Nav.Link className="mobile-dropdown-link">
            <Row className="mobile-dropdown-row">
              new arrivals
              <img src="/chevron_forward.svg" alt=">" className="forward-svg" />
            </Row>
          </Nav.Link>
          <Nav.Link className="mobile-dropdown-link" href="/browse/all?g=men">
            <Row className="mobile-dropdown-row">
              men
              <img src="/chevron_forward.svg" alt=">" className="forward-svg" />
            </Row>
          </Nav.Link>
          <Nav.Link className="mobile-dropdown-link"  href="/browse/all?g=women">
            <Row className="mobile-dropdown-row">
              women
              <img src="/chevron_forward.svg" alt=">" className="forward-svg" />
            </Row>
          </Nav.Link>
          <Nav.Link className="mobile-dropdown-link" href="/browse/accessories">
            <Row className="mobile-dropdown-row">
              accessories
              <img src="/chevron_forward.svg" alt=">" className="forward-svg" />
            </Row>
          </Nav.Link>
          <Nav.Link className="mobile-dropdown-link" href="/browse/shoes">
            <Row className="mobile-dropdown-row">
              shoes
              <img src="/chevron_forward.svg" alt=">" className="forward-svg" />
            </Row>
          </Nav.Link>
          <Nav.Link className="mobile-dropdown-link">
            <Row className="mobile-dropdown-row">
              sale
              <img src="/chevron_forward.svg" alt=">" className="forward-svg" />
            </Row>
          </Nav.Link>
        </Container>
      </Navbar>
    </>
  );
};

export default MoblieNavigationBar;
