import Router from "express";
const router = Router();
import {
  getById,
  getAll,
  postProduct,
  putProduct,
  deleteProduct,
} from "../controller/products.controller";

router.get("", getAll);
router.get("/:id", getById);
router.post("/", postProduct);
router.put("/:id", putProduct);
router.delete("/:id", deleteProduct);

export default router;
