const { User, Thought } = require("../models");

const userController = {
  // gets all users
  getAllUsers(req, res) {
    User.find({})
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // gets one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },
  // creates a user
  createUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },

  // updates a user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // deletes a user by id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        // Bonus deletes users thoughts as well.
        return Thought.deleteMany({ _id: { $in: userData.thoughts } });
      })
      .then(() => {
        res.json({ message: "User and thoughts deleted!" });
      })
      .catch((err) => res.json(err));
  },

  // adds a friend to a user's friend list
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // removes a friend from a user's friend list
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
