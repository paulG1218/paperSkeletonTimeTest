import { Product, User } from "../db/model.js";
import { Op } from "sequelize";

const handlers = {
  login: async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await User.findOne({
      where: {
        email: email,
        password: password,
      },
    });

    console.log(user);

    if (user) {
      req.session.user = user;
      res.json({
        message: "success",
        user: {
          userId: user.userId,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
    } else {
      res.json({
        message: "Login failed",
        user: null,
      });
    }
  },

  register: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      res.json({
        message: "email in use",
        user: null,
      });
      return;
    } else {
      const newUser = await User.create({
        email: email,
        password: password,
      });

      req.session.user = newUser;

      res.json({
        message: "success",
        user: {
          userId: newUser.userId,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
        },
      });
      return;
    }
  },

  sessionCheck: async (req, res) => {
    if (req.session.user) {
      console.log(req.session.user.userId);
      res.json({
        message: "",
        user: {
          userId: req.session.user.userId,
          email: req.session.user.email,
          isAdmin: req.session.user.isAdmin,
        },
      });
    } else {
      res.json("no user logged in");
    }
  },

  getProducts: async (req, res) => {
    const { category } = req.params;
    const { sort, page = 1, itemsPerPage = 2 } = req.query;
    const determineOrder = () => {
      switch (sort) {
        case "price: high-low":
          return [["price", "DESC"]];
        case "price: low-high":
          return [["price", "ASC"]];
        case "featured":
          return [["productId", "DESC"]];
        default:
          return [];
      }
    };

    const order = determineOrder();

    const products = await Product.findAll({
      where: {
        tags: { [Op.contains]: [category] },
      },
      order: order,
      offset: page * itemsPerPage,
      limit: itemsPerPage,
    });
    const count = await Product.findAndCountAll({
      where: {
        tags: { [Op.contains]: [category] },
      },
    });
    res.json({
      products: products,
      count: count,
    });
  },

  AddProduct: async (req, res) => {
    const { title, description, image, price, colors, sizes, tags } = req.body;

    const product = await Product.findOne({
      where: {
        title: title,
      },
    });

    console.log(product);

    if (product) {
      res.json({
        mesasage: "title taken",
      });
    } else {
      const newProduct = await Product.create({
        title: title,
        description: description,
        image: image,
        price: price,
        colors: colors,
        sizes: sizes,
        tags: tags,
      });
      res.json({
        message: "product created",
        product: newProduct,
      });
    }
  },

  addCart: async (req, res) => {
    if (req.session.cart) {
      req.session.cart.push(req.body);
      res.json(req.session.cart);
    } else {
      req.session.cart = [req.body];
      res.json(req.session.cart);
    }
  },

  getCart: async (req, res) => {
    if (!req.session.cart) {
      req.session.cart = [];
    }
    res.json(req.session.cart);
  },

  editCart: async (req, res) => {
    const { quantity, cartPos } = req.body;
    const product = req.session.cart[cartPos];
    if (product && quantity > 0) {
      product.quantity = quantity;
    } else {
      req.session.cart = req.session.cart.filter((item, i) => {
        return i !== cartPos;
      });
    }
    res.json(req.session.cart);
  },
};

export default handlers;
