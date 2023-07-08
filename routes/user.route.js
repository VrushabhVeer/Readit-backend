const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");
const userRouter = Router();
require("dotenv").config();

const key = process.env.SECRET_KEY;

// sign up
userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const result = await UserModel.findOne({ email });
  if (result) {
    res.send({ msg: "Email already exists" });
  } else {
    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        res.send({ msg: "Something went wrong, please try again" });
      }
      const new_user = new UserModel({
        name: name,
        email: email,
        password: hash,
      });
      await new_user.save();
      res.send({ msg: "Signup successful" });
    });
  }
});


// login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  const userId = user._id;
  const userName = user.name;
  const hash = user.password;

  bcrypt.compare(password, hash, async function (err, result) {
    if (err) {
      res.send({ msg: "Something went wrong, please try again" });
    }
    if (result) {
      const token = jwt.sign({ userId, userName }, key);
      res.send({ msg: "Login sussessful", token: token, userName });
    } else {
      res.send({ msg: "Login failed" });
    }
  });
});

module.exports = {
  userRouter,
};
