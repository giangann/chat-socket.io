const Message = require("../models/message");

// save user message (require: from, to, text)
module.exports.saveUserMessages = async (message) => {
  const { from_user_id, to_user_id, text } = message;

  const newMessage = await Message.create({
    from: from_user_id,
    to: to_user_id,
    text,
  });

  return { status: true, newMessage: newMessage };
};

// get user message (require: 2 user id: from_user_id and to_user_id)
module.exports.getUserMessages = async (req, res, next) => {
  const { from_user_id, to_user_id } = req.query;

  const listMessages = await Message.find({
    from: from_user_id,
    to: to_user_id,
  }).exec();

  return res.status(200).send(JSON.stringify(listMessages));
};
