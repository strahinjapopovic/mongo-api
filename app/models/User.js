const mongoose = require("mongoose");

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email address required'],
        validate: {
            validator: (e) => {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(e);
            },
            message: (props) => {
                `${props.value} is not a valid email address!`;
            },
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    thoughts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "thought",
        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        }
    ],
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});
userSchema.methods.formatDateTime = function() {
    const date = new Date();
    return date.toLocaleDateString() + ", " + date.toLocaleTimeString('en-US') + `, GMT+` + date.getTimezoneOffset()/-60;
};
userSchema.virtual("friendCount").get( function() {
    return this.friends.length;
});
const User = mongoose.model("users", userSchema);
module.exports = User;