import express from "express";
import {
  signup,
  signin,
  googleSignin,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/google", googleSignin);

export default router;
