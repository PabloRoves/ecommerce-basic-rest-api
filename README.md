# Basic REST API for Product Management

This is a basic REST API developed using Node.JS, Express.JS, and MongoDB for managing products in an ecommerce application.

## Installation and Setup

Clone the repository

```bash
git clone https://github.com/pabloroves/ecommerce_basic_rest_api.git
cd ecommerce_basic_rest_api
```

Install dependencies

```bash
npm install
```

Configure MongoDB

- Ensure you have a MongoDB instance running.
- Modify the database connection in api.js as needed:

```javascript
dotenv.config();
const PORT = process.env.PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const CLUSTER = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const connection_string = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;
```

## Usage

To run the API, use the following command:

```bash
npm start
This will start the server at http://localhost:PORT.
```

## Endpoints

GET /products - Get all available products.

POST /products - Create a new product.

GET /products/PRODUCT_ID - Get a specific product by ID.

PUT /products/PRODUCT_ID - Update an existing product.

PATCH /products/PRODUCT_ID - Update an existing product.

DELETE /products/PRODUCT_ID - Delete an existing product.

## Controllers

#### product.controller.js

This file contains controllers handling CRUD operations for products.

#### product.js

Defines the schema of the Product model using Mongoose, used for interacting with the MongoDB database.

## Usage Examples

#### Get all products:

```bash
curl http://localhost:3000/products
```

#### Create a new product:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"New Product","price":99.99}' http://localhost:3000/products
```

#### Get a product by ID:

```bash
curl http://localhost:3000/products/5f63a27b88511f2f10f6ebd1
```

## Contribution

We welcome contributions to improve this project! Please create pull requests on GitHub.

## License

This project is licensed under the MIT License.
