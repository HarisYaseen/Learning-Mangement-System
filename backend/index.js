// index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"; // ✅ import the routes
import path from "path";
import { fileURLToPath } from "url";

// ✅ resolve directory for .env file
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Environment Variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Routes
app.use("/api/auth", userRoutes); // 👈 all auth routes start with /api/auth

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("🚀 Hadi LMS Backend is running...");
});

// ✅ Server Listen
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
