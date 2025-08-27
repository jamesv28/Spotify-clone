import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("admin correctly sent with get request");
});

export default router;
