import { Router } from "express";
import {
  createCart,
  deleteCart,
  getProductsCart,
  addProductToCart,
  deleteProductByCart,
} from "../../controller/cart.controller.js";

const routerCart = Router();

routerCart.post("/", createCart);
routerCart.delete("/:id", deleteCart);
routerCart.get("/:id/products", getProductsCart);
routerCart.post("/:id/products", addProductToCart);
routerCart.delete("/:id/products/:id_prod", deleteProductByCart);

export default routerCart;
