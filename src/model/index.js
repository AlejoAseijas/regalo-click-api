let productsDao;
let cartsDao;

switch (process.env.DATA_SOURCE) {
  case "mongodb":
    const { default: ProductsDaoMongoDb } = await from(
      "./DAOS/Products/ProductsDaoMongoDb"
    );
    const { default: CartsDaoMongoDb } = await from(
      "./DAOS/Carts/CartDaoMongoDb"
    );
    cartsDao = await new CartsDaoMongoDb();
    productsDao = await new ProductsDaoMongoDb();
    break;
  case "firebase":
    break;
  default:
}

module.exports = { productsDao, cartsDao };
