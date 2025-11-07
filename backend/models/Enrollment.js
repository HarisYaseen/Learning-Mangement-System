// backend/models/Enrollment.js
import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional link to created user
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // ensure email is unique
    phone: { type: String, required: true },
    dob: { type: String, required: true },
    education: { type: String, required: true },
    course: { type: String, required: true },
    motivation: { type: String, required: true },
    experience: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    tempPassword: { type: String, default: null }, // store temporary password
  },
  { timestamps: true }
);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;
