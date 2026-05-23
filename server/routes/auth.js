import express from "express";
import { login, me, signup } from "../controllers/auth.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/me", authRequired, me);

export default router;