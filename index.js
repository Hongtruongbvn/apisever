const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
require("dotenv").config();

const mongooseUrl =
  process.env.mongoose || "mongodb://14.225.217.120:27017/day2";

mongoose
  .connect(mongooseUrl)
  .then(() => {
    console.log("mongooseDB connect successfully");
  })
  .catch((err) => {
    console.error("mongooseDB connect fail", err);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello ");
});

// Sử dụng product routes
const productRoutes = require("./routers/product.routes");
app.use("/api/products", productRoutes);
const authRoutes = require("./routers/auth.routes");
const orderRoutes = require("./routers/order.routes");

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

app.listen(port, () => {
  console.log("server is running at port:", port);
});
