import express from "express";
import { getTrending } from "../controllers/trendingController.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authRequired, getTrending);

export default router;