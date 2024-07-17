import { model } from "mongoose";

const Product = model("Product", {
  name: { type: String, required: true, minLength: 3 },
  price: { type: Number, required: true },
  img: { type: Buffer },
});

export default Product;
