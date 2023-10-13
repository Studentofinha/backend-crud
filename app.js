const express = require("express");
const morgan = require("morgan");
const { Product } = require("./models/product");
const mongoose = require("mongoose");

const app = express();
require("dotenv/config");

app.use(express.json()); //body-parser o'rniga
app.use(morgan("tiny")); //

const api = process.env.API_URL;

//GET api product uchun
app.get(`${api}/products`, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post(`${api}/product`, (req, res) => {
  let name = req.body.name;
  let count = req.body.count;
  let price = req.body.price;
  let description = req.body.description;

  const newProduct = new Product({
    name: name,
    count: count,
    price: price,
    description: description,
  });

  newProduct
    .save()
    .then((product) => {
      res.json(product);
    })
    .catch((error) => {
      res.send(error);
    });
});

mongoose
  .connect(`mongodb+srv://admin:727367235@cluster0.bdvplbq.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "products",
  })
  .then(() => {
    console.log("Database ishga tushdi");
  })
  .catch((err) => {
    console.log(err);
  });
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Bu server ${port} da yurmoqda`);
});
