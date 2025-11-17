import express from "express";
import mongoose from "mongoose";
import Enrollment from "../models/Enrollments.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

/* ------------------- POST - Submit new enrollment ------------------- */
router.post("/", async (req, res) => {
  try {
    console.log("📥 Enrollment data received:", req.body);

    const enrollment = new Enrollment({
      ...req.body,
      status: "pending",
    });

    await enrollment.save();
    res.status(201).json({ message: "Enrollment saved successfully" });
  } catch (error) {
    console.error("❌ Error saving enrollment:", error);
    res.status(500).json({ message: error.message });
  }
});

/* ------------------- GET - Fetch all enrollments (admin) ------------------- */
router.get("/", async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort({ createdAt: -1 });
    console.log("✅ Enrollments fetched:", enrollments.length);
    res.status(200).json(enrollments);
  } catch (error) {
    console.error("❌ Failed to fetch enrollments:", error);
    res.status(500).json({ message: "Failed to fetch enrollments", error: error.message });
  }
});

/* ------------------- GET - Fetch approved enrollments for a student ------------------- */
router.get("/student/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) return res.status(400).json({ message: "User ID missing" });
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ message: "Invalid user ID format" });

    const enrollments = await Enrollment.find({
      userId: new mongoose.Types.ObjectId(userId),
      status: "approved",
    }).sort({ createdAt: -1 });

    if (!enrollments || enrollments.length === 0) {
      return res.status(404).json({ message: "No approved courses found for this student" });
    }

    const courses = enrollments.map((enroll) => ({
      id: enroll._id,
      course: enroll.course,
      status: enroll.status,
    }));

    res.status(200).json(courses);
  } catch (error) {
    console.error("❌ Error fetching student courses:", error);
    res.status(500).json({ message: "Failed to fetch student courses" });
  }
});

/* ------------------- PUT - Reject enrollment ------------------- */
router.put("/reject/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    enrollment.status = "rejected";
    await enrollment.save();

    res.json({ message: "Enrollment rejected. Admin can notify student via email." });
  } catch (error) {
    console.error("❌ Failed to reject enrollment:", error);
    res.status(500).json({ message: "Failed to reject enrollment" });
  }
});

/* ------------------- PUT - Generate or get temporary password ------------------- */
router.put("/get-temp-password/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    let user = await User.findOne({ email: enrollment.email });
    let tempPassword = enrollment.tempPassword;

    if (!user && !tempPassword) {
      // Generate temp password only if user does not exist
      tempPassword = Math.random().toString(36).slice(-8);
      enrollment.tempPassword = tempPassword;
      await enrollment.save();
    }

    res.json({ tempPassword });
  } catch (error) {
    console.error("❌ Failed to generate temp password:", error);
    res.status(500).json({ message: "Failed to generate temp password" });
  }
});

/* ------------------- PUT - Mark enrollment as approved ------------------- */
router.put("/mark-approved/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    enrollment.status = "approved";

    // Check if a User already exists for this email
    let user = await User.findOne({ email: enrollment.email });

    if (!user) {
      // Only create new user if it doesn't exist
      const password = enrollment.tempPassword || Math.random().toString(36).slice(-8);
      const hashed = await bcrypt.hash(password, 10);

      user = new User({
        name: `${enrollment.firstName} ${enrollment.lastName}`,
        email: enrollment.email,
        password: hashed,
        role: "student",
      });

      await user.save();
    }

    // Link enrollment to existing or new user
    enrollment.userId = user._id;
    await enrollment.save();

    res.json({
      message: "Enrollment marked as approved and linked to user.",
      userId: user._id,
    });
  } catch (error) {
    console.error("❌ Failed to update enrollment status:", error);
    res.status(500).json({ message: "Failed to update enrollment status.", error: error.message });
  }
});

export default router;
