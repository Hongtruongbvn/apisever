// routers/order.routes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/order.model");
const Product = require("../models/product.model");

router.post("/", async (req, res) => {
  const { userId, items } = req.body;

  try {
    let total = 0;
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) throw new Error("Product not found");
      total += product.price * item.quantity;
    }

    const order = new Order({ userId, items, total });
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const orders = await Order.find().populate("items.productId");
  res.json(orders);
});

module.exports = router;
