import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import shopRouter from "./routes/shop.route.js";
import bookRouter from "./routes/book.route.js";
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
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/booking", bookRouter);

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
