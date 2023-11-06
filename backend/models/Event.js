const mongoose = require("mongoose");
const autoIncrement = require("mongoose-plugin-autoinc");

const eventSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
    unique: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  giftExchangeDate: {
    type: String,
    required: true,
  },
  rsvpDate: {
    type: String,
    required: true,
  },
  confirmation: {
    type: Boolean,
    required: true,
  },
  budget: {
    type: String,
  },
  details: {
    type: String,
  },
  drawNames: {
    type: Boolean,
    required: true,
    default: false,
  },
  drawnNames: {
    type: Array,
    default: [],
  },
  userId: {
    type: String,
    required: true,
  },
});

eventSchema.plugin(autoIncrement.plugin, {
  model: "GiftlistEvents",
  field: "eventId",
  startAt: 1,
  incrementBy: 1,
});

const Events = mongoose.model("GiftlistEvents", eventSchema);

module.exports = Events;
