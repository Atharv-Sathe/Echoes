import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

// routes
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

// console.log(process.env.DATABASE_CONNECTION_URL)


mongoose
.connect(process.env.DATABASE_CONNECTION_URL)
.then(() => {
    console.log("connection established");
})
.catch((res) => {
    console.log("connection failed:" + res);
});

const app = express();

app.use(express.json());

app.listen(5000, () => {
  console.log("Server Live at 5000");
});

app.use("/api/user", userRoutes);

app.use("/api/auth", authRoutes);