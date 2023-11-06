const Users = require("../models/Users.js");

exports.postUser = (req, res) => {
  const userId = req.body.userId;
  console.log("userId: ", userId);
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new Users({
    userId,
    email,
    password,
  });

  newUser
    .save()
    .then((data) => res.json(data))
    .catch((err) =>
      res
        .status(400)
        .json({ error: "User creation failed", message: err.message })
    );
};

exports.updateUser = (req, res) => {
  const userId = req.params.userId;
  Users.findOne({ userId: userId })
    .then((user) => {
      if (!user) {
        return res.status(404).json("User not found");
      }

      user.firstName = req.body.firstName;
      user.secondName = req.body.secondName;
      user.birthDay = req.body.birthDay;
      user
        .save()
        .then(() => res.json("User updated"))
        .catch((err) =>
          res
            .status(400)
            .json({ error: "User update failed", message: err.message })
        );
    })
    .catch((err) =>
      res
        .status(400)
        .json({ error: "User retrieval failed", message: err.message })
    );
};

exports.getUser = (req, res) => {
  Users.find()
    .then((users) => res.json(users))
    .catch((err) =>
      res
        .status(400)
        .json({ error: "User retrieval failed", message: err.message })
    );
};

exports.getUserByEmail = (req, res) => {
  const email = req.params.email;
  Users.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json("User not found");
      }

      const userDetails = {
        firstName: user.firstName,
        secondName: user.secondName,
        email: user.email,
      };
      res.json(userDetails);
    })
    .catch((err) =>
      res
        .status(400)
        .json({ error: "User retrieval failed", message: err.message })
    );
};

exports.getUserNameByUserId = (req, res) => {
  const userId = req.params.userId;
  Users.findOne({ userId: userId })
    .then((user) => {
      if (!user) {
        return res.status(404).json("User not found");
      }

      const userDetails = {
        firstName: user.firstName,
        secondName: user.secondName,
        email: user.email,
      };
      res.json(userDetails);
    })
    .catch((err) =>
      res
        .status(400)
        .json({ error: "User retrieval failed", message: err.message })
    );
};

exports.getEmailByUserId = (req, res) => {
  const userId = req.params.userId;
  Users.findOne({ userId: userId })
    .then((user) => {
      if (!user) {
        return res.status(404).json("User not found");
      }

      const userEmail = {
        email: user.email,
      };
      res.json(userEmail);
    })
    .catch((err) =>
      res
        .status(400)
        .json({ error: "User retrieval failed", message: err.message })
    );
};
