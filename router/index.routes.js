import express from "express";
// import routerAuth from "./auth.routes";
import routerCart from "./cart/cart.routes.js";
import routerProducts from "./products/products.routes.js";
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use("/api/products", routerProducts);
router.use("/api/cart", routerCart);
router.use("*", (req, res) => {
  res.status(404).json({
    error: -2,
    description: `route ${req.url} & method ${req.method} not implemented`,
  });
});

export default router;
