const { User, Thought, Reaction } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughts) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thoughts._id } },
                    { new: true },
                );
            })
            .then((thoughts) => !thoughts ? res.status(404).json({ message: 'thoughts created but no user with that id' }) : res.json(thoughts))
            .catch((err) => res.json(err));
    },
};