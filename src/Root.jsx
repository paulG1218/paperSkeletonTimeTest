import React from 'react'
import NavigationBar from './components/NavigationBar.jsx';
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
        <NavigationBar/>
    <Outlet />
  </div>
  )
}

export default Root
