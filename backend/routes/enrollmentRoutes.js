// backend/routes/enrollmentRoutes.js
import express from "express";
import Enrollment from "../models/Enrollment.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// -----------------------------
// POST - Submit new enrollment
// -----------------------------
router.post("/", async (req, res) => {
  try {
    const enrollment = new Enrollment({
      ...req.body,
      status: "pending",
    });
    await enrollment.save();
    res.status(201).json({ message: "Enrollment saved successfully" });
  } catch (error) {
    console.error("Error saving enrollment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------
// GET - Fetch all enrollments (admin)
// -----------------------------
router.get("/", async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort({ createdAt: -1 });
    res.status(200).json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch enrollments" });
  }
});

// -----------------------------
// PUT - Reject enrollment
// -----------------------------
router.put("/reject/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    enrollment.status = "rejected";
    await enrollment.save();

    // Optionally send email manually via Gmail
    res.json({ message: "Enrollment rejected. Admin can notify student via email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to reject enrollment" });
  }
});

// -----------------------------
// GET TEMP PASSWORD (for Gmail prefilled email)
// -----------------------------
router.put("/get-temp-password/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    let user = await User.findOne({ email: enrollment.email });
    let tempPassword = enrollment.tempPassword;

    // If user does not exist, generate temp password if needed
    if (!user) {
      if (!tempPassword) {
        tempPassword = Math.random().toString(36).slice(-8);
        enrollment.tempPassword = tempPassword;
        await enrollment.save();
      }

      const hashed = await bcrypt.hash(tempPassword, 10);

      user = new User({
        name: `${enrollment.firstName} ${enrollment.lastName}`,
        email: enrollment.email,
        password: hashed,
        role: "student",
      });

      await user.save();
    }

    res.json({ tempPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate temp password" });
  }
});

// -----------------------------
// PUT - Mark enrollment as approved
// -----------------------------
router.put("/mark-approved/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    enrollment.status = "approved";
    await enrollment.save();

    res.json({ message: "Enrollment marked as approved." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update enrollment status." });
  }
});

export default router;
