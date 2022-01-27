const { Router } = require("express");
const router = Router();
const {
  getById,
  getAll,
  postProduct,
  putProduct,
  deleteProduct,
} = require("../controller/products.controller");

router.get("", getAll);
router.get("/:id", getById);
router.post("/", postProduct);
router.put("/:id", putProduct);
router.delete("/:id", deleteProduct);

module.exports.routes = router;
