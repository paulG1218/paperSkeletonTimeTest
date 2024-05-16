import { useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import { useLoaderData } from "react-router-dom";
import { Row } from 'react-bootstrap';
import axios from 'axios'

const Home = () => {

    const {products} = useLoaderData()

    const productCards = products.map((product) => {
        return <ProductCard key={product.productId} title={product.title} description={product.description} image={product.image} price={product.price}/>
    })

  
    return (
      <>
        <Row md={3}>
            {productCards}
        </Row>
      </>
    )
}

export default Home
