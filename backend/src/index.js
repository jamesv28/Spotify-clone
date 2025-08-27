import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/admin.routes.js";
import songRoutes from "./routes/song.routes.js";
import albumRoutes from "./routes/album.routes.js";
import statisticRoutes from "./routes/statistics.routes.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/statistics", statisticRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
