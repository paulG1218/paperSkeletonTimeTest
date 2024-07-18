import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import "../css/AddProduct.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const isAdmin = useSelector((state) => state.isAdmin);

  const navigate = useNavigate();

  const [colorCount, setColorCount] = useState([1]);
  const [colorInputs, setColorInputs] = useState([]);
  const [sizesState, setSizesState] = useState({
    XS: false,
    S: false,
    M: false,
    L: false,
    XL: false,
    OS: false,
  });

  useEffect(() => {
    setColorInputs(
      colorCount.map((colorId) => {
        return (
          <Form.Control key={colorId} type="color" className="color-select" />
        );
      })
    );
  }, [colorCount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin) {
      window.location.href = "/";
    }

    const colorsArray = colorCount.map((x) => {
      return e.target[x + 15].value;
    });

    let sizesArray = [];

    if (sizesState.OS) {
      sizesArray.push("One Size");
    } else {
      for (let size in sizesState) {
        if (sizesState[size]) {
          sizesArray.push(size.toLowerCase());
        }
      }
    }

    let tagsArray = [];

    for (let i = 0; i < 6; i++) {
      if (e.target[i + 10].checked) {
        tagsArray.push(e.target[i + 10].name);
      }
    }

    console.log(e);
    const productData = {
      title: e.target[0].value,
      description: e.target[1].value,
      image: e.target[2].value,
      price: e.target[3].value,
      colors: colorsArray,
      sizes: sizesArray,
      tags: tagsArray,
    };
    const res = await axios.post("/api/addProduct", productData);

    navigate(`/products/${res.data.product.productId}`);
  };

  return (
    <Container>
      <Form className="add-product-form" onSubmit={(e) => handleSubmit(e)}>
        <Row className="add-title-row">
          <Form.Label>Title</Form.Label>
          <Form.Control required />
        </Row>
        <Row className="add-description-row">
          <Form.Label>Description</Form.Label>
          <Form.Control required />
        </Row>
        <Row className="add-image-row">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="url" required />
        </Row>
        <Row className="add-price-row">
          <Form.Label>Price</Form.Label>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control type="number" step="0.01" required />
          </InputGroup>
        </Row>
        <Row className="add-sizes-row">
          <Form.Label>Sizes</Form.Label>
          <Form.Check
            type="checkbox"
            label="XS"
            className="size-checkbox"
            disabled={sizesState.OS}
            onChange={() =>
              setSizesState({ ...sizesState, XS: !sizesState.XS })
            }
            checked={sizesState.XS && !sizesState.OS}
          />
          <Form.Check
            type="checkbox"
            label="S"
            className="size-checkbox"
            disabled={sizesState.OS}
            onChange={() => setSizesState({ ...sizesState, S: !sizesState.S })}
            checked={sizesState.S && !sizesState.OS}
          />
          <Form.Check
            type="checkbox"
            label="M"
            className="size-checkbox"
            disabled={sizesState.OS}
            onChange={() => setSizesState({ ...sizesState, M: !sizesState.M })}
            checked={sizesState.M && !sizesState.OS}
          />
          <Form.Check
            type="checkbox"
            label="L"
            className="size-checkbox"
            disabled={sizesState.OS}
            onChange={() => setSizesState({ ...sizesState, L: !sizesState.L })}
            checked={sizesState.L && !sizesState.OS}
          />
          <Form.Check
            type="checkbox"
            label="XL"
            className="size-checkbox"
            disabled={sizesState.OS}
            onChange={() =>
              setSizesState({ ...sizesState, XL: !sizesState.XL })
            }
            checked={sizesState.XL && !sizesState.OS}
          />
          <Form.Check
            type="checkbox"
            label="One Size"
            className="size-checkbox"
            onChange={() =>
              setSizesState({ ...sizesState, OS: !sizesState.OS })
            }
            checked={sizesState.OS}
          />
        </Row>
        <Row className="add-tags-row">
          <Form.Label>Tags</Form.Label>
          <Form.Check
            type="checkbox"
            label="Women"
            className="tag-checkbox"
            name="women"
          />
          <Form.Check
            type="checkbox"
            label="Men"
            className="tag-checkbox"
            name="men"
          />
          <Form.Check
            type="checkbox"
            label="Shoes"
            className="tag-checkbox"
            name="shoes"
          />
          <Form.Check
            type="checkbox"
            label="Accessories"
            className="tag-checkbox"
            name="accessories"
          />
          <Form.Check
            type="checkbox"
            label="Sale"
            className="tag-checkbox"
            name="sale"
          />
          <Form.Check
            type="checkbox"
            label="New"
            className="tag-checkbox"
            name="new"
          />
        </Row>
        <Row className="add-colors-row">
          <Form.Label>Available colors</Form.Label>
          {colorInputs}
          <button
            className="add-color"
            type="button"
            onClick={() =>
              setColorCount((prevState) => [
                ...prevState,
                prevState[prevState.length - 1] + 1,
              ])
            }
          >
            +
          </button>
          <button
            className="remove-color"
            type="button"
            onClick={() => setColorCount((prevState) => prevState.slice(0, -1))}
          >
            -
          </button>
        </Row>
        <Button size="lg" className="create-item-btn" type="submit">
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
