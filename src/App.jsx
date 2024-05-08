import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Root from "./Root.jsx";
import Home from "./pages/Home.jsx";
import "./css/App.css";
import axios from "axios";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} loader={async () => {
        const products = await axios.get("/api/products")
        return {products: products.data}
      }}/>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
