import MongoDbContainer from "../../containers/MongoDbContainer";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const collection = "carts";

const CartSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  products: { type: Array, require: true },
});

class CartDaoMongoDb extends MongoDbContainer {
  constructor() {
    super(collection, CartSchema);
  }
  save() {
    console.log("hola");
  }
}

export default CartDaoMongoDb;
