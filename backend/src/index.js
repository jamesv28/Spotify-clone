import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware, clerkClient } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import fs from "fs";
import { createServer } from "http";
import cron from "node-cron";

import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js";
import songRoutes from "./routes/song.routes.js";
import albumRoutes from "./routes/album.routes.js";
import statisticRoutes from "./routes/statistics.routes.js";

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

const httpServer = createServer(app);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json()); // to parse req.body
app.use(clerkMiddleware()); // this will add auth to req obj => req.auth
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB  max file size
    },
  })
);

// cron jobs
const tempDir = path.join(process.cwd(), "tmp");

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statisticRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

// error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

httpServer.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});
