const express = require("express");
const {
  postParticipant,
  getAllParticipants,
  getParticipantsByEventId,
  updateParticipant,
  getDrawnNames,
  getEventDetailsByUserId,
  getParticipantsIdByUserId,
  deleteParticipants,
} = require("../controllers/participants.js");

const router = express.Router();

router.post("/post", postParticipant);
router.get("/all", getAllParticipants);
router.get("/:eventId", getParticipantsByEventId);
router.put("/:participantsId", updateParticipant);
router.get("/drawn/:eventId", getDrawnNames);
router.get("/:userId/event", getEventDetailsByUserId);
router.get("/id/:userId", getParticipantsIdByUserId);
router.delete("/remove/:participantsId", deleteParticipants);

module.exports = router;
