import express from "express";
import { signIn, signOut, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signIn);
router.post("/signout", signOut);

export default router;
