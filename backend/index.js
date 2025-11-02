// ...existing code...
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// resolve directory of this file (works with ESM)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// load .env that sits next to backend/index.js
const dotenvResult = dotenv.config({ path: path.resolve(__dirname, ".env") });
console.log("dotenv loaded from:", path.resolve(__dirname, ".env"), "parsed:", dotenvResult.parsed ? "yes" : "no", dotenvResult.error ? dotenvResult.error.message : "");

// ...existing code...
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not set. Check backend/.env");
  process.exit(1);
}

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Hadi LMS Backend is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
// ...existing code...