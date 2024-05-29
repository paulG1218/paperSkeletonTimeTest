import React from 'react'
import NavigationBar from './components/NavigationBar.jsx';
import { Outlet } from "react-router-dom";
import Footer from './components/Footer.jsx';

const Root = () => {
  return (
    <div>
      <NavigationBar/>
      <Outlet/>
      <Footer/>
  </div>
  )
}

export default Root
