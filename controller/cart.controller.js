import { cartsDao, productsDao } from "../model/DAOS/index.js";

const createCart = async (req, res) => {
  try {
    let product = await productsDao.getById(req.body.id);
    await cartsDao.save({ timestamp: Date.now(), products: [product] });
    res.status(202).json({ success: true });
  } catch (err) {
    res.status(402).json({ err: "error to create cart" });
  }
};

const deleteCart = async (req, res) => {
  try {
    await cartsDao.deleteById(req.params.id);
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(402).json({ err: "error to eliminated cart" });
  }
};

const getProductsCart = async (req, res) => {
  try {
    let response = await cartsDao.getById(req.params.id);
    res.status(202).json({ success: true, data: response.products });
  } catch (err) {
    res.status(404).json({
      err: `error to get products by cart or not exist cart by id ${req.params.id}`,
    });
  }
};

const addProductToCart = async (req, res) => {
  try {
    let newProd = await productsDao.getById(req.body.id);
    await cartsDao.addSubDocToDocumentId(req.params.id, newProd);
    res.status(202).json({ success: true });
  } catch (err) {
    res.status(402).json({
      err: `error to add products at cart or not exist cart by id ${req.params.id}`,
    });
  }
};

const deleteProductByCart = async (req, res) => {
  try {
    await cartsDao.eliminateSubDocIdByDocumentId(
      req.params.id,
      req.params.id_prod
    );
    res.status(202).json({ success: true });
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
