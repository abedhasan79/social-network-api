const { User, Thought } = require('../models');

module.exports = {
    //get all user
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    //create a user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    //get a single user by it _id and populated thoughts and friend data
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) => !user ? res.status(404).json({ message: 'No user with that ID' }) : res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    //update a user by id
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { ...req.body }, { returnOriginal: false })
            .select('-__v')
            .then((user) => !user ? res.status(404).json({ message: 'No user with that ID' }) : res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    //delete a user and associated thoughts
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => !user ? res.status(404).json({ message: 'No user with that ID' }) : Thought.deleteMany({ _id: { $in: user.thoughts } }))
            .then(() => res.json({ message: 'User and associated thoughts deleted' }))
            .catch((err) => res.status(500).json(err));
    },

    //add a friend to the users friend list
    addFriend(req, res) {
        
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.userId  } },
            { runValidators: true, new: true }
        )
            .then((user) => !user ? res.status(404).json({ message: 'No user with this id' }) : res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    //delete a friend from a user friend list
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.userId  } },
            { runValidators: true, new: true }
        )
            .then((user) => !user ? res.status(404).json({ message: 'No user with this id' }) : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
};