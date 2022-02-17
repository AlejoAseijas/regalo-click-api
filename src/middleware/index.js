const express = require("express");
const app = express();
const { auth, cart, products } = require("../router/index.routes");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/products", products.route);
app.use("/api/cart", cart.route);
app.use("/api/auth", auth.route);

app.use((req, res) => {
  res.status(404).json({
    error: -2,
    description: `route ${req.url} & method ${req.method} not implemented`,
  });
});

module.exports = app;
