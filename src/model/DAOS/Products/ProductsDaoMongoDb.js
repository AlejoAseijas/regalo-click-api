import MongoDbContainer from "../../containers/MongoDbContainer";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const collection = "products";

const ProductSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  name: { type: String, require: true },
  description: { type: String, require: true },
  code: { type: String, require: true, unique: true },
  thumbnail: { type: String, require: true, unique: true },
  price: { type: Number, require: true },
  stock: { type: Number, require: true },
});

class ProductsDaoMongoDb extends MongoDbContainer {
  constructor() {
    super(collection, ProductSchema);
  }
}

export default ProductsDaoMongoDb;
