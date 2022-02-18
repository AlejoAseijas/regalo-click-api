import Persist from "../model/fs/fs.model";
const persist = new Persist("./carts.json");

const createCart = async (req, res) => {
  try {
    let newCart = {
      id: await persist.getLastId(),
      timestamp: Date(Date.now()),
      products: [req.body],
    };
    let idCart = await persist.save(newCart);
    res.status(201).json({
      status: true,
      data: `create cart successfully by id:${idCart}`,
      id: idCart,
    });
  } catch (err) {
    res.status(402).json({ err: "error to create cart" });
  }
};

const deleteCart = async (req, res) => {
  try {
    let data = await persist.delete(req.params.id);
    res
      .status(201)
      .json({ status: true, data: `cart by id ${data} eliminated`, id: data });
  } catch (err) {
    res.status(402).json({ err: "error to eliminated cart" });
  }
};

const getProductsCart = async (req, res) => {
  try {
    let data = await persist.open();
    let cartId = data.filter((cart) => cart.id === parseInt(req.params.id));
    res.status(201).json({ status: true, data: cartId[0].products });
  } catch (err) {
    res.status(404).json({
      err: `error to get products by cart or not exist cart by id ${req.params.id}`,
    });
  }
};

const addProductToCart = async (req, res) => {
  try {
    let existData = await persist.open();
    let index = existData.findIndex(
      (data) => data.id === parseInt(req.params.id)
    );

    existData[index].products.push(req.body);

    await persist.modify(existData);
    res.status(201).json({
      status: true,
      data: `products add to cart by id ${req.params.id}`,
      id: req.params.id,
    });
  } catch (err) {
    res.status(402).json({
      err: `error to add products at cart or not exist cart by id ${req.params.id}`,
    });
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
      status: true,
      data: `eliminated product by id ${req.params.id_prod} by cart id ${req.params.id}`,
      id: req.params.id,
    });
  } catch (err) {
    res
      .status(402)
      .json({ err: `error to eliminate product id:${req.params.id} by cart` });
  }
};

export {
  createCart,
  deleteCart,
  getProductsCart,
  addProductToCart,
  deleteProductByCart,
};
