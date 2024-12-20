import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required."));
  }

  // In ES6 if the key and value are same you can just write username instead of username: username
  const hashedPass = bcryptjs.hashSync(password, 7);

  const newUser = new User({
    username,
    email,
    password: hashedPass,
  });

  try {
    const success = await newUser.save();
    res.json({ message: "Success", success });
  } catch (error) {
    next(error);
  }
};
