import { useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import axios from 'axios'

const Home = () => {
  
    const [userState, setUserState]=  useState({})
    const [productMap, setProductMap] = useState([])
  
    const handleSubmit = async (event) => {
      event.preventDefault()
  
      await axios.post("/api/login", {username: event.target.username.value, password: event.target.password.value}).then(async (res) => {
        console.log(res.data.user)
        if (res.data.user) {
          setUserState(res.data.user)
          const products = await axios.get("/api/products").then((res) => {
            return res.data.products
          })
          console.log(products)
          setProductMap(products.map((product) => {
            console.log(product)
            return <ProductCard key={product.productId} title={product.title} description={product.description} image={product.image}/>
          }))
        }
      })
    }
  
    return (
      <>
      {userState.userId ? 
        <>
        <h1>Logged</h1>
        {productMap}
        </>
        :
        <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="username">Username: </label>
        <input name='username'></input>
        <br/>
        <label htmlFor="password">Password: </label>
        <input name='password' type='password'></input>
        <br/>
        <button>Submit</button>
        </form>
      
      }
      </>
    )
}

export default Home
