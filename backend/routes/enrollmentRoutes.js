import express from "express";
import Enrollment from "../models/Enrollment.js";

const router = express.Router();

// 📝 POST - Submit new enrollment
router.post("/", async (req, res) => {
  try {
    const enrollment = new Enrollment(req.body);
    await enrollment.save();
    res.status(201).json({ message: "Enrollment saved successfully" });
  } catch (error) {
    console.error("Error saving enrollment:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// 📄 GET - Fetch all enrollments (for admin)
router.get("/", async (req, res) => {
  try {
    const enrollments = await Enrollment.find();
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enrollments" });
  }
});

export default router;
