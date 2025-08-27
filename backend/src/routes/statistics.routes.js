import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("statistics correctly sent with get request");
});

export default router;
