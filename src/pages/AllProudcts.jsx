import React, { useEffect, useState } from 'react'
import { Container, Row, Col, NavLink, Dropdown } from 'react-bootstrap'
import { useLoaderData, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import '../css/AllProducts.css'
import { useSelector } from 'react-redux'
import axios from 'axios'

const AllProudcts = () => {

  const {category, initialProducts, productCount} = useLoaderData()

    const [searchParams, setSearchParams] = useSearchParams()

    const searchTerm = searchParams.get('q')

    const [sortState, setSortState] = useState("sort by")
    const [products, setProducts] = useState(initialProducts)
    const [productCardsState, setProductCardsState] = useState()
    const [page, setPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    let maxPage = 0

    const getProducts = async () => {
      console.log(sortState, page, itemsPerPage)
      const res = await axios.get(`/api/${category}?page=${page}&sort=${sortState}&itemsPerPage=${itemsPerPage}`)
      setProducts(res.data.products)
    }

    useEffect(()  => {
      getProducts()
    }, [sortState, searchTerm, page])

    useEffect(() => {
      setProductCardsState(products.map((product) => {
        if (!searchTerm || product.title.toLowerCase().includes(searchTerm)) {
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
        }
        }))
    }, [products])

    useEffect(() =>{
      window.scrollTo({top: 0, behavior: 'smooth'})
    }, [page])

    const paginationButtons = () => {
      const returnArray = []
      for (let i = 0; i < productCount/itemsPerPage; i++) {
        returnArray.push(<button key={i} className='pagination-btn' onClick={() => setPage(i)} style={i === page ? {"fontWeight": "700"} : {"fontWeight": "300"}}>{i + 1}</button>)
      }
      maxPage = returnArray.length - 1
      console.log(maxPage)
      return returnArray
    }

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
            {productCardsState && productCardsState.every((a) => a === undefined) ? 
            <Col xs={{span: 12}} className='no-results'>your search returned no results. try searching for something else</Col> :
            productCardsState}
          </Row>
        </Col>
        <Col xs={{span: 1}}>
        </Col>
      </Row>
      <button className='pagination-btn' onClick={() => setPage(0)}>{"<<"}</button>
      <button className='pagination-btn' onClick={() => setPage((prevState) => prevState > 0 ? prevState - 1 : prevState)}>{"<"}</button>
      {paginationButtons()}
      <button className='pagination-btn' onClick={() => setPage((prevState) => prevState < maxPage ? prevState + 1: prevState)}>{">"}</button>
      <button className='pagination-btn' onClick={() => setPage(maxPage)}>{">>"}</button>
    </Container>
  )
}

export default AllProudcts
