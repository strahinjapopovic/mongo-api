const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = {
    async getAllThoughts(req, res, next) {
        await Thought.find({}).then( (disThoughts) => {
            res.status(200).json(disThoughts);
        })
        .catch( (error) => {
            return next(error);
        });
    },
    async getOneThought(req, res, next) {
        await Thought.findById({ _id: req.params.thoughtId }).then( (disThought) => {
            res.status(200).json(disThought);
        })
        .catch( (error) => {
            return next(error);
        });
    },
    async addThought(req, res, next) {
        await Thought.create({ thought_text: req.body.thought_text, username: req.body.username, }).then( async (createThought) => {
            console.log(createThought);
            res.status(200).json(createThought);
            await User.findOneAndUpdate({ username: req.body.username }, { $push: { thoughts: [{ _id: createThought._id }]}, $set: { updatedAt: new Date() }})
            .then( (updatedUserThought) => {
                console.log(`\nFields thoughts:[] at User model updated for\nusername: ` + updatedUserThought.username + `\nthoughts: [ `+ updatedUserThought._id + ` ]`);
                console.log(updatedUserThought);
            })
            .catch( (error) => {
                return next(error);
            });
        })
        .catch( (error) => {
            return next(error);
        });
    },
    async deleteThought(req, res, next) {
        await Thought.findOneAndDelete({ _id: req.params.thoughtId }).then( (deleteThought) => {
            res.status(200).json(deleteThought);
        })
        .catch( (error) => {
            return next(error);
        });
    },
    async updateThought(req, res, next) {
        await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: { thought_text: req.body.thought_text, updatedAt: new Date() }}).then( (putThought) => {
            res.status(200).json(putThought);
        })
        .catch ( (error) => {
            return next(error);
        });
    },
    async addReaction (req, res, next) {
        await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: [ { reaction_body: req.body.reaction_body, username: req.body.username, }, ]}})
        .then( (updatedThoughtReaction) => {
            console.log(updatedThoughtReaction)
            res.status(200).json(updatedThoughtReaction);
        })
        .catch( (error) => {
            return next(error);
        });
    },
    async deleteReaction (req, res, next) {
        await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { _id: req.params.reactionId }}}, { safe: true, multi: false })
        .then( (delThoughtReaction) => {
            console.log(delThoughtReaction);
            res.status(200).json(delThoughtReaction);
        })
        .catch( (error) => {
            return next(error);
        });
    }
}