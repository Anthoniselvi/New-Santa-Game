const mongoose = require("mongoose");
const autoIncrement = require("mongoose-plugin-autoinc");

const productsSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    // required: true,
  },
  productUrl: {
    type: String,
    required: true,
  },
  productPrice: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
  },
  eventId: {
    type: String,
    required: true,
  },
  participantsId: {
    type: String,
    required: true,
  },
});

productsSchema.plugin(autoIncrement.plugin, {
  model: "GiftlistProducts",
  field: "productId",
  startAt: 1,
  incrementBy: 1,
});

const Products = mongoose.model("GiftlistProducts", productsSchema);

module.exports = Products;
