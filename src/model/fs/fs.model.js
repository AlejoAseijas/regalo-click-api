const fs = require("fs");

class Persist {
  constructor(path) {
    this.path = path;
  }

  async open() {
    let data = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    return data;
  }

  async getLastId() {
    let lastId = await this.open();
    return lastId.length + 1;
  }

  async save(data) {
    let dataExist = await this.open();
    dataExist.push(data);
    await fs.promises.writeFile(this.path, JSON.stringify(dataExist));
    return data.id;
  }

  async delete(id) {
    let data = await this.open();
    let newData = data.filter((product) => product.id != parseInt(id));
    await fs.promises.writeFile(this.path, JSON.stringify(newData));
    return id;
  }

  async modify(data) {
    await fs.promises.writeFile(this.path, JSON.stringify(data));
    return data.id;
  }
}

module.exports = Persist;
