const mongoose = require("mongoose");
const autoIncrement = require("mongoose-plugin-autoinc");

const participantsSchema = new mongoose.Schema({
  participantsId: {
    type: String,
    unique: true,
    required: true,
  },
  participantsEmail: {
    type: String,
  },
  participantsAcceptance: {
    type: Boolean,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  wishList: {
    type: Array,
    default: [],
  },
});

participantsSchema.plugin(autoIncrement.plugin, {
  model: "GiftlistParticipants",
  field: "participantsId",
  startAt: 1,
  incrementBy: 1,
});

const Participants = mongoose.model("GiftlistParticipants", participantsSchema);

module.exports = Participants;
