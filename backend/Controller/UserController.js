const { Router } = require("express");
const { UserModel } = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const UserController = Router();

UserController.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      res.status(200).send({ Massage: "User already exists" });
    } else {
      bcrypt.hash(password, 5, async function (err, hash) {
        const userdata = new UserModel({
          username,
          email,
          password: hash,
        });
        await userdata.save();

        res.status(200).send({ Massage: "Signup succesfully created." });
      });
    }
  } catch (err) {
    res.status(404).send({ Massage: "Something went wrong" });
  }
});

UserController.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      const hash = user.password;
      bcrypt.compare(password, hash, function (err, result) {
        if (result) {
          var token = jwt.sign({ userId: user._id }, process.env.Code, {
            expiresIn: "6h",
          });

          res.status(200).send({
            Massage: "Ok",
            isAuth: true,
            username: user.username,
            email,
            token,
            _id: user._id,
          });
        } else {
          res
            .status(501)
            .send({ Massage: "Something went wrong", isAuth: false });
        }
      });
    } else {
      res.status(200).send({ Massage: "Something went wrong", isAuth: false });
    }
  } catch (err) {
    res.status(401).send({ Massage: "Something went wrong1" });
  }
});

UserController.get("/getAllUsers/:id", async (req, res) => {
  try {
    const data = await UserModel.find({ _id: { $ne: req.params.id } }).select([
      "username",
      "email",
      "_id",
    ]);

    res.status(200).send({ Massage: "OK", data: data });
  } catch (err) {
    res.status(404).send({ Massage: "something went worng" });
  }
});

module.exports = {
  UserController,
};
