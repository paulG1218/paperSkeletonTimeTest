import { useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { useLoaderData } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import "../css/Home.css";

const Home = () => {
  const { products } = useLoaderData();

  const productCards = products.map((product) => {
    return (
      <ProductCard
        key={product.productId}
        title={product.title}
        description={product.description}
        image={product.image}
        price={product.price}
      />
    );
  });

  return (
    <Container fluid>
      <Row className="banner-1">
        <Col className="banner-1 title" xs={{ offset: 2, span: 5 }}>
          <h5 className="banner-1">SUMMER 2024</h5>
          <h1 className="banner-1">NEW COLLECTION</h1>
          <h4 className="banner-1">shorts, tees, tanks & more!</h4>
          <Button className="banner-1">
            <h3 className="banner-1">SHOP NOW</h3>
          </Button>
        </Col>
        <Col xs={{ span: 2 }}>
          <img
            src="/banner-1.png"
            alt=""
            className="banner-1 image"
            width="415px"
          />
        </Col>
      </Row>
      <Row className="categories-title">
        <h3 className="categories-title">shop by category</h3>
        <h6 className="categories-title">whatcha lookin' for?</h6>
      </Row>
      <Row>
        <Col xs={{ offset: 2 }} className="categories">
          <a href="#shirts">
            <img src="/shirts.png" alt="" height="490px" className="shirts" />
          </a>
        </Col>
        <Col className="categories">
          <a href="#shorts">
            <img src="/shorts.png" alt="" height="490px" className="shorts" />
          </a>
        </Col>
        <Col className="categories hats">
          <a href="#hats">
            <img src="/hats.png" alt="" height="232px" className="hats" />
          </a>
          <a href="#athleisure">
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
      <Row xs={4} className="products-row">
        {productCards}
      </Row>
    </Container>
  );
};

export default Home;
