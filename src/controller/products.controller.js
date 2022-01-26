const Persist = require("../model/fs/fs.model");
const persist = new Persist("./data.json");

const getAll = async (req, res) => {
  try {
    let product = await persist.open();
    if (product.length > 0) {
      res.status(201).json({ status: true, data: product });
    } else if (product.length === 0) {
      res.status(404).json({
        err: `not products to view`,
      });
    }
  } catch (err) {
    res.status(401).json({ err: "producto no validos" });
  }
};

const getById = async (req, res) => {
  try {
    let data = await persist.open();
    let product = data.filter((data) => data.id === parseInt(req.params.id));
    if (product.length > 0) {
      res.status(201).json({ status: true, data: product });
    } else if (product.length === 0) {
      res.status(404).json({ err: `product by id:${req.params.id} not exist` });
    }
  } catch (err) {
    res.status(401).json({ err: `error to get product` });
  }
};

const postProduct = async (req, res) => {
  try {
    if (req.body.token) {
      let newProduct = {
        id: await persist.getLastId(),
        timestamp: Date(Date.now()),
        name: req.body.name,
        description: req.body.description,
        code: req.body.code,
        thumbnail: req.body.thumbnail,
        price: req.body.price,
        stock: req.body.stock,
      };
      persist.save(newProduct);
      res.status(201).json({ status: true, data: "product save" });
    } else {
      res.status(201).json({
        status: false,
        err: -1,
        description: `route /products & method post not authorized`,
      });
    }
  } catch (err) {
    res.status(401).json({ err: "producto no valido" });
  }
};

const putProduct = async (req, res) => {
  try {
    if (req.body.token) {
      let existData = await persist.open();
      let index = existData.findIndex(
        (data) => data.id === parseInt(req.params.id)
      );

      existData[index].name = req.body.name;
      existData[index].description = req.body.description;
      existData[index].code = req.body.code;
      existData[index].thumbnail = req.body.thumbnail;
      existData[index].price = req.body.price;
      existData[index].stock = req.body.stock;

      let data = await persist.modify(existData);

      res
        .status(201)
        .json({ status: true, data: `product by id ${req.params.id} modify` });
    } else {
      res.status(201).json({
        status: false,
        err: -1,
        description: `route /products/${req.params.id} & method put not authorized`,
      });
    }
  } catch (err) {
    res.status(401).json({ err: "producto not modify" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (req.body.token) {
      let data = await persist.delete(req.params.id);
      res.status(201).json({ status: true, data: "product eliminated" });
    } else {
      res.status(201).json({
        status: false,
        err: -1,
        description: `route /products/${req.params.id} & method delete not authorized`,
      });
    }
  } catch (err) {
    res.status(401).json({ err: "product eliminated" });
  }
};

module.exports = { getAll, getById, postProduct, putProduct, deleteProduct };
