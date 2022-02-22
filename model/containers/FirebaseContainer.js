import admin from "firebase-admin";
import serviceAccount from "../../database.config.js";
import { faker } from "@faker-js/faker";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount.firebase),
});

console.log("Db connected");

class FirebaseContainer {
  constructor(nameCollection) {
    this.nameCollection = nameCollection;
  }
  async save(data) {
    try {
      let db = admin.firestore();
      let query = db.collection(this.nameCollection);
      let id = faker.datatype.uuid();
      let doc = query.doc(`${id}`);
      data.id = id;
      await doc.create(data);
    } catch (err) {
      return err;
    }
  }

  async getAll() {
    try {
      let db = admin.firestore();
      let querySnapshot = await db.collection(this.nameCollection).get();
      let arrayProducts = [];
      querySnapshot.docs.map((doc) => {
        arrayProducts.push({
          id: doc.id,
          code: doc.data().code,
          description: doc.data().description,
          name: doc.data().name,
          price: doc.data().price,
          stock: doc.data().stock,
          thumbnail: doc.data().thumbnail,
          timestamp: doc.data().timestamp,
        });
      });
      return arrayProducts;
    } catch (err) {
      return err;
    }
  }

  async getById(id) {
    try {
      let db = admin.firestore();
      let querry = db.collection(this.nameCollection);
      let doc = querry.doc(`${id}`);
      let item = await doc.get();
      return item.data();
    } catch (err) {
      return err;
    }
  }

  async deleteById(id) {
    try {
      let db = admin.firestore();
      let querry = db.collection(this.nameCollection);
      let doc = querry.doc(`${id}`);
      let item = await doc.delete();
      return true;
    } catch (err) {
      return err;
    }
  }

  async updateById(id, producto) {
    try {
      let db = admin.firestore();
      let querry = db.collection(this.nameCollection);
      let doc = querry.doc(`${id}`);
      let item = await doc.update(producto);
      return true;
    } catch (err) {
      return err;
    }
  }

  async addSubDocToDocumentId(idDoc, subDoc) {
    try {
      let doc = await this.getById(idDoc);
      doc.products.push(subDoc);
      return await this.updateById(idDoc, doc);
    } catch (err) {
      return err;
    }
  }

  async eliminateSubDocIdByDocumentId(idDocument, idSubDoc) {
    try {
      let doc = await this.getById(idDocument);
      let newDoc = doc.products.filter((value) => value.id != idSubDoc);
      doc.products = newDoc;
      return await this.updateById(idDocument, doc);
    } catch (err) {
      return err;
    }
  }
}

export default FirebaseContainer;
