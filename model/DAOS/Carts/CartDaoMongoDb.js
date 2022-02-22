import MongoDbContainer from "../../containers/MongoDbContainer.js";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const collection = "carts";

const CartSchema = new Schema(
  {
    timestamp: { type: Number, require: true },
    products: { type: Array, require: true },
  },
  {
    versionKey: false,
  }
);

class CartDaoMongoDb extends MongoDbContainer {
  constructor() {
    super("Carts", CartSchema, collection);
  }
}

export default CartDaoMongoDb;
