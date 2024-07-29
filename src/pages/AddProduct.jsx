import React, { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, Row } from "react-bootstrap";
import "../css/AddProduct.css";
import axios from "axios";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import productOptions from "../productOptions.json"

const AddProduct = () => {
  const {isAdmin} = useLoaderData()

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const isEditing = searchParams.get('productId');

  const [editingProduct, setEditingProduct] = useState()
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
  const [genderState, setGenderState] = useState('')
  const [categoryState, setCategoryState] = useState('')
  const [subCategoryState, setSubCategoryState] = useState('')
  const [tagState, setTagState] = useState('')

  useEffect(() => {
    if (!isAdmin) {
        navigate("/")
    }
    if (isEditing) {
        handleEditMode()
    }
  }, [])

  useEffect(() => {
    setColorInputs(
      colorCount.map((colorId) => {
        return (
          <Form.Control key={colorId} type="color" className="color-select"/>
        );
      })
    );
  }, [colorCount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const colorsArray = colorCount.map((x) => {
      return e.target[x + 9].value;
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
    const productData = {
      title: e.target[0].value,
      description: e.target[1].value,
      image: e.target[2].value,
      price: e.target[3].value,
      colors: colorsArray,
      sizes: sizesArray,
      tags: tagsArray,
    };
    if (isEditing) {
        const res = await axios.put(`/api/editProduct/${editingProduct.productId}`, productData)
        navigate(`/products/${res.data.product.productId}`);
    } else {
        const res = await axios.post("/api/addProduct", productData);
        navigate(`/products/${res.data.product.productId}`);
    }

  };

  const handleEditMode = async () => {
    const res = await axios.get(`/api/products/${isEditing}`)
    const {colors, sizes, gender, category, subcategory, tag} = res.data
    setEditingProduct(res.data)
    console.log(colors.length)
    const newColorCount = []
    for (let i = 0; i < colors.length; i++) {
        newColorCount.push(i + 1)
    }
    setColorCount(newColorCount)
    setColorInputs(
        newColorCount.map((colorId) => {
          return (
            <Form.Control key={colorId} type="color" className="color-select" defaultValue={colors[colorId - 1]}/>
          );
        })
      );
      if (sizes[0] === "one size") {
        setSizesState({...sizesState, OS: true})
      } else {
          for (let i = 0; i < sizes.length; i++) {
            setSizesState((prevState) => {
                return {...prevState,
                [sizes[i].toUpperCase()]: true}
            })
          }
      }
      setGenderState(gender)
      setCategoryState(category)
      setSubCategoryState(subcategory)
      setTagState(tag)
  }

  const subCategoryChecks = () => {
    if (categoryState) {
        const subcategories = Object.keys(productOptions.categories[categoryState])
        return subcategories.map((sc) => {
            return (<Form.Check
                type="checkbox"
                label={sc.charAt(0).toUpperCase() + sc.slice(1)}
                className="add-product-checkbox"
                onChange={() => setSubCategoryState(subCategoryState === sc ? '' : sc)}
                checked={subCategoryState === sc}
              />)
        })
    } else {
        return "Please select a category first"
    }
  }

  const tagChecks = () => {
    if (subCategoryState) {
        const tags = productOptions.categories[categoryState][subCategoryState]
        if (tags.length) {
            return tags.map((tag) => {
                return <Form.Check
                    type="checkbox"
                    label={tag.charAt(0).toUpperCase() + tag.slice(1)}
                    className="add-product-checkbox"
                    onChange={() => setTagState(tagState === tag ? '' : tag)}
                    checked={tagState === tag}
                  />
            })
        } else {
            return "There are no tags for this subcategory"
        }
    } else {
        return "Please select a subcategory first"
    }
  }

  return (
    <Container>
      <Form className="add-product-form" onSubmit={(e) => handleSubmit(e)}>
        <Row className="add-title-row">
          <Form.Label>Title</Form.Label>
          <Form.Control required defaultValue={editingProduct ? editingProduct.title : ''}/>
        </Row>
        <Row className="add-description-row">
          <Form.Label>Description</Form.Label>
          <Form.Control required  defaultValue={editingProduct ? editingProduct.description : ''}/>
        </Row>
        <Row className="add-image-row">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="url" required  defaultValue={editingProduct ? editingProduct.image : ''}/>
        </Row>
        <Row className="add-price-row">
          <Form.Label>Price</Form.Label>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control type="number" step="0.01" required  defaultValue={editingProduct ? editingProduct.price : ''}/>
          </InputGroup>
        </Row>
        <Row className="checkbox-row">
          <Form.Label>Sizes</Form.Label>
          <Form.Check
            type="checkbox"
            label="XS"
            className="add-product-checkbox"
            disabled={sizesState.OS}
            onChange={() =>
              setSizesState({ ...sizesState, XS: !sizesState.XS })
            }
            checked={sizesState.XS && !sizesState.OS}
          />
          <Form.Check
            type="checkbox"
            label="S"
            className="add-product-checkbox"
            disabled={sizesState.OS}
            onChange={() => setSizesState({ ...sizesState, S: !sizesState.S })}
            checked={sizesState.S && !sizesState.OS}
          />
          <Form.Check
            type="checkbox"
            label="M"
            className="add-product-checkbox"
            disabled={sizesState.OS}
            onChange={() => setSizesState({ ...sizesState, M: !sizesState.M })}
            checked={sizesState.M && !sizesState.OS}
          />
          <Form.Check
            type="checkbox"
            label="L"
            className="add-product-checkbox"
            disabled={sizesState.OS}
            onChange={() => setSizesState({ ...sizesState, L: !sizesState.L })}
            checked={sizesState.L && !sizesState.OS}
          />
          <Form.Check
            type="checkbox"
            label="XL"
            className="add-product-checkbox"
            disabled={sizesState.OS}
            onChange={() =>
              setSizesState({ ...sizesState, XL: !sizesState.XL })
            }
            checked={sizesState.XL && !sizesState.OS}
          />
          <Form.Check
            type="checkbox"
            label="One Size"
            className="add-product-checkbox"
            onChange={() =>
              setSizesState({ ...sizesState, OS: !sizesState.OS })
            }
            checked={sizesState.OS}
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
        <Row className="checkbox-row">
          <Form.Label>Gender</Form.Label>
          <Form.Check
            type="checkbox"
            label="Men"
            className="add-product-checkbox"
            onChange={() => setGenderState(genderState === 'men' ? '' : 'men')}
            checked={genderState === 'men'}
          />
          <Form.Check
            type="checkbox"
            label="Women"
            className="add-product-checkbox"
            onChange={() => setGenderState(genderState === 'women' ? '' : 'women')}
            checked={genderState === 'women'}
          />
          <Form.Check
            type="checkbox"
            label="Unisex"
            className="add-product-checkbox"
            onChange={() => setGenderState(genderState === 'unisex' ? '' : 'unisex')}
            checked={genderState === 'unisex'}
          />
        </Row>
        <Row className="checkbox-row">
          <Form.Label>Category</Form.Label>
          <Form.Check
            type="checkbox"
            label="Clothing"
            className="add-product-checkbox"
            onChange={() => {
                setCategoryState(categoryState === 'clothing' ? '' : 'clothing')
                setSubCategoryState('')
            }}
            checked={categoryState === 'clothing'}
          />
          <Form.Check
            type="checkbox"
            label="Shoes"
            className="add-product-checkbox"
            onChange={() => {
                setCategoryState(categoryState === 'shoes' ? '' : 'shoes')
                setSubCategoryState('')
            }}
            checked={categoryState === 'shoes'}
          />
          <Form.Check
            type="checkbox"
            label="Accessories"
            className="add-product-checkbox"
            onChange={() => {
                setCategoryState(categoryState === 'accessories' ? '' : 'accessories')
                setSubCategoryState('')

            }}
            checked={categoryState === 'accessories'}
          />
        </Row>
        <Row className="checkbox-row">
          <Form.Label>Subcategory</Form.Label>
          {subCategoryChecks()}
        </Row>
        <Row className="checkbox-row">
          <Form.Label>Tags</Form.Label>
          {tagChecks()}
        </Row>
        <Button size="lg" className="create-item-btn" type="submit">
          {isEditing ? "Update" : "Create"}
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
