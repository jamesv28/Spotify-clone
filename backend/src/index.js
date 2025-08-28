import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/admin.routes.js";
import songRoutes from "./routes/song.routes.js";
import albumRoutes from "./routes/album.routes.js";
import statisticRoutes from "./routes/statistics.routes.js";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(clerkMiddleware());
const PORT = process.env.PORT;

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/statistics", statisticRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
