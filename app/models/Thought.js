const mongoose = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new mongoose.Schema({
    thought_text: {
        type: String,
        required: [true, "Description text required"],
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
        ref: "user",
    },
    reactions: [reactionSchema],
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});
thoughtSchema.methods.formatDateTime = function() {
    const date = new Date();
    return date.toLocaleDateString() + ", " + date.toLocaleTimeString('en-US') + `, GMT+` + date.getTimezoneOffset()/-60;
};
thoughtSchema.virtual("reactionCount").get( function() {
    return this.reactions.length;
});
const Thought = mongoose.model("thoughts", thoughtSchema);
module.exports = Thought;