import React from 'react'

const ProductCard = ({title, description, image}) => {
  return (
    <div className='productCard'>
      <img src={image} alt={`image of ${title}`} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

export default ProductCard
