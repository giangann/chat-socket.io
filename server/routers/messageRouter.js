const { getUserMessages, saveUserMessages } = require("../controllers/messageController");

const route = require("express").Router();

route.get("/get-message", getUserMessages);
route.post("/save-message", saveUserMessages);

module.exports = route;
