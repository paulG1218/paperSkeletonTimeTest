import React, {useEffect, useState} from 'react'
import { Container, Row, Col, Dropdown, Form } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import axios from 'axios'
import "../css/SearchResults.css"

const SearchResults = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const searchTerm = searchParams.get('q')

    const [sortState, setSortState] = useState(["created_at", "DESC"]);
  const [products, setProducts] = useState([]);
  const [productCardsState, setProductCardsState] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [category, setCategory] = useState("")
  const [gender, setGender] = useState("")
  const [productCount, setProductCount] = useState(0)
  const [newArrivalFilter, setNewArrivalFilter] = useState(false)
  const [filterCount, setFilterCount] = useState({
    new: 0,
    men: 0,
    women: 0,
    accessories: 0,
    shoes: 0,
  })
  let maxPage = 0;

  const getProducts = async () => {
    const res = await axios.get(
      `/api/getSearchProducts/?search=${searchTerm}&page=${page}&sort=${sortState}&itemsPerPage=${itemsPerPage}`
    );
    setProductCount(res.data.count.count)
    setProducts(res.data.products);
  };

  useEffect(() => {
    getProducts()
  }, [page, sortState])

  useEffect(() => {
    const newFilterCount = {
      new: 0,
      men: 0,
      women: 0,
      accessories: 0,
      shoes: 0,
    }
    setProductCardsState(
      products.map((product) => {
        if (new Date(product.createdAt) > (Date.now() - 604800000)) {//week in ms 604800000
          newFilterCount.new++
        }
        if (product.gender === "men" || product.gender === "unisex") {
          newFilterCount.men++
        }
        if (product.gender === "women" || product.gender === "unisex") {
          newFilterCount.women++
        }
        if (product.category === "accessories") {
          newFilterCount.accessories++
        }
        if (product.category === "shoes") {
          newFilterCount.shoes++
        }
        if (newArrivalFilter && new Date(product.createdAt) < (Date.now() - 604800000)) {
          return
        }
        if (category && category !== product.category) {
          return
        } else if (gender && product.gender !== gender && product.gender !== "unisex") {
          return
        }
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
    setFilterCount(newFilterCount)
  }, [products, gender, category, newArrivalFilter]);

  return (
    <Container className='results-container' fluid>
        <Col className='results-sidebar-col'>
        <Row className='results-sidebar-category' onClick={() => {
          setNewArrivalFilter(!newArrivalFilter)
          setCategory("")
          setGender("")
          }}>
            <h4 className='results-sidebar-label' style={{color: newArrivalFilter ? "red" : "var(--text-color)"}}>new arrivals</h4>
            <p className='results-sidebar-count'>{filterCount.new}</p>
        </Row>
        <Row className='results-sidebar-category' onClick={() => {
          setGender(gender === "men" ? "" : "men")
          setCategory("")
          setNewArrivalFilter("")
          }}>
            <h4 className='results-sidebar-label' style={{color: gender === "men" ? "red" : "var(--text-color)"}}>men</h4>
            <p className='results-sidebar-count'>{filterCount.men}</p>
        </Row>
        <Row className='results-sidebar-category' onClick={() => {
          setGender(gender === "women" ? "" : "women")
          setCategory("")
          setNewArrivalFilter("")
          }}>
            <h4 className='results-sidebar-label' style={{color: gender === "women" ? "red" : "var(--text-color)"}}>women</h4>
            <p className='results-sidebar-count'>{filterCount.women}</p>
        </Row>
        <Row className='results-sidebar-category' onClick={() => {
          setCategory(category === "accessories" ? "" : "accessories")
          setGender("")
          setNewArrivalFilter("")
          }}>
            <h4 className='results-sidebar-label' style={{color: category === "accessories" ? "red" : "var(--text-color)"}}>accessories</h4>
            <p className='results-sidebar-count'>{filterCount.accessories}</p>
        </Row>
        <Row className='results-sidebar-category' onClick={() => {
          setCategory(category === "shoes" ? "" : "shoes")
          setGender("")
          setNewArrivalFilter("")
          }}>
            <h4 className='results-sidebar-label' style={{color: category === "shoes" ? "red" : "var(--text-color)"}}>shoes</h4>
            <p className='results-sidebar-count'>{filterCount.shoes}</p>
        </Row>
        </Col>
        <Col className='results-main-col'>
            <Container className='results-main-container'>
                <h3 className='results-header'>search result</h3>
                <Row className='results-options-row'>
                    <Dropdown autoClose="outside" className='results-sort-by-dropdown'>
                        <Dropdown.Toggle className='results-sort-by-toggle'>sort by</Dropdown.Toggle>
                        <Dropdown.Menu className='results-sort-by-menu'>
                                <Form.Check type='radio' label="newest" name='sort-by' onClick={() => setSortState(["created_at", "DESC"])} defaultChecked="true"/>
                                <Form.Check type='radio' label="lowest price" name='sort-by' onClick={() => setSortState(["price", "ASC"])}/>
                                <Form.Check type='radio' label="highest price" name='sort-by' onClick={() => setSortState(["price", "DESC"])}/>
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
                <Row xs={2} xl={3} className='results-products-row'>
                    {productCardsState}
                </Row>
            </Container>
        </Col>
    </Container>
  )
}

export default SearchResults
