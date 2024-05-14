import React from 'react'
import { Card } from 'react-bootstrap'
import "../css/ProductCard.css"

const ProductCard = ({title, description, image}) => {
  return (
    <Card className='productCard' style={{width: '20rem'}}>
      <Card.Img src={image} alt={`image of ${title}`} className='productImg'/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
