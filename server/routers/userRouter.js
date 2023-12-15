const route = require("express").Router();
const { getUser, createUser, login } = require("../controllers/userController");
const { checkUserByToken } = require("../middlewares/userMiddleware");

route.post("/", checkUserByToken);
route.post("/get-user", getUser);
route.post("/new-user", createUser);
route.post("/login", login);

module.exports = route;
