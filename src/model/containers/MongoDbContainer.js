import mongoose from "mongoose";
import { config } from "../../database.config";

(async () => {
  try {
    await mongoose.connect(config.mongodb.uri, {
      auth: {
        username: config.mongodb.user,
        password: config.mongodb.password,
      },
      authSource: "admin",
    });
    console.log("Database is connected");
  } catch (err) {
    console.log(JSON.stringify(err));
  }
})();

class MongoDbContainer {
  constructor(collection, Schema) {
    this.model = mongoose.model(collection, Schema);
  }

  async save(data) {
    try {
      let document = await this.collection.create(data);
      return document;
    } catch (err) {
      return err;
    }
  }

  async getAll() {
    try {
      let documents = await this.model.find();
      return documents;
    } catch (err) {
      return err;
    }
  }
  async getById(id) {
    try {
      let document = await this.model.findById(id);
      return document;
    } catch (err) {
      return err;
    }
  }

  async deleteById(id) {
    try {
      let document = await this.getById(id);
      document.remove();
      return true;
    } catch (err) {
      return err;
    }
  }

  async updateById(id) {
    try {
      let document = await this.getById(id);
    } catch (err) {
      return err;
    }
  }
}

export default MongoDbContainer;
