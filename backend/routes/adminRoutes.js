import express from "express";
import Enrollment from "../models/Enrollments.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

// ✅ Get all enrollments
router.get("/enrollments", async (req, res) => {
  try {
    const enrollments = await enrollments.find().sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch enrollments" });
  }
});

// ✅ Approve enrollment (automatically creates user & sends email)
router.put("/approve/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    if (enrollment.status === "approved")
      return res.status(400).json({ message: "Enrollment already approved" });

    // 1️⃣ Generate temporary password
    const tempPassword = Math.random().toString(36).slice(-8); // 8-char random password
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // 2️⃣ Create user account using email from enrollment
    const newUser = new User({
      name: `${enrollment.firstName} ${enrollment.lastName}`,
      email: enrollment.email, // use enrollment email
      password: hashedPassword,
      role: "student",
    });
    await newUser.save();

    // 3️⃣ Update enrollment status and link userId
    enrollment.status = "approved";
    enrollment.userId = newUser._id;
    await enrollment.save();

    // 4️⃣ Send email with login credentials
    await sendEmail(
      enrollment.email,
      "Enrollment Approved ✅",
      `Hello ${enrollment.firstName},\n\n` +
      `Your enrollment has been approved!\n\n` +
      `Here are your login credentials for Hadi LMS:\n` +
      `Email: ${enrollment.email}\n` +
      `Password: ${tempPassword}\n\n` +
      `Please log in and change your password immediately.`
    );

    res.json({ message: "Enrollment approved, account created, and email sent.", enrollment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to approve enrollment" });
  }
});

// ✅ Reject enrollment (send email)
router.put("/reject/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    enrollment.status = "rejected";
    await enrollment.save();

    await sendEmail(
      enrollment.email,
      "Enrollment Rejected ❌",
      `Hello ${enrollment.firstName},\n\n` +
      `Unfortunately, your enrollment application has been rejected.\n` +
      `Please contact support for more details.`
    );

    res.json({ message: "Enrollment rejected and email sent.", enrollment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to reject enrollment" });
  }
});

export default router;
