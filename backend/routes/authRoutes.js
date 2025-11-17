// backend/routes/authRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ===============================
// ✅ Register Student (default role)
// ===============================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "student",
    });

    await newUser.save();

    res.status(201).json({ message: "Student registered successfully!" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({
      message: "Server error during registration",
      error: err.message,
    });
  }
});

// ===============================
// ✅ Register Admin (manual only)
// ===============================
router.post("/register-admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    res.status(201).json({ message: "Admin registered successfully!" });
  } catch (err) {
    console.error("Admin registration error:", err);
    res.status(500).json({
      message: "Server error during admin registration",
      error: err.message,
    });
  }
});

// ===============================
// ✅ Login with strict role enforcement
// ===============================
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Email, password, and role are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check role strictly
    if (user.role !== role) {
      return res.status(403).json({
        message: `Access denied: This user is a ${user.role}, not a ${role}`,
      });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      message: "Server error during login",
      error: err.message,
    });
  }
});

// ===============================
// ✅ Change Password
// ===============================
router.put("/change-password", async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({
        message: "Email, old password, and new password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Old password is incorrect" });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: "Password changed successfully!" });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({
      message: "Server error during password change",
      error: err.message,
    });
  }
});

export default router;
