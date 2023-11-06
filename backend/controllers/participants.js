const Users = require("../models/Users.js");
const Events = require("../models/Event.js");
const Participants = require("../models/Participants.js");

exports.postParticipant = (req, res) => {
  const participantsEmail = req.body.participantsEmail || "";
  const participantsAcceptance = req.body.participantsAcceptance;
  const eventId = req.body.eventId;
  const userId = req.body.userId || "";

  const newParticipant = new Participants({
    participantsEmail,
    participantsAcceptance,
    eventId,
    userId,
  });

  newParticipant
    .save()
    .then((data) => res.status(201).json(data))
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Participant creation failed", message: err.message })
    );
};

exports.getAllParticipants = (req, res) => {
  Participants.find()
    .then((participants) => res.json(participants))
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Participants retrieval failed", message: err.message })
    );
};

exports.getParticipantsByEventId = (req, res) => {
  const eventId = req.params.eventId;
  Participants.find({ eventId: eventId })
    .then((participants) => {
      const participantsDetails = participants.map((participant) => ({
        participantsEmail: participant.participantsEmail,
        participantsAcceptance: participant.participantsAcceptance,
        participantsId: participant.participantsId,
        eventId: participant.eventId,
        userId: participant.userId,
      }));
      res.json(participantsDetails);
    })
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Participants retrieval failed", message: err.message })
    );
};

exports.updateParticipant = (req, res) => {
  const participantsId = req.params.participantsId;
  Participants.findOne({ participantsId: participantsId })
    .then((participant) => {
      participant.participantsEmail = req.body.participantsEmail;
      participant.userId = req.body.userId;
      participant
        .save()
        .then(() => res.json("Participant details Updated"))
        .catch((err) =>
          res.status(400).json({ error: "Update failed", message: err.message })
        );
    })
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Participant retrieval failed", message: err.message })
    );
};

exports.getDrawnNames = async (req, res) => {
  const eventId = req.params.eventId;
  try {
    const event = await Events.findOne({ eventId: eventId });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const participants = await Participants.find({
      eventId: eventId,
      participantsEmail: { $ne: "" }, // Filter out participants with empty emails
    });

    if (participants.length === 0) {
      return res
        .status(404)
        .json({ message: "There are no participants for this event" });
    }

    const participantsEmails = participants.map(
      (participant) => participant.participantsEmail
    );

    const usersWithEmail = await Users.find({
      email: { $in: participantsEmails },
    });

    const participantsEmailsList = participants.map((participant) => {
      const user = usersWithEmail.find(
        (user) => user.email === participant.participantsEmail
      );

      let userName = "Unknown";
      if (user) {
        userName = user.firstName;
        if (user.secondName) {
          userName += " " + user.secondName;
        }
      }
      return {
        userName,
      };
    });

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    const names = participantsEmailsList.map(
      (participant) => participant.userName
    );
    shuffleArray(names);

    const pairings = names.map((giver, index) => ({
      giver,
      receiver: names[(index + 1) % names.length],
    }));

    event.drawNames = true;
    event.drawnNames = pairings;

    const savedEvent = await event.save();
    console.log("Pairings saved: ", savedEvent.drawnNames);

    res.json(savedEvent.drawnNames);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching participants." });
  }
};

exports.getEventDetailsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("userId:", userId);

    const events = await Events.find({ userId }).exec();
    const eventIds = new Set(events.map((event) => event.eventId));

    const participants = await Participants.find({ userId }).exec();
    const participantEventIds = new Set(
      participants.map((participant) => participant.eventId)
    );

    const eventDetailsPromises = Array.from(eventIds).map((eventId) =>
      Events.findOne({ eventId }).exec()
    );

    const participantEventDetailsPromises = Array.from(participantEventIds)
      .filter((eventId) => !eventIds.has(eventId))
      .map((eventId) => Events.findOne({ eventId }).exec());

    const eventDetailsResults = await Promise.all(eventDetailsPromises);
    const participantEventDetailsResults = await Promise.all(
      participantEventDetailsPromises
    );

    const mergedEventDetails = [
      ...events,
      ...participantEventDetailsResults,
    ].filter((event) => event !== null);

    res.json(mergedEventDetails);
  } catch (err) {
    console.error("Error retrieving event details:", err);
    res
      .status(400)
      .json({ error: "Event retrieval failed", message: err.message });
  }
};

exports.getParticipantsIdByUserId = (req, res) => {
  const userId = req.params.userId;
  const eventIdFromUI = req.query.eventId;

  Participants.find({ userId: userId })
    .then((participants) => {
      const matchingParticipants = participants.filter((participant) => {
        return participant.eventId === eventIdFromUI;
      });
      const participantsIds = matchingParticipants.map((participant) => {
        return participant.participantsId;
      });
      res.json(participantsIds);
    })
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Participants retrieval failed", message: err.message })
    );
};

exports.deleteParticipants = (req, res) => {
  const participantsId = req.params.participantsId;
  Participants.findOneAndDelete({ participantsId: participantsId })
    .then((deletedParticipant) => {
      if (!deletedParticipant) {
        return res.status(404).json({ error: "Participant not found" });
      }
      return res
        .status(200)
        .json({ message: "Participant deleted successfully" });
    })
    .catch((err) =>
      res.status(400).json({ error: "Deletion failed", message: err.message })
    );
};
