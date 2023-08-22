import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes";

const app = express();
dotenv.config();
app.use(express.json());

const { PORT, DB_URI } = process.env;
mongoose.connect(`${DB_URI}`).then(() => {
  console.log("database connection is establish");
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
