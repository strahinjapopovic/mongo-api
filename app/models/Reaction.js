const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    /*reaction_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    }*/
    reaction_body: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
        ref: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});
module.exports = reactionSchema;