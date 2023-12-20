const route = require("express").Router();
const {
  createUser,
  login,
  getAllUserEscapeMe,
} = require("../controllers/userController");
const { checkUserByToken } = require("../middlewares/userMiddleware");

route.post("/", checkUserByToken);
route.get("/get-user-not-me", getAllUserEscapeMe);
route.post("/new-user", createUser);
route.post("/login", login);

module.exports = route;
