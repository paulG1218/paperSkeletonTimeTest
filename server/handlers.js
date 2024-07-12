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
                userId: user.userId,
              });
        } else {
            res.json({
                message: "Login failed",
                userId: null,
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
                userId: null
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
                userId: newUser.userId
            })
            return
        }
      },

      sessionCheck: async (req, res) => {
        if (req.session.user) {
          console.log(req.session.user.userId);
          res.json({
            userId: req.session.user.userId,
            isAdmin: req.session.user.isAdmin,
            email: req.session.user.email,
          });
        } else {
          res.json("no user logged in");
        }
      }
}

export default handlers