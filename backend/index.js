// backend/index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Import Routes
import authRoutes from "./routes/authRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded images publicly
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// ✅ Environment Variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ MongoDB Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/profile", profileRoutes);

// ✅ Root Endpoint
app.get("/", (req, res) => {
  res.send("🚀 LMS Backend running successfully...");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
