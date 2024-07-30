import { model } from "mongoose";

const Product = model("Product", {
  name: { type: String, required: true, minLength: 3 },
  price: { type: Number, required: true },
  img: { data: Buffer, contentType: String },
});

export default Product;
