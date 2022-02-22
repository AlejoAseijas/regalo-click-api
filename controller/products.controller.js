import { productsDao } from "../model/DAOS/index.js";

const postProduct = async (req, res) => {
  try {
    let productToSave = req.body;
    productToSave.timestamp = Date.now();
    let saveState = await productsDao.save(productToSave);
    res.status(202).json({ status: true });
  } catch (err) {
    res.status(402).json({ err: "producto no valido" });
  }
};

const getAll = async (req, res) => {
  try {
    let products = await productsDao.getAll();
    res.status(202).json({ success: true, data: products });
  } catch (err) {
    res.status(402).json({ error: err });
  }
};

const getById = async (req, res) => {
  try {
    let product = await productsDao.getById(req.params.id);
    res.status(202).json({ success: true, data: product });
  } catch (err) {
    res.status(401).json({ err: `error to get product` });
  }
};

const putProduct = async (req, res) => {
  try {
    await productsDao.updateById(req.params.id, req.body);
    res.status(202).json({ success: true });
  } catch (err) {
    res.status(401).json({ err: "producto not modify" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await productsDao.deleteById(req.params.id);
    res.status(202).json({ success: true });
  } catch (err) {
    res.status(401).json({ err: "product eliminated" });
  }
};

export { getAll, getById, postProduct, putProduct, deleteProduct };
