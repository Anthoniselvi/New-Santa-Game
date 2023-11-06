const express = require("express");
const {
  postEvent,
  getAllEvents,
  updateEvent,
  getEventsById,
  getEventDetailsbyEventId,
  getuserNameByEventId,
  editEvent,
  deleteEvent,
  updateDrawNames,
} = require("../controllers/event.js");

const router = express.Router();

router.post("/add", postEvent);
router.get("/all", getAllEvents);
router.put("/:eventId", updateEvent);
router.get("/:userId", getEventsById);
router.get("/get/:eventId", getEventDetailsbyEventId);
router.get("/user/:eventId", getuserNameByEventId);
router.put("/edit/:eventId", editEvent);
router.delete("/delete/:eventId", deleteEvent);
router.put("/draw/:eventId", updateDrawNames);

module.exports = router;
