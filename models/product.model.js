const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "products",
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
