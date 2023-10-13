const express = require("express");
const morgan = require("morgan");
const {Product} = require("./models/product");
const mongoose=require('mongoose')

const app = express();
require("dotenv/config");

app.use(express.json()); //body-parser o'rniga
app.use(morgan("tiny")); //

const api = process.env.API_URL;

//GET api product uchun
app.get(`${api}/products`, async (req, res) => {
  const products=await Product.find()
  
  if(!products){
    res.send('Topilmadi')
  }else{
    res.json(products)
  }

});

//Get by id
app.get(`${api}/products/:id`, async (req, res) => {
  const product=await Product.findById(req.params.id)
  
  if(!product){
    res.send('Topilmadiku')
  }else{
    res.json(product)
  }

});

//POST api product uchun
app.post(`${api}/products`,async (req, res) => {

  const newProduct =await new Product({
    name: req.body.name,
    count: req.body.count,
    price: req.body.name,
    description: req.body.description,
  });

  newProduct.save()
    .then((createdProduct) => {
      res.send(createdProduct);
    })
    .catch((err) => {
      console.log(err);
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
