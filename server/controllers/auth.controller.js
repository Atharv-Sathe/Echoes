import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
    return next(errorHandler(400, "All fields are required."));
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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (
    // !username ||
    !email ||
    !password ||
    // username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required."));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, "Wrong Password"));
    }

    const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const googleSignin = async (req, res, next) => {
  const { email, name, googlePhotoURL } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      const { password: pass, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const sysGenPass = Math.random().toString(36).slice(-8) + email;
      const sysGenUserName =
        name.toLowerCase().split(" ").join("") +
        Math.random().toString(9).slice(-4);
      const hashedPass = bcryptjs.hashSync(sysGenPass, 7);

      const newUser = new User({
        username: sysGenUserName,
        email,
        password: hashedPass,
        profilePicture: googlePhotoURL,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      const { password: pass, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
