import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
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

app.listen(5000, () => {
  console.log("Server Live at 5000");
});
