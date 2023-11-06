const Messages = require("../models/Message.js");

exports.postMessage = (req, res) => {
  const message = req.body.message;
  const userId = req.body.userId;
  const eventId = req.body.eventId;
  const participantsId = req.body.participantsId;
  const timeStamp = Date.now();

  const newMessage = new Messages({
    message,
    userId,
    eventId,
    participantsId,
    timeStamp,
  });

  newMessage
    .save()
    .then((data) => res.status(201).json(data))
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Message creation failed", message: err.message })
    );
};

exports.getAllMessages = (req, res) => {
  Messages.find()
    .then((messages) => res.json(messages))
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Messages retrieval failed", message: err.message })
    );
};

exports.getMessagesByEventId = (req, res) => {
  const eventId = req.params.eventId;
  Messages.find({ eventId: eventId })
    .then((messages) => {
      const messageDetails = messages.map((singleMessage) => ({
        message: singleMessage.message,
        userId: singleMessage.userId,
        eventId: singleMessage.eventId,
        participantsId: singleMessage.participantsId,
        timeStamp: singleMessage.timeStamp,
      }));
      res.json(messageDetails);
    })
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Messages retrieval failed", message: err.message })
    );
};

exports.updateMessage = (req, res) => {
  const messageId = req.params.messageId;
  Messages.findOne({ messageId: messageId })
    .then((message) => {
      message.likes = req.body.likes;
      message
        .save()
        .then(() => res.json("Message Updated"))
        .catch((err) =>
          res
            .status(400)
            .json({ error: "Message update failed", message: err.message })
        );
    })
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Message retrieval failed", message: err.message })
    );
};
