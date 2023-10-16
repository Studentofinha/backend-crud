const express = require("express");
const { Product } = require("../models/product");
const router = express.Router();

require("dotenv/config");

router.get("/", async (req, res) => {
  const product = await Product.find();
  if (!product) {
    res.send("Product topilmadi");
  } else {
    res.send(product);
  }
});

// ID boyicha get qilish

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.send("Product topilmadi");
  } else {
    res.send(product);
  }
});

router.post('/', (req, res) => {
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
      res.send(product);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.put(`/:id`, async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      count: req.body.count,
      price: req.body.price,
      description: req.body.description,
    },
    {
      new: true,
    }
  );

  if (!product) {
    res.send("Product is not updated");
  } else {
    res.status(202).json(product);
  }
});

module.exports = router;
