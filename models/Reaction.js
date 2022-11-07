const { Schema, model, Types } = require('mongoose');

//Schema for what makes up a reaction

const reactionSchema = new Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId(),
        },

        reactionBody:{
            type: String,
            required: true,
            validate:{
                maxlength:280,
            },
        },

        username:{
            type: String,
            required: true,
        },

        createdAt:{
            type: Date,
            default: Date.now,
        },
    },

    {
        toJSON:{
            getters:true,
        },
        id: false,
    }
);


module.exports = reactionSchema;