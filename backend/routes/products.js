const express = require("express");
const {
  postProduct,
  getAllProducts,
  getProductsByParticipantsId,
  getProductsByEventId,
  getWishlist,
} = require("../controllers/products.js");

const router = express.Router();

router.post("/add", postProduct);
router.get("/all", getAllProducts);
router.get("/all/:participantsId", getProductsByParticipantsId);
router.get("/details/:eventId", getProductsByEventId);
router.get("/wishlist/:participantsId", getWishlist);

module.exports = router;
