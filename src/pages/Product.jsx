import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useLoaderData } from 'react-router-dom'
import "../css/Product.css"

const Product = () => {
    const {product} = useLoaderData()

    const {title, description, image, price, productId} = product
  return (
    <Container>
        <Row>
            <Col>
                <img src={image} alt={`image of ${title}`} className='product-image'/>
            </Col>
            <Col className='product-details'>
                <h5 className='product-title'>{title}</h5>
                <h4 className='product-price'>${price}</h4>
                <p className='product-description'>{description}</p>
            </Col>
        </Row>
    </Container>
  )
}

export default Product
