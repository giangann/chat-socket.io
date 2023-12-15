const route = require("express").Router();
const { getUser, createUser } = require("../controllers/userController");
const { checkUserByToken } = require("../middlewares/userMiddleware");

route.post("/", checkUserByToken);
route.post("/get-user", getUser);
route.post("/new-user", createUser);

module.exports = route;
