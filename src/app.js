const express = require("express");
const app = express();
require("dotenv").config({ path: "../.env" });
const PORT = process.env.PORT;
const routerProducts = require("./router/products.routes");
const routerCart = require("./router/cart.routes");

const server = app.listen(PORT, () => {
  console.log(`Server on port ${server.address().port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", routerProducts.routes);
app.use("/api", routerCart.cartRoutes);

server.on("error", (error) => {
  console.log(`Server error ${error}`);
});
