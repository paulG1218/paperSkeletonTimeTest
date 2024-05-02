import express from "express";
import ViteExpress from "vite-express";
import { User } from "../db/model.js";
import morgan from "morgan";

const app = express();
const port = "8002";
ViteExpress.config({ printViteDevServerHost: true });

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/api/login", async (req, res) => {
    const {username, password} = req.body
    console.log(username, password)

    const user = await User.findOne({
        where: {
          username: username,
          password: password
        }
      });

      console.log(user)

      if (user) {
        res.json({user: user})
      } else {
        res.json({user: null})
      }
})

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);
