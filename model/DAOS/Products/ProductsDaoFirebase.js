import FirebaseContainer from "../../containers/FirebaseContainer.js";

const nameCollection = "products";

class ProductsDaoFirebase extends FirebaseContainer {
  constructor() {
    super(nameCollection);
  }
}

export default ProductsDaoFirebase;
