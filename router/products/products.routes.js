import { Router } from "express";
import {
  getById,
  getAll,
  postProduct,
  putProduct,
  deleteProduct,
} from "../../controller/products.controller.js";

const routerProducts = Router();

routerProducts.get("/", getAll);
routerProducts.get("/:id", getById);
routerProducts.post("/", postProduct);
routerProducts.post("/:id", putProduct);
routerProducts.delete("/:id", deleteProduct);

export default routerProducts;
