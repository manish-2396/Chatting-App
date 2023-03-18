const express = require("express");
const http = require("http");
const cors = require("cors");
const { connect } = require("./DataBase/db");
const { UserController } = require("./Controller/UserController");
const { ChatController } = require("./Controller/ChatControll");
const socket = require("socket.io");
const { Server } = require("socket.io");
const { middleware } = require("./Middleware/middleware");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();
const HttpServer = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", UserController);

app.use(middleware);

app.use("/chat", ChatController);

HttpServer.listen(PORT, async () => {
  try {
    await connect;
    console.log(`Server Start With http://localhost:${PORT}/`);
  } catch (err) {
    console.log(err);
  }
});

const io = new Server(HttpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

global.onlineUser = new Map();

io.on("connection", (socket) => {
  
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    console.log(userId)
    onlineUser.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUser.get(data.to);
    console.log(global)
    console.log(data ,sendUserSocket)
    if (sendUserSocket) {
      console.log(data)
      socket.to(sendUserSocket).emit("msg-receieve", data);
    }
  });
});
