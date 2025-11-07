import express from "express";
import Enrollment from "../models/Enrollment.js";

const router = express.Router();

// ✅ Get all enrollments
router.get("/enrollments", async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch enrollments" });
  }
});

// ✅ Approve enrollment
router.put("/approve/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: "Failed to approve enrollment" });
  }
});

// ✅ Reject enrollment
router.put("/reject/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: "Failed to reject enrollment" });
  }
});

export default router;
