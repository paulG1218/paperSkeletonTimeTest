import { useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import { useLoaderData } from "react-router-dom";
import { Row } from 'react-bootstrap';
import axios from 'axios'

const Home = () => {

    const {products} = useLoaderData()
  
    const [userState, setUserState]=  useState({})

    const productCards = products.map((product) => {
        return <ProductCard key={product.productId} title={product.title} description={product.description} image={product.image}/>
    })
  
    const handleSubmit = async (event) => {
      event.preventDefault()
  
      await axios.post("/api/login", {username: event.target.username.value, password: event.target.password.value}).then(async (res) => {
        console.log(res.data.user)
        if (res.data.user) {
          setUserState(res.data.user)
        }
      })
    }
  
    return (
      <>
        <h1>Logged</h1>
        <Row md={3}>
            {productCards}
        </Row>
      </>
    )
}

export default Home
