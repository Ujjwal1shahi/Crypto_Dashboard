import express from "express";
import { getChart } from "../controllers/chartController.js";
import { authRequired } from "../middleware/auth.js";


const router = express.Router();

router.get("/:coinId", authRequired, getChart);

export default router;