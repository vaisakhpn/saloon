import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { handleError } from "./middleware/error.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//routes

//default
app.get("/", (req, res) => {
  res.send("API Working");
});

//error handler
app.use(handleError);

//db connection
connectDB();

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
