const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = {
    async getAllUsers (req, res, next) {
        await User.find({}).then( (disUsers) => {
            res.status(200).json(disUsers);
        })
        .catch( (error) => {
            return next(error);
        });
    },
    async getOneUser (req, res, next) {
        await User.findById({ _id: req.params.userId }).then( (disUser) => {
            res.status(200).json(disUser);
        })
        .catch( (error) => {
            return next(error);
        });
    },
    async addUser (req, res, next) {
        await User.create({ username: req.body.username, email: req.body.email, }).then( (createUser) => {
            res.status(200).json(createUser);
        })
        .catch( (error) => {
            return next(error);
        });
    },
    async deleteUser (req, res, next) {
        await User.findOneAndDelete({ _id: req.params.userId }).then( async (deleteUser) => {
            console.log(deleteUser);
            res.status(200).json(deleteUser);
            await Thought.deleteMany({ username: deleteUser.username })
            .then( (delAssociatedThoughts) => {
                console.log(delAssociatedThoughts);
            })
            .catch( (error) => {
                return next(error);
            });
        })
        .catch( (error) => {
            return next(error);
        });
    },
    async updateUser (req, res, next) {
        await User.findOneAndUpdate({ _id: req.params.userId }, { $set: { email: req.body.email, updatedAt: new Date() }})
        .then( (putUser) => {
            res.status(200).json(putUser);
        })
        .catch( (error) => {
            return next(error);
        });
    },
    async addFriend (req, res, next) {
        await User.findOneAndUpdate({ _id: req.params.userId }, { $push: { friends: [{ _id: req.params.friendId }]}, $set: { updatedAt: new Date() }})
        .then( (updatedUserFriends) => {
            res.status(200).json(updatedUserFriends);
        }).catch( (error) => {
            return next(error);
        });
    },
    async deleteFriend (req, res, next) {
        await User.updateOne({ _id: req.params.userId }, { $pullAll: { friends: [{ _id: req.params.friendId }]}, $set: { updatedAt: new Date() }})
        .then( (delUserFriend) => {
            res.status(200).json(delUserFriend);
        })
        .catch( (error) => {
            return next(error);
        });
    }
}