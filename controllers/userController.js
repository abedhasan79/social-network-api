const {User, Thought} = require('../models');

module.exports = {
    //get all user
    getUsers(req, res){
        User.find()
            .then((users) => res.json(users))
            .catch((err)=>res.status(500).json(err));
    },

    //create a user
    createUser(req, res){
        User.create(req.body)
            .then((user)=>res.json(user))
            .catch((err) => res.status(500).json(err));
    },
};