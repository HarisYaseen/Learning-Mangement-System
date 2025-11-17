// backend/routes/profileRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import User from "../models/User.js";

const router = express.Router();

// ======================
// Multer Configuration
// ======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder for saving images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1730891231234.png
  },
});

const upload = multer({ storage });

// ======================
// Update Profile (Image + Name)
// ======================
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.file) {
      user.image = req.file.filename; // store just the filename in DB
    }

    if (req.body.name) {
      user.name = req.body.name;
    }

    await user.save();

    // ✅ Send full image URL to frontend
    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        image: user.image
          ? `http://localhost:5000/uploads/${user.image}`
          : null,
      },
    });
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
