import { User, Product, db } from "../db/model.js";
import userData from "./data/users.json" with { type: "json" };
import productData from "./data/products.json" with { type: "json" };

console.log("Syncing database...");
await db.sync({ force: true });

console.log("Seeding database...");

console.log("Creating users...");
const usersInDB = await Promise.all(
  userData.map((user) => {
    const { email, password, isAdmin } = user;
    const newUser = User.create({
      email: email,
      password: password,
      isAdmin: isAdmin,
    });
    return newUser;
  })
);

console.log("Creating products...");
const productsInDB = await Promise.all(
  productData.map((product) => {
    const { title, description, image, price, colors, sizes, gender, category, subcategory, tag } = product;
    const newProduct = Product.create({
      title: title,
      description: description,
      image: image,
      price: price,
      colors: colors,
      sizes: sizes,
      gender: gender,
      category: category,
      subcategory: subcategory,
      tag: tag,
    });
    return newProduct;
  })
);

await db.close();
console.log("Finished seeding database!");
