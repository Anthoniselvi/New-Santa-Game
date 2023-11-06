const mongoose = require("mongoose");
const autoIncrement = require("mongoose-plugin-autoinc");

const messageSchema = new mongoose.Schema({
  messageId: {
    type: String,
    unique: true,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
  },
  timeStamp: {
    type: Date,
  },
  likes: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
    required: true,
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

messageSchema.plugin(autoIncrement.plugin, {
  model: "GiftlistMessages",
  field: "messageId",
  startId: 1,
  incrementBy: 1,
});

const Messages = mongoose.model("GiftlistMessages", messageSchema);

module.exports = Messages;
