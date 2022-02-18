import Router from "express";
const router = Router();
import {
  createCart,
  deleteCart,
  getProductsCart,
  addProductToCart,
  deleteProductByCart,
} from "../controller/cart.controller";

router.post("/", createCart);
router.delete("/:id", deleteCart);
router.get("/:id/products", getProductsCart);
router.put("/:id/products", addProductToCart);
router.delete("/:id/products/:id_prod", deleteProductByCart);

export default router;
