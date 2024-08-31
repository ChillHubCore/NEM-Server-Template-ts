import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { isAuth } from "../functions/isAuth";
import { generateToken } from "../functions/GenerateToken";

const userRouter = express.Router();

userRouter.post("/signin", async (req, res) => {
  /**
   * Represents a user object.
   * @typedef {Object} User
   * @property {string} email - The email of the user.
   * @property {string} name - The name of the user.
   * @property {string} password - The password of the user.
   * use this endpoint to login a user and at the end send them back a auto generated hash token which last in a short period to keep them logged in
   */
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.status(201).send({
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: "Email or Password is Wrong!" });
});

userRouter.post("/signup", async (req, res) => {
  /**
   * Represents a new user.
   * @typedef {Object} User
   * @property {string} name - The name of the user.
   * @property {string} email - The email of the user.
   * @property {string} password - The hashed password of the user.
   * sign a new user into database , store the password in a hash format and return a auto generated hash token which last in a short period to keep them logged in
   */
  const newUser = new User({
    username: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
  });
  const user = await newUser.save();
  res.status(201).send({
    name: user.username,
    token: generateToken(user),
  });
});

userRouter.delete("/:id", isAuth, async (req, res) => {
  /**
   * Find a user by ID.
   * @param {string} req.params.id - The ID of the user.
   * @returns {Promise<Object>} - The user object.
   * delete a none admin user from database if it exists.
   */
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.email === process.env.AdminEmail) {
      res.status(400).send({ message: "Can Not Delete Admin User" });
      return;
    }
    await user.deleteOne({ _id: user._id });
    res.send({ message: "User Deleted" });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

export default userRouter;
