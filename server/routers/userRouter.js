const route = require("express").Router();
const { getUser, createUser } = require("../controllers/userController");

route.get("/get-user", getUser);
route.post("/new-user", createUser);

module.exports = route;
