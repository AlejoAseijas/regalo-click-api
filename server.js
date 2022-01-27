const express = require("express");
const app = express();
require("dotenv").config({ path: "./.env" });
const PORT = process.env.PORT;
const routerProducts = require("./src/router/products.routes");
const routerCart = require("./src/router/cart.routes");
const routerAuth = require("./src/router/auth.routes");

const server = app.listen(PORT, () => {
  console.log(`Server on port ${server.address().port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/products", routerProducts.routes);
app.use("/api/cart", routerCart.cartRoutes);
app.use("/api/auth", routerAuth.authRouter);

app.use((req, res) => {
  res.status(404).json({
    error: -2,
    description: `route ${req.url} & method ${req.method} not implemented`,
  });
});

server.on("error", (error) => {
  console.log(`Server error ${error}`);
});
