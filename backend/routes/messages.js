const express = require("express");
const {
  postMessage,
  getAllMessages,
  getMessagesByEventId,
} = require("../controllers/message.js");

const router = express.Router();

router.post("/add", postMessage);
router.get("/all", getAllMessages);
router.get("/all/:eventId", getMessagesByEventId);

module.exports = router;
