const { Router } = require("express");
const router = Router();
const {
  createCart,
  deleteCart,
  getProductsCart,
  addProductToCart,
  deleteProductByCart,
} = require("../controller/cart.controller");

router.post("/cart", createCart);
router.delete("/cart/:id", deleteCart);
router.get("/cart/:id", getProductsCart);
router.put("/cart/:id/products", addProductToCart);
router.delete("/cart/:id/products/:id_prod", deleteProductByCart);
module.exports.cartRoutes = router;
