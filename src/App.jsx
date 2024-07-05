import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Root from "./Root.jsx";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import "./css/App.css";
import axios from "axios";
import Login from "./pages/Login.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route
        index
        element={<Home />}
        loader={async () => {
          const products = await axios.get("/api/products");
          return { products: products.data };
        }}
      />
      <Route 
        path= "/products/:productId"
        element={<Product/>}
        loader={async ({ params }) => {
          const res = await axios.get(`/api/products/${params.productId}`);
          return { product: res.data };
        }}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
