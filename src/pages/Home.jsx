import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { useLoaderData } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import "../css/Home.css";
import DesktopBanner from "../components/DesktopBanner.jsx";
import MobileBanner from "../components/MobileBanner.jsx";

const Home = () => {
  const { products } = useLoaderData();

  const [windowDimension, setWindowDimension] = useState(null);

  useEffect(() => {
    setWindowDimension(window.innerWidth);

    const handleResize = () => {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const productCards = products.map((product) => {
    return (
      <ProductCard
        key={product.productId}
        productId={product.productId}
        title={product.title}
        description={product.description}
        image={product.image}
        price={product.price}
      />
    );
  });

  return (
    <>
      {windowDimension < 1050 ?
      <MobileBanner/>
      :
      <DesktopBanner/>
      }
    <Container fluid>
      <Row className="categories-title">
        <h3 className="categories-title">shop by category</h3>
        <h6 className="categories-title">whatcha lookin' for?</h6>
      </Row>
      <Row className="categories-row">
        <Col className="categories shirts-col">
          <a href="#shirts">
            <img src="/shirts.png" alt="" className="shirts" />
          </a>
        </Col>
        <Col className="categories shorts-col">
          <a href="#shorts">
            <img src="/shorts.png" alt="" className="shorts" />
          </a>
        </Col>
        <Col className="categories hats-col">
          <a href="#hats" className="hats-link">
            <img src="/hats.png" alt="" height="232px" className="hats" />
          </a>
          <a href="#athleisure" className="athleisure-link">
            <img
              src="/athleisure.png"
              alt=""
              height="232px"
              className="athleisure"
            />
          </a>
        </Col>
      </Row>
      <Row className="best-sellers">
        <h3 className="best-sellers">best sellers</h3>
        <h6 className="best-sellers">get 'em while you can</h6>
      </Row>
      <Row className="home-products-row">
        {productCards}
      </Row>
    </Container>
    </>
  );
};

export default Home;
