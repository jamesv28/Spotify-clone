import { Router } from "express";
import {
  checkAdmin,
  createSong,
  deleteSong,
  createAlbums,
  deleteAlbums,
} from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();
router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.post("/albums", createAlbums);
router.delete("/albums", deleteAlbums);

export default router;
