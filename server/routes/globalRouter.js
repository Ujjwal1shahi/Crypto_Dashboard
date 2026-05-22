import express from "express";
import { getGlobal } from "../controllers/globalController.js";
import { authRequired } from "../middleware/auth.js";


const router = express.Router();

router.get("/", authRequired, getGlobal);

export default router;