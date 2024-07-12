import React, { useEffect, useState } from 'react'
import { Container, Row, Col, NavLink, Dropdown } from 'react-bootstrap'
import { useLoaderData } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import '../css/AllProducts.css'

const AllProudcts = () => {

    const {products} = useLoaderData()

    const [sortState, setSortState] = useState("sort by")
    const [productCardsState, setProductCardsState] = useState()

    useEffect(()  => {
      console.log("sorting...")
      switch (sortState) {
        case "price: low-high": {
          products.sort((a, b) => a.price - b.price)
          console.log("sorted low-high")
          break;
        }
        case "price: high-low": {
          products.sort((a, b) => b.price - a.price)
          console.log("sorted high-low")
          break;
        }
        case "featured": {
          products.sort((a, b) => a.productId - b.productId)
          break;
        }
        default: {
          products.sort((a, b) => a.productId - b.productId)
          break;
        }
      }
      setProductCardsState(products.map((product) => {
        console.log("created card")
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
        }))
    }, [sortState])




  return (
    <Container fluid className='products-container'>
      <h3 className='products-header'>the hottest threads for staying cool</h3>
      <p className='products-header'>these things are sellin like hotcakes</p>
      <Dropdown className='sort-by-dropdown'>
        <Dropdown.Toggle id="dropdown-basic" className='sort-by-dropdown'>
          {sortState}
        </Dropdown.Toggle>

        <Dropdown.Menu className='sort-by-dropdown'>
          <Dropdown.Item onClick={() => setSortState("featured")} className='sort-by-option'>featured</Dropdown.Item>
          <Dropdown.Item onClick={() => setSortState("price: high-low")} className='sort-by-option'>price: high-low</Dropdown.Item>
          <Dropdown.Item onClick={() => setSortState("price: low-high")} className='sort-by-option'>price: low-high</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
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
            {productCardsState}
          </Row>
        </Col>
        <Col xs={{span: 1}}>
        </Col>
      </Row>
    </Container>
  )
}

export default AllProudcts
