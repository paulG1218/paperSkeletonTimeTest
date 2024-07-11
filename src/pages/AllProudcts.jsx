import React from 'react'
import { Container, Row, Col, NavLink } from 'react-bootstrap'
import { useLoaderData } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import '../css/AllProducts.css'

const AllProudcts = () => {

    const {products} = useLoaderData()

    console.log(products)

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
    <Container fluid className='products-container'>
      <h3 className='products-header'>the hottest threads for staying cool</h3>
      <p className='products-header'>these things are sellin like hotcakes</p>
      <Row className='sidebar'>
       
      </Row>
      <Row>
        <Col xs={{span: 1}} className='sidebar-col'>
          <h5 className='sidebar-title'>shop by category</h5>
          <NavLink href="/men" className='sidebar-category'>men</NavLink>
          <NavLink href="/women" className='sidebar-category'>women</NavLink>
          <NavLink href="/accessories" className='sidebar-category'>accessories</NavLink>
          <NavLink href="/shoes" className='sidebar-category'>shoes</NavLink>
          <NavLink href="/sale" className='sidebar-category'>sale</NavLink>
        </Col>
        <Col>
          <Row xs={3} className="products-row">
            {productCards}
          </Row>
        </Col>
        <Col xs={{span: 1}}>
        </Col>
      </Row>
    </Container>
  )
}

export default AllProudcts
