const Users = require("../models/Users.js");
const Events = require("../models/Event.js");
const Participants = require("../models/Participants.js");
const Messages = require("../models/Message.js");
const Products = require("../models/Products.js");

// Create a new event
exports.postEvent = (req, res) => {
  const { eventName, giftExchangeDate, rsvpDate, confirmation, userId } =
    req.body;

  const newEvent = new Events({
    eventName,
    giftExchangeDate,
    rsvpDate,
    confirmation,
    drawNames: false, // Set the drawNames field to false by default
    userId,
  });

  newEvent
    .save()
    .then((data) => res.status(201).json(data))
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Event creation failed", message: err.message })
    );
};

// Retrieve all events
exports.getAllEvents = (req, res) => {
  Events.find()
    .then((events) => res.json(events))
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Events retrieval failed", message: err.message })
    );
};

// Update an event
exports.updateEvent = (req, res) => {
  const eventId = req.params.eventId;
  const { budget, details } = req.body;

  Events.findOneAndUpdate(
    { eventId: eventId },
    { budget, details },
    { new: true }
  )
    .then((event) => {
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      return res.json("Event Updated");
    })
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Event update failed", message: err.message })
    );
};

// Get events by user ID
exports.getEventsById = (req, res) => {
  const userId = req.params.userId;

  Events.find({ userId: userId })
    .then((events) => {
      if (events.length === 0) {
        return res.status(404).json({ message: "No events found" });
      }

      const eventDetails = events.map((event) => ({
        eventId: event.eventId,
        eventName: event.eventName,
        giftExchangeDate: event.giftExchangeDate,
      }));

      res.json(eventDetails);
    })
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Event retrieval failed", message: err.message })
    );
};

// Get event details by event ID
exports.getEventDetailsbyEventId = (req, res) => {
  const eventId = req.params.eventId;

  Events.findOne({ eventId: eventId })
    .then((event) => {
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      res.json(event);
    })
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Event details retrieval failed", message: err.message })
    );
};

// Get user details by event ID
exports.getuserNameByEventId = (req, res) => {
  const eventId = req.params.eventId;

  Events.findOne({ eventId: eventId })
    .then((event) => {
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      Users.findOne({ userId: event.userId })
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }

          const userDetails = {
            firstName: user.firstName,
            secondName: user.secondName,
          };

          res.json(userDetails);
        })
        .catch((err) =>
          res
            .status(500)
            .json({ error: "User retrieval failed", message: err.message })
        );
    })
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Event details retrieval failed", message: err.message })
    );
};

// Edit an event
exports.editEvent = (req, res) => {
  const eventId = req.params.eventId;
  const { eventName, giftExchangeDate, rsvpDate, budget, details } = req.body;

  Events.findOneAndUpdate(
    { eventId: eventId },
    { eventName, giftExchangeDate, rsvpDate, budget, details },
    { new: true }
  )
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(400).json({ error: "Event edit failed", message: err.message })
    );
};

// Delete an event and related data
exports.deleteEvent = (req, res) => {
  const eventId = req.params.eventId;

  Events.findOneAndDelete({ eventId })
    .then((deletedEvent) => {
      if (!deletedEvent) {
        return res.status(404).json({ error: "Event not found" });
      }

      Promise.all([
        Participants.deleteMany({ eventId }),
        Messages.deleteMany({ eventId }),
        Products.deleteMany({ eventId }),
      ])
        .then(() =>
          res.status(200).json({ message: "Event deleted successfully" })
        )
        .catch(() =>
          res.status(500).json({ error: "Failed to delete related data" })
        );
    })
    .catch(() => res.status(500).json({ error: "Failed to delete event" }));
};

// Update the drawNames field for an event
exports.updateDrawNames = (req, res) => {
  const eventId = req.params.eventId;
  const { drawNames } = req.body;

  Events.findOneAndUpdate({ eventId: eventId }, { drawNames }, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json("Event Updated");
    })
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Event update failed", message: err.message })
    );
};
