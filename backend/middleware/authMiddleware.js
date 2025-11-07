// backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ Verify JWT token
export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

// ✅ Verify admin role
export const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while verifying admin" });
  }
};
