import MongoDbContainer from "../../containers/MongoDbContainer.js";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const collection = "products";

const ProductSchema = new Schema(
  {
    timestamp: { type: Number, require: true },
    name: { type: String, require: true },
    description: { type: String, require: true },
    code: { type: String, require: true, unique: true },
    thumbnail: { type: String, require: true, unique: true },
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
  },
  { versionKey: false }
);

class ProductsDaoMongoDb extends MongoDbContainer {
  constructor() {
    super("Products", ProductSchema, collection);
  }
}

export default ProductsDaoMongoDb;
