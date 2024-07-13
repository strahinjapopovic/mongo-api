const Router = require("express").Router();
const Thought = require("./thought-router");
const User = require("./user-router");

Router.use("/thoughts", Thought);
Router.use("/users", User);

module.exports = Router;
