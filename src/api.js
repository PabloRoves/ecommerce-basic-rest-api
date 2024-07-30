import express, { json } from "express";
import { connect } from "mongoose";
import productController from "./controllers/product.controller.js";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";

dotenv.config();

const PORT = process.env.PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const CLUSTER = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const connection_string = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;

const app = express();
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//app.use(upload.single("image")); // Espera un campo llamado 'image' en el FormData

app.disable("x-powered-by");

connect(connection_string);

app.get("/products/:id", productController.get);
app.get("/products", productController.list);
//app.post("/products", productController.create);
//app.post("/products", upload.none(), productController.create);
app.post("/products", upload.single("img"), productController.create);
app.put("/products/:id", productController.update);
app.patch("/products/:id", productController.update);
app.delete("/products/:id", productController.destroy);

app.get("*", (req, res) => {
  res.status(404).send("This page doesn't exist.");
});
app.post("*", (req, res) => {
  res.status(404).send("This page doesn't exist.");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

export { upload };
