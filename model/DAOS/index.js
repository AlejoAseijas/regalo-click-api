let productsDao;
let cartsDao;
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

switch (process.env.DATA_SOURCE) {
  case "mongodb":
    const { default: ProductsDaoMongoDb } = await import(
      "./Products/ProductsDaoMongoDb.js"
    );
    const { default: CartDaoMongoDb } = await import(
      "./Carts/CartDaoMongoDb.js"
    );
    productsDao = new ProductsDaoMongoDb();
    cartsDao = new CartDaoMongoDb();
    break;
  case "firebase":
    const { default: ProductsDaoFirebase } = await import(
      "./Products/ProductsDaoFirebase.js"
    );
    const { default: CartDaoFirebase } = await import(
      "./Carts/CartDaoFirebase.js"
    );
    productsDao = new ProductsDaoFirebase();
    cartsDao = new CartDaoFirebase();
    break;
  default:
}

export { productsDao, cartsDao };
