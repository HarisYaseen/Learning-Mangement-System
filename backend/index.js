// index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"; // ✅ Auth routes (register/login)
import path from "path";
import { fileURLToPath } from "url";

// ✅ Resolve directory for .env file (important when using ES Modules)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, ".env") });

// ✅ Initialize Express app
const app = express();

// ✅ Middlewares
app.use(cors()); // Allow frontend (React) to communicate with backend
app.use(express.json()); // Parse incoming JSON requests

// ✅ Environment Variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// ✅ API Routes
app.use("/api/auth", userRoutes); // 👈 All routes from userRoutes.js will start with /api/auth

// Example: 
// POST http://localhost:5000/api/auth/register
// POST http://localhost:5000/api/auth/login

// ✅ Default Route for testing server
app.get("/", (req, res) => {
  res.send("🚀 Hadi LMS Backend is running successfully...");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
