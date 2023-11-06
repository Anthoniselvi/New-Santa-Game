const Products = require("../models/Products.js");

exports.postProduct = (req, res) => {
  const productName = req.body.productName;
  const productUrl = req.body.productUrl;
  const productPrice = req.body.productPrice;
  const description = req.body.description;
  const eventId = req.body.eventId;
  const participantsId = req.body.participantsId;

  const newProduct = new Products({
    productName,
    productUrl,
    productPrice,
    description,
    eventId,
    participantsId,
  });

  newProduct
    .save()
    .then((data) => res.status(201).json(data))
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Product creation failed", message: err.message })
    );
};

exports.getAllProducts = (req, res) => {
  Products.find()
    .then((products) => res.json(products))
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Product retrieval failed", message: err.message })
    );
};

exports.getProductsByParticipantsId = (req, res) => {
  const participantsId = req.params.participantsId;
  Products.find({ participantsId: participantsId })
    .then((products) => {
      const productDetails = products.map((product) => ({
        productId: product.productId,
        productUrl: product.productUrl,
        productName: product.productName,
        productPrice: product.productPrice,
        description: product.description,
        eventId: product.eventId,
        participantsId: product.participantsId,
      }));
      res.json(productDetails);
    })
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Product retrieval failed", message: err.message })
    );
};

exports.getProductsByEventId = (req, res) => {
  const eventId = req.params.eventId;
  Products.find({ eventId: eventId })
    .then((products) => {
      if (products.length === 0) {
        return res.status(200).json({ message: "No Products Found" });
      }

      const productDetails = products.map((product) => ({
        productId: product.productId,
        productName: product.productName,
        productPrice: product.productPrice,
        description: product.description,
        eventId: product.eventId,
        participantsId: product.participantsId,
      }));
      res.json(productDetails);
    })
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Product retrieval failed", message: err.message })
    );
};

exports.getWishlist = (req, res) => {
  const participantsId = req.params.participantsId;
  Products.find({ participantsId: participantsId })
    .then((products) => {
      if (products.length === 0) {
        return res.status(200).json({ message: "No products found" });
      }

      const wishlistArray = products.map((product) => product.productId);
      res.json(wishlistArray);
    })
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Wishlist retrieval failed", message: err.message })
    );
};
