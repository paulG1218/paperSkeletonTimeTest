import React from 'react'

const Login = () => {
  return (
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
  )
}

export default Login
