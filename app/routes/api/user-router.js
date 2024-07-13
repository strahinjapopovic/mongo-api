const Router = require("express").Router();
const { getAllUsers, getOneUser, addUser, updateUser, deleteUser, addFriend, deleteFriend } = require("../../controllers/user-controller");

Router.route("/").get(getAllUsers).post(addUser);
Router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);
Router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = Router;