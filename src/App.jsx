import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Root from "./Root.jsx";
import Home from "./pages/Home.jsx";
import './css/App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home/>}/>
    </Route>
    )
  );

function App() {
  return <RouterProvider router={router} />;
}

export default App
