import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({ message: "api is working" });
};

// 
export const updateUser = async (req, res, next) => {
  // console.log("Update User Called", req.body);
  // If the ID received after verification is not same as the param id then don't allow user to update.
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user!"));
  }

  if (req.body.password) {
    // If the updated password is smaller than 6 characters then also do not allow
    if (req.body.password.length < 6) {
      return next(
        errorHandler(400, "Password must be at least 6 characters long!")
      );
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 7);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username > 20) {
      return next(
        errorHandler(400, "Username can only be between 7 and 20 characters.")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username can't have spaces."));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be all lowercase."));
    }
    if (!req.body.username.match(/^[a-z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only have letters and numbers.")
      );
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      // console.log("Updated User", rest);
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  }
};

// Function responsible for deleting an user account
export const deleteUser = async (req, res, next) => {

  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user!"))
  }

  try {
    // console.log(req.user); // RIP
    const deletedUser = await User.findByIdAndDelete(req.user.id);
    
    if (deleteUser) {
      res.status(200).json({success : 'true', message: `User successfully deleted.`})
    } else {
      res.status(404).json({success : 'false', message: `User Not Found.`})
    }

  } catch (error) {
    console.log("Error occurred baby!")
    next(error);
  }
}