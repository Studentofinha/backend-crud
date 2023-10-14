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
  const product = await Product.find();
  if(!product){
    res.send('Product topilmadi')
  }else{
    res.send(product);
  }
});

// ID boyicha get qilish

app.get(`${api}/product/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if(!product){
    res.send('Product topilmadi')
  }else{
    res.send(product);
  }
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

  newProduct.save()
    .then((product) => {
      res.send(product);
    })
    .catch((error) => {
      res.send(error);
    });
});

mongoose
  .connect(`${process.env.CONNECTION_STRING}`, {
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
