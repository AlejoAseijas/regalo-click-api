import FirebaseContainer from "../../containers/FirebaseContainer.js";

const nameCollection = "carts";

class CartDaoFirebase extends FirebaseContainer {
  constructor() {
    super(nameCollection);
  }
}

export default CartDaoFirebase;
