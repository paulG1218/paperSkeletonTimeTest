import express from "express";
import session from "express-session";
import ViteExpress from "vite-express";
import { Product, User } from "../db/model.js";
import morgan from "morgan";
import handlers from "./handlers.js";

const app = express();
const port = "8002";
ViteExpress.config({ printViteDevServerHost: true });

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({ secret: "ssshhhhh", saveUninitialized: true, resave: false })
);

app.post("/api/login", handlers.login);

app.post("/api/register", handlers.register);

app.get("/api/sessionCheck", handlers.sessionCheck);

app.post("/api/addProduct", handlers.AddProduct);

app.post("/api/cart", handlers.addCart);

app.get("/api/cart", handlers.getCart);

app.put("/api/editCart", handlers.editCart);

app.get("/api/products", async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

app.get("/api/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findByPk(productId);
  res.json(product);
});

app.get("/api/adminCheck", handlers.adminCheck)

app.get("/api/:category", handlers.getProducts);

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);
