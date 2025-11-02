// src/LmsPortal.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LmsPortal() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (studentId && password) {
      alert(`Welcome ${studentId}! Redirecting to your dashboard...`);
      navigate("/dashboard"); // ✅ Redirect to dashboard (we’ll create it next)
    } else {
      alert("Please enter both Student ID and Password.");
    }
  };

  return (
    <section className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4 border-0"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <h2 className="text-center mb-4 text-orange fw-bold">Hadi LMS Portal</h2>
        <p className="text-center text-muted mb-4">
          Login to access your courses and learning dashboard.
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="studentId" className="form-label fw-semibold">
              Student ID or Email
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="studentId"
              placeholder="Enter your Student ID or Email"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-orange w-100 py-2 fw-semibold mt-2"
          >
            Login
          </button>
        </form>

        <p className="text-center text-muted mt-4 mb-0">
          Don’t have an account?{" "}
          <Link to="/register" className="text-orange fw-semibold text-decoration-none">
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
}
