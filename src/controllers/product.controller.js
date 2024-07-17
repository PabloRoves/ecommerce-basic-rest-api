import Products from "../models/Product.js";
//import fs from "node:fs/promises";

const Product = {
  get: async (req, res) => {
    try {
      console.log("Request for a product received.");
      const { id } = req.params;
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Content-Type", "application/json");
      const product = await Products.findOne({ _id: id });
      const base64Image = product.img.toString("base64");
      const dataUrl = `data:image/jpeg;base64,${base64Image}`;
      await res.status(200).json({ name: product.name, price: product.price, imagenUrl: dataUrl });
      console.log(`Product ${product.name} info sended to client`);
    } catch (err) {
      res.status(500).send();
      console.log(err);
    }
  },
  list: async (req, res) => {
    try {
      console.log("Request to list products received.");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Content-Type", "application/json");
      const products = await Products.find();
      //console.log(products);
      const body = await processProduct(products);
      //console.log(body);
      await res.status(200).json(body);
      console.log("Products sended to client.");
    } catch (err) {
      res.status(500).send();
      console.log(err);
    }
  },
  create: async (req, res) => {
    try {
      console.log("Request to create a product received.");
      res.header("Access-Control-Allow-Origin", "*");
      console.log("Creating product...");
      const product = new Products(req.body);
      const savedProduct = await product.save();
      await res.status(201).send(savedProduct._id);
      console.log(`Product name "${savedProduct.name}" created. Product Id returned to client.`);
    } catch (err) {
      res.status(500).send();
      console.log(err);
    }
  },
  update: async (req, res) => {
    try {
      console.log("Request to update a product received.");
      const { id } = req.params;
      //res.setHeader("Access-Control-Allow-Origin", "*");
      const product = await Products.findOne({ _id: id });
      Object.assign(product, req.body);
      await product.save();
      res.status(204).send();
      console.log("Product updated.");
    } catch (err) {
      res.status(500).send();
      console.log(err);
    }
  },
  destroy: async (req, res) => {
    try {
      console.log("Request to delete a product received.");
      const { id } = req.params;
      console.log(id);
      const product = await Products.findOne({ _id: id });
      if (product) {
        await product.deleteOne();
        await res.sendStatus(200);
        console.log("Product deleted.");
      } else {
        await res.sendStatus(404);
        console.log(`Product with id: ${id} doesn't found.`);
      }
    } catch (err) {
      res.status(500).send();
      console.log(err);
    }
  },
};

async function processProduct(products) {
  if (products == null) return null;

  return products.map((product) => {
    const base64Image = product.img.toString("base64");
    const dataUrl = `data:image/jpeg;base64,${base64Image}`;
    return { id: product._id, name: product.name, price: product.price, img: dataUrl };
  });
}

export default Product;
