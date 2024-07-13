const Router = require("express").Router();
const { getAllThoughts, getOneThought, addThought, updateThought, deleteThought, addReaction, deleteReaction } = require("../../controllers/thought-controller");

Router.route("/").get(getAllThoughts).post(addThought);
Router.route("/:thoughtId").get(getOneThought).put(updateThought).delete(deleteThought);
Router.route("/:thoughtId/reactions").post(addReaction);
Router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = Router;