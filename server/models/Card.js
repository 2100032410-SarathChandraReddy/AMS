const mongoose = require("mongoose");

const Card = new mongoose.Schema(
  // {
  //   username: { type: String, required: true },
  // },
  {
    name: String,
    price: String,
    image: String,
  },
  {
    collection: "ImageDetails",
  }
);

mongoose.model("ImageDetails", Card);
