const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  secondName: {
    type: String,
  },
  birthDay: {
    type: Date,
  },
});

const Users = mongoose.model("GiftlistUsers", userSchema);

module.exports = Users;
