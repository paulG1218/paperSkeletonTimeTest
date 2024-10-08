import React, {useState, useEffect} from "react";
import NavigationBar from "./components/NavigationBar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import MoblieNavigationBar from "./components/MobileNavigationBar.jsx";
import DisplayModeSwitch from "./components/DisplayModeSwitch.jsx";

const Root = () => {
  const [windowDimension, setWindowDimension] = useState(null);

  useEffect(() => {
    setWindowDimension(window.innerWidth);

    const handleResize = () => {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <>
      <DisplayModeSwitch/>
      {windowDimension < 768 ? 
      <MoblieNavigationBar/>
      :
      <NavigationBar />
      }
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
