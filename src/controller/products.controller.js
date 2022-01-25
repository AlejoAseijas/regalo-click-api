const Persist = require("../model/fs/fs.model");
const persist = new Persist("../data.json");

const getAll = async (req, res) => {
  try {
    let data = await persist.open();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ err: "producto no validos" });
  }
};

const getById = async (req, res) => {
  try {
    let data = await persist.open();
    let product = data.filter((data) => data.id === parseInt(req.params.id));
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ err: "producto no valido" });
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
      res.status(201).json("producto guardado");
    } else {
      res.status(401).json({
        err: -1,
        description: `route /products & method post not authorized`,
      });
    }
  } catch (err) {
    res.status(400).json({ err: "producto no valido" });
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

      res.status(201).json({ data: `product by id ${req.params.id} modify` });
    } else {
      res.status(401).json({
        err: -1,
        description: `route /products/${req.params.id} & method put not authorized`,
      });
    }
  } catch (err) {
    res.status(400).json({ err: "producto no modificado" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (req.body.token) {
      await persist.delete(req.params.id);
      res.status(201).json("producto eliminado");
    } else {
      res.status(401).json({
        err: -1,
        description: `route /products/${req.params.id} & method delete not authorized`,
      });
    }
  } catch (err) {
    res.status(400).json({ err: "producto modificado" });
  }
};

module.exports = { getAll, getById, postProduct, putProduct, deleteProduct };
