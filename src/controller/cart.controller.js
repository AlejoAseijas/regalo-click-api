const res = require("express/lib/response");
const Persist = require("../model/fs/fs.model");
const persist = new Persist("../carts.json");

const createCart = async (req, res) => {
  try {
    let newCart = {
      id: await persist.getLastId(),
      timestamp: Date(Date.now()),
      products: req.body,
    };
    let data = await persist.save(newCart);
    res.status(201).json(data);
  } catch (err) {
    res.status(402).json({ err: "error" });
  }
};

const deleteCart = async (req, res) => {
  try {
    let data = await persist.delete(req.params.id);
    res.status(201).json({ data: `cart by id ${data} eliminated` });
  } catch (err) {
    res.status(402).json({ err: "error" });
  }
};

const getProductsCart = async (req, res) => {
  try {
    let data = await persist.open();
    let cartId = data.filter((cart) => cart.id === parseInt(req.params.id));
    res.status(201).json({ products: cartId[0].products });
  } catch (err) {
    res.status(402).json({ err: "error" });
  }
};

const addProductToCart = async (req, res) => {
  try {
    let data = await persist.open();
    let cartId = data.filter((cart) => cart.id === parseInt(req.params.id));
    let newProducts = cartId[0].products;
    req.body.map((data) => {
      return newProducts.push(data);
    });
    cartId.products = newProducts;
    await persist.modify(cartId);
    res
      .status(201)
      .json({ data: `products add to cart by id ${req.params.id}` });
  } catch (err) {
    res.status(402).json({ err: "error" });
  }
};

const deleteProductByCart = async (req, res) => {
  try {
    let data = await persist.open();
    let cartId = data.filter((cart) => cart.id === parseInt(req.params.id));
    let newProducts = cartId[0].products.filter(
      (prod) => prod.id != parseInt(req.params.id_prod)
    );
    cartId[0].products = newProducts;
    await persist.modify(cartId);
    res.status(201).json({
      data: `eliminated product by id ${req.params.id_prod} by cart id ${req.params.id}`,
    });
  } catch (err) {
    res.status(402).json({ err: "error" });
  }
};

module.exports = {
  createCart,
  deleteCart,
  getProductsCart,
  addProductToCart,
  deleteProductByCart,
};
