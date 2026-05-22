import express from "express";
import { getMarket } from "../controllers/marketController.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authRequired, getMarket);

export default router;