const {Schema, model} = require('mongoose');
const Reaction = require('./Reaction.js');

//Schema for what makes up a thought
const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },

        createdAt:{
            type: Date,
            default: Date.now,
        },

        username:{
            type: String,
            required: true,
        },

        reactions:[Reaction],
    },

    {
        toJSON:{
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

//Create a virtual property 'reactionCount' that gets a thoughts total number of reaction
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

// initialize thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;