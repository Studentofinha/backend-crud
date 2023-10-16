const express = require("express");
const morgan = require("morgan");
const productRouter = require("./routes/product");

const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv/config");

app.use(express.json()); //body-parser o'rniga
app.use(morgan("tiny")); //
app.use("*", cors());

const api = process.env.API_URL;

app.use(`${api}/products`, productRouter);


mongoose
  .connect(`${process.env.CONNECTION_STRING}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "online-magazin",
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
