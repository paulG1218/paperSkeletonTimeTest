import React, {useState, useEffect} from "react";
import NavigationBar from "./components/NavigationBar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import MoblieNavigationBar from "./components/MoblieNavigationBar.jsx";

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
    <div>
      {windowDimension < 768 ? 
      <MoblieNavigationBar/>
      :
      <NavigationBar />
      }
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
