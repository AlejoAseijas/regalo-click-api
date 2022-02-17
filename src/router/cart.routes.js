const { Router } = require("express");
const router = Router();
const {
  createCart,
  deleteCart,
  getProductsCart,
  addProductToCart,
  deleteProductByCart,
} = require("../controller/cart.controller");

router.post("/", createCart);
router.delete("/:id", deleteCart);
router.get("/:id/products", getProductsCart);
router.put("/:id/products", addProductToCart);
router.delete("/:id/products/:id_prod", deleteProductByCart);

module.exports.route = router;
