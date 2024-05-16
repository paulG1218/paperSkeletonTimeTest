import React from 'react'
import { Card } from 'react-bootstrap'
import "../css/ProductCard.css"

const ProductCard = ({title, description, image, price}) => {
  return (
    <Card className='productCard' style={{width: '20rem'}}>
      <Card.Img src={image} alt={`image of ${title}`} className='productImg'/>
      <Card.Body>
        <Card.Title><h4>{title}</h4></Card.Title>
        <Card.Text>${price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
