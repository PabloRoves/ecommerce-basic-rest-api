import Products from "../models/Product.js";
import { upload } from "../api.js";

//import fs from "node:fs/promises";

const Product = {
  get: async (req, res) => {
    try {
      console.log("Request for a product received.");
      const { id } = req.params;
      //res.setHeader("Access-Control-Allow-Origin", "*");
      //res.setHeader("Content-Type", "application/json");
      const product = await Products.findOne({ _id: id });
      //const base64Image = product.img.toString("base64");
      //const dataUrl = `data:image/jpeg;base64,${base64Image}`;
      //await res.status(200).json({ name: product.name, price: product.price, imagenUrl: dataUrl });
      await res.status(200).json(product);
      console.log(`Product ${product.name} info sended to client`);
    } catch (err) {
      res.status(500).send();
      console.log(err);
    }
  },
  list: async (req, res) => {
    try {
      console.log("Request to list products received.");
      const products = await Products.find();
      //console.log(Object.stringify(products));
      const processedProducts = await processProducts(products);

      await res.status(200).json(processedProducts);
      console.log("Products sended to client.");
    } catch (err) {
      res.status(500).send();
      console.log(err);
    }
  },
  create: async (req, res) => {
    try {
      console.log("ENDPOINT Create - Request to create a product received.");
      console.log("Creating product...");
      const { name, price } = req.body;
      const img = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
      const product = new Products({
        name,
        price,
        img,
      });
      const savedProduct = await product.save();
      await res.status(201).send(savedProduct._id);
      console.log(`ENDPOINT Create - Product name "${savedProduct.name}" created. Product Id returned to client.`);
    } catch (err) {
      await res.status(500).json({ error: err.message });
      console.log(`ENDPOINT Create - ${err}`);
    }
  },

  update: async (req, res) => {
    try {
      console.log("Request to update a product received.");
      const { id } = req.params;
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
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Methods", "DELETE");
    //res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    /* if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    } */

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
      await res.status(500).send();
      console.log(err);
    }
  },
};

async function processProducts(products) {
  if (products == null) return {};

  return products.map((product) => ({
    id: product._id,
    name: product.name,
    price: product.price,
    img: `data:${product.img.contentType};base64,${product.img.data.toString("base64")}`,
  }));
}

export default Product;
