import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  // Getting the access token
  const token = req.cookies.access_token;
  if (!token) {
    console.log("No Token Found!") // RIP
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log("Could Not Verify Token!") // RIP
      return next(errorHandler(401, "Unauthorized"));
    }
    // If token is successfully verified then adding the user data received from the cookie to request body
    req.user = user;
    next();
  });
};
