import { DataTypes, Model } from "sequelize";
import util from "util";
import connectToDB from "./db.js";

export const db = await connectToDB("postgresql:///skeleton_db");

export class User extends Model {
    [util.inspect.custom]() {
      return this.toJSON();
    }
  }
  
  User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      modelName: "user",
      sequelize: db,
    }
  );

  export class Product extends Model {
    [util.inspect.custom]() {
      return this.toJSON();
    }
  }
  
  Product.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING
      }
    },
    {
      modelName: "product",
      sequelize: db,
    }
  );