import { Router } from "express";
import { getAllStatistics } from "../controllers/statistics.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllStatistics);

export default router;
