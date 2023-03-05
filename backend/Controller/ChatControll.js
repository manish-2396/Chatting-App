const { Router } = require("express");
const { middleware } = require("../Middleware/middleware");
const { ChatModel } = require("../Model/ChatMogel");

const ChatController = Router();

ChatController.post("/addChat", async (req, res) => {
  try {
    const { from, to, Massage } = req.body;
    const data = new ChatModel({
      Message: {
        text: Massage,
      },
      users: [from, to],
      sender: from,
    });

    await data.save();

    res.status(200).send({ Massage: "send" });
  } catch (err) {}
});

ChatController.post("/getChat", middleware, async (req, res) => {
  try {
    const { from, to } = req.body;
    const data = await ChatModel.find({
      users: { $all: [from, to] },
    }).sort({ updatedAt: 1 });

    res.status(200).send({ Massage: "Ok", data: data });
  } catch (err) {}
});

module.exports = {
  ChatController,
};
