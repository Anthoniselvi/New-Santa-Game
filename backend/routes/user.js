const express = require("express");
const {
  postUser,
  updateUser,
  getUser,
  getUserByEmail,
  getUserNameByUserId,
  getEmailByUserId,
} = require("../controllers/user.js");

const router = express.Router();

router.post("/add", postUser);
router.get("/all", getUser);
router.put("/:userId", updateUser);
router.get("/:email", getUserByEmail);
router.get("/get/:userId", getUserNameByUserId);
router.get("/email/:userId", getEmailByUserId);

module.exports = router;
