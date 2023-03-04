const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
  {
    Message: {
      text: {
        type: "String",
        required: true,
      },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ChatModel = mongoose.model("chat", ChatSchema);

module.exports = {
  ChatModel,
};
