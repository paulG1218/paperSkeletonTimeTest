import { Product, User } from "../db/model.js";

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
                    isAdmin: user.isAdmin
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
        const {email, password} = req.body

        const user = await User.findOne({
            where: {
                email: email
            }
        })

        if (user) {
            res.json({
                message: "email in use",
                user: null
            })
            return
        } else {
            const newUser = await User.create({
                email: email,
                password: password,

            })

            req.session.user = newUser

            res.json({
                message: "success",
                user: {
                    userId: newUser.userId,
                    email: newUser.email,
                    isAdmin: newUser.isAdmin
                }
            })
            return
        }
      },

      sessionCheck: async (req, res) => {
        if (req.session.user) {
          console.log(req.session.user.userId);
          res.json({
            message: "",
            user: {userId: req.session.user.userId,
                email: req.session.user.email,
                isAdmin: req.session.user.isAdmin
            }
            
          });
        } else {
          res.json("no user logged in");
        }
      },

      AddProduct: async (req, res) => {
        const {title, description, image, price, colors, sizes, tags} = req.body

        const product = await Product.findOne({
            where: {
                title: title
            }
        })

        console.log(product)

        if (product) {
            res.json({
                mesasage: "title taken"
            })
        } else {
            const newProduct = await Product.create({
                title: title,
                description: description,
                image: image,
                price: price,
                colors: colors,
                sizes: sizes,
                tags: tags
            })
            res.json({
                message: "product created",
                product: newProduct
            })
        }
      }
}

export default handlers