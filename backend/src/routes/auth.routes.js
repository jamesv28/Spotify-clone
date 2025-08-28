import { Router } from "express";
import { authCallback } from "../controllers/auth.controller";

const router = Router();

router.get("/", (req, res) => {
  res.send("auth correctly sent with get request");
});

router.post("/callback", authCallback);
export default router;
