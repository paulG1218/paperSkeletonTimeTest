import React, { useEffect, useState } from "react";
import { Container, Row, Col, NavLink, Dropdown } from "react-bootstrap";
import { useLoaderData, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import "../css/AllProducts.css";
import { useSelector } from "react-redux";
import productOptions from "../productOptions.json";
import axios from "axios";

const AllProudcts = () => {
  const { category, initialProducts, productCount } = useLoaderData();

  const [searchParams, setSearchParams] = useSearchParams();

  const gender = searchParams.get("g");
  const subcategory = searchParams.get("sc");
  const tag = searchParams.get("tag");

  const [sortState, setSortState] = useState("sort by");
  const [products, setProducts] = useState(initialProducts);
  const [productCardsState, setProductCardsState] = useState();
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  let maxPage = 0;

  const getProducts = async () => {
    console.log(sortState, page, itemsPerPage);
    const res = await axios.get(
      `/api/browse/${category}?page=${page}&sort=${sortState}&itemsPerPage=${itemsPerPage}&subcategory=${subcategory}&tag=${tag}&gender=${gender}`
    );
    setProducts(res.data.products);
  };

  useEffect(() => {
    getProducts();
  }, [sortState, page, subcategory, gender, tag]);

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const paginationButtons = () => {
    const returnArray = [];
    for (let i = 0; i < productCount / itemsPerPage; i++) {
      returnArray.push(
        <button
          key={i}
          className="pagination-btn"
          onClick={() => setPage(i)}
          style={i === page ? { fontWeight: "700" } : { fontWeight: "300" }}
        >
          {i + 1}
        </button>
      );
    }
    maxPage = returnArray.length - 1;
    return returnArray;
  };

  const filterLinks = () => {
    const returnArray = [];
    const categoryNames = Object.keys(productOptions.categories);
    returnArray.push(
      <NavLink
        href="/browse/all"
        className="sidebar-category"
        style={{ color: category === "all" ? "black" : "#7C7C7C" }}
      >
        all
      </NavLink>
    );
    for (let i = 0; i < categoryNames.length; i++) {
      returnArray.push(
        <NavLink
          href={`/browse/${categoryNames[i]}?g=${gender}`}
          className="sidebar-category"
          style={{ color: category === categoryNames[i] ? "black" : "#7C7C7C" }}
        >
          {categoryNames[i]}
        </NavLink>
      );
      if (category === categoryNames[i]) {
        const subcategoryNames = Object.keys(
          productOptions.categories[category]
        );
        for (let i = 0; i < subcategoryNames.length; i++) {
          returnArray.push(
            <NavLink
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("sc", subcategoryNames[i]);
                  prev.delete("tag")
                  return prev;
                })
              }
              className="sidebar-category subcategory"
              style={{
                color:
                  subcategory === subcategoryNames[i] ? "black" : "#7C7C7C",
              }}
            >
              {subcategoryNames[i]}
            </NavLink>
          );
          if (subcategory === subcategoryNames[i]) {
            const tags = productOptions.categories[category][subcategory]
            for (let i = 0; i < tags.length; i++) {
              returnArray.push(
                <NavLink
                onClick={() =>
                  setSearchParams((prev) => {
                    prev.set("tag", tags[i]);
                    return prev;
                  })
                }
                className="sidebar-category tag"
                style={{
                  color:
                    tag === tags[i] ? "black" : "#7C7C7C",
                }}
              >
                {tags[i]}
              </NavLink>
              )
            }
          } {

          }
        }
      }
    }
    return returnArray;
  };

  return (
    <Container fluid className="products-container">
      <h3 className="products-header">the hottest threads for staying cool</h3>
      <p className="products-header">these things are sellin like hotcakes</p>
      <Dropdown className="sort-by-dropdown">
        <Dropdown.Toggle id="dropdown-basic" className="sort-by-dropdown">
          {sortState}
        </Dropdown.Toggle>

        <Dropdown.Menu className="sort-by-dropdown">
          <Dropdown.Item
            onClick={() => setSortState("featured")}
            className="sort-by-option"
          >
            featured
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setSortState("price: high-low")}
            className="sort-by-option"
          >
            price: high-low
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setSortState("price: low-high")}
            className="sort-by-option"
          >
            price: low-high
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Row className="all-products-row">
        <Col xs={{ span: 2 }} className="sidebar-col">
          <h5 className="sidebar-title">shop by category</h5>
          {filterLinks()}
        </Col>
        <Col className="products-col">
          <Row xs={3} className="products-row">
            {productCardsState &&
            productCardsState.every((a) => a === undefined) ? (
              <Col xs={{ span: 12 }} className="no-results">
                your search returned no results. try searching for something
                else
              </Col>
            ) : (
              productCardsState
            )}
          </Row>
        </Col>
        <Col xs={{span: 2}}></Col>
      </Row>
      <button className="pagination-btn" onClick={() => setPage(0)}>
        {"<<"}
      </button>
      <button
        className="pagination-btn"
        onClick={() =>
          setPage((prevState) => (prevState > 0 ? prevState - 1 : prevState))
        }
      >
        {"<"}
      </button>
      {paginationButtons()}
      <button
        className="pagination-btn"
        onClick={() =>
          setPage((prevState) =>
            prevState < maxPage ? prevState + 1 : prevState
          )
        }
      >
        {">"}
      </button>
      <button className="pagination-btn" onClick={() => setPage(maxPage)}>
        {">>"}
      </button>
    </Container>
  );
};

export default AllProudcts;
