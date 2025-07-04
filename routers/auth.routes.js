// routers/auth.routes.js
const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "secret123"; // hoặc từ .env

// Đăng ký
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Đăng nhập
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: "Sai tài khoản" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Sai mật khẩu" });

  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1d" });
  res.json({ token, username: user.username });
});

module.exports = router;
