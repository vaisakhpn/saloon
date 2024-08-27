import express from "express";
import {
  cancelBooking,
  createBooking,
  getBookings,
} from "../controllers/book.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createBooking);
router.get("/", verifyToken, getBookings);
router.delete("/:bookId", verifyToken, cancelBooking);

export default router;
