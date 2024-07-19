import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  useSearchParams
} from "react-router-dom";
import Root from "./Root.jsx";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import "./css/App.css";
import axios from "axios";
import AllProudcts from "./pages/AllProudcts.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import Cart from "./pages/Cart.jsx";
import AdminDash from "./pages/AdminDash.jsx";

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
      <Route path="/:category"
        element={<AllProudcts/>}
        loader={async ({params}) => {
          const res = await axios.get(`/api/${params.category}`, {sort: "", page: 1, itemsPerPage: 2})
          return { category: params.category, initialProducts: res.data.products, productCount: res.data.count.count }
        }}
        />
        <Route path="/addProduct"
          element={<AddProduct/>}
        />
        <Route path="/cart"
          element={<Cart/>}
          loader={async () => {
            const res = await axios.get("/api/cart")
            return {cart: res.data}
          }}
        />
        <Route 
          path="/adminDash"
          element={<AdminDash/>}
          loader={async () => {
            const adminCheck = await axios.get("/api/adminCheck")
            const products = await axios.get("/api/products")
            return {isAdmin: adminCheck.data, products: products.data}
          }}
        />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
