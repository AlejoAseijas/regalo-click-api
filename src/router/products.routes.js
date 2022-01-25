const { Router } = require("express");
const router = Router();
const {
  getById,
  getAll,
  postProduct,
  putProduct,
  deleteProduct,
} = require("../controller/products.controller");

router.get("/products", getAll);
router.get("/products/:id", getById);
router.post("/products", postProduct);
router.put("/products/:id", putProduct);
router.delete("/products/:id", deleteProduct);

module.exports.routes = router;
