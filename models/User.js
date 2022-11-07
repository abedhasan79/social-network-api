const { Schema, model } = require('mongoose');

//Schema for what makes up a user

const userSchema = new Schema(
    {
        username: { type: String, unique: true, required: true, trimmed: true },

        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: function (email) { return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email) },
                message: msg => `${msg.value} is not a valid email`
            },
        },

        thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],

        friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],

    },

    {
        toJSON:{
            virtuals:true,
        },
        id:false,
    }

);

//Create a virtual property 'friedCount' that gets a usrs total number of friends
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

// initialize user model
const User = model('user', userSchema);

module.exports = User;