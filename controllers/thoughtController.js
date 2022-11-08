const { User, Thought, Reaction } = require('../models');

module.exports = {
    //get all thoughts
    getThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.json(err));
    },

    //create a thought
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

    //get a thought bu its id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thoughts) => !thoughts ? res.status(404).json({ message: 'No thought with that ID' }) : res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    //update a thought by it's id
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { thoughtText: req.body.thoughtText }, { new: true })
            .select('-__v')
            .then((thoughts) => !thoughts ? res.status(404).json({ message: 'No thought with that ID' }) : res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    //delete a thought by it's id
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thoughts) => !thoughts ? res.status(404).json({ message: 'No thought with that ID' })
                : User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true },
                )
            )
            .then((user) => !user ? res.status(404).json({ message: 'No user with this id' }) : res.json({ message: 'thougt deleted' }))
            .catch((err) => res.status(500).json(err));
    },

    //create a reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true },
        )
            .then((thoughts) => !thoughts ? res.status(404).json({ message: 'No thoughts with this id' }) : res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    //delete a reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: {reactionId: req.params.reactionId}  } },
            { runValidators: true, new: true }
        )
            .then((thoughts) => !thoughts ? res.status(404).json({ message: 'No thoughts with this id' }) : res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

};