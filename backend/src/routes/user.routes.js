import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { fetchAllUsers } from "../controllers/user.controller.js";

const router = Router();

router.get("/", protectRoute, fetchAllUsers);

export default router;
