import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addTimeSlots,
  createShop,
  deleteShop,
  deleteTimeSlots,
  getShop,
  updateShop,
  updateTimeSlots,
} from "../controllers/shop.controller.js";

const router = express.Router();

router.post("/", verifyToken, createShop);
router.post("/update/:shopId", verifyToken, updateShop);
router.delete("/delete/:shopId", verifyToken, deleteShop);
router.get("/get/:shopId", verifyToken, getShop);
router.post("/timeslots/:shopId", verifyToken, addTimeSlots);
router.post("/update/timeslots/:shopId", verifyToken, updateTimeSlots);
router.delete("/delete/timeslots/:shopId", verifyToken, deleteTimeSlots);

export default router;
