import React, {useEffect, useState} from 'react'
import { Container, Row, Col, Dropdown, Form } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import axios from 'axios'
import "../css/SearchResults.css"

const SearchResults = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const searchTerm = searchParams.get('q')

    const [sortState, setSortState] = useState("");
  const [products, setProducts] = useState([]);
  const [productCardsState, setProductCardsState] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [category, setCategory] = useState("")
  const [gender, setGender] = useState("")
  const [productCount, setProductCount] = useState(0)
  let maxPage = 0;

  const getProducts = async () => {
    console.log(sortState, page, itemsPerPage);
    const res = await axios.get(
      `/api/getSearchProducts/?search=${searchTerm}&page=${page}&sort=${sortState}&itemsPerPage=${itemsPerPage}&category=${category}&gender=${gender}`
    );
    setProducts(res.data.products);
  };

  const getInitialProducts = async () => {
    console.log(sortState, page, itemsPerPage);
    const res = await axios.get(
      `/api/getSearchProducts/?search=${searchTerm}&page=${page}&sort=${sortState}&itemsPerPage=${itemsPerPage}&category=${category}&gender=${gender}&initial=true`
    );
    setProductCount(res.data.count)
    setProducts(res.data.products);
  };

  useEffect(() => {
    getInitialProducts()
  }, [])

  useEffect(() => {
    setProductCardsState(
      products.map((product) => {
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
      })
    );
  }, [products]);

  return (
    <Row>
        <Col className='results-sidebar-col'>
        <Row className='results-sidebar-category'>
            <h4 className='results-sidebar-label'>new arrivals</h4>
            <p className='results-sidebar-count'>10</p>
        </Row>
        <Row className='results-sidebar-category'>
            <h4 className='results-sidebar-label'>men</h4>
            <p className='results-sidebar-count'>10</p>
        </Row>
        <Row className='results-sidebar-category'>
            <h4 className='results-sidebar-label'>women</h4>
            <p className='results-sidebar-count'>10</p>
        </Row>
        <Row className='results-sidebar-category'>
            <h4 className='results-sidebar-label'>accessories</h4>
            <p className='results-sidebar-count'>10</p>
        </Row>
        <Row className='results-sidebar-category'>
            <h4 className='results-sidebar-label'>shoes</h4>
            <p className='results-sidebar-count'>10</p>
        </Row>
        </Col>
        <Col className='results-main-col'>
            <Container className='results-main-container'>
                <h3 className='results-header'>search result</h3>
                <Row className='results-options-row'>
                    <Dropdown autoClose="outside" className='results-sort-by-dropdown'>
                        <Dropdown.Toggle className='results-sort-by-toggle'>sort by</Dropdown.Toggle>
                        <Dropdown.Menu className='results-sort-by-menu'>
                                <Form.Check type='radio' label="newest" name='sort-by'/>
                                <Form.Check type='radio' label="lowest price" name='sort-by'/>
                                <Form.Check type='radio' label="highest price" name='sort-by'/>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown autoClose="outside" className='results-size-dropdown'>
                        <Dropdown.Toggle className='results-size-toggle'>size</Dropdown.Toggle>
                        <Dropdown.Menu className='results-size-menu'>
                            <Row className='results-size-menu-row'>
                                <Form.Check type='checkbox' label="extra-small" name='size' className='results-size-check'/>
                                <p className='results-size-count'>10</p>
                            </Row>
                            <Row className='results-size-menu-row'>
                                <Form.Check type='checkbox' label="small" name='size' className='results-size-check'/>
                                <p className='results-size-count'>10</p>
                            </Row>
                            <Row className='results-size-menu-row'>
                                <Form.Check type='checkbox' label="medium" name='size' className='results-size-check'/>
                                <p className='results-size-count'>10</p>
                            </Row>
                            <Row className='results-size-menu-row'>
                                <Form.Check type='checkbox' label="large" name='size' className='results-size-check'/>
                                <p className='results-size-count'>10</p>
                            </Row>
                            <Row className='results-size-menu-row'>
                                <Form.Check type='checkbox' label="extra-large" name='size' className='results-size-check'/>
                                <p className='results-size-count'>10</p>
                            </Row>
                        </Dropdown.Menu>
                    </Dropdown>
                </Row>
                    <Row className='results-product-count-row'>
                        <p className='results-product-count'>{productCount} products</p>
                    </Row>
                <Row xs={3} className='results-products-row'>
                    {productCardsState}
                </Row>
            </Container>
        </Col>
    </Row>
  )
}

export default SearchResults
