import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [isLoggedIn, setIsLoggedIn]=  useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    await axios.post("/api/login", {username: event.target.username.value, password: event.target.password.value}).then((res) => {
      console.log(res.data.user)
    })
  }

  return (
    <>
    {isLoggedIn ? 
      <>
      <h1>Logged</h1>
      </>
      :
      <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label for="username">Username: </label>
      <input name='username'></input>
      <br/>
      <label for="password">Password: </label>
      <input name='password' type='password'></input>
      <br/>
      <button>Submit</button>
      </form>
    
    }
    </>
  )
}

export default App
