import React, { useState } from "react";

export default function LmsPortal() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (studentId && password) {
      alert(`Welcome ${studentId}! Redirecting to your dashboard...`);
      // In real case, you could redirect like:
      // navigate("/dashboard");
    } else {
      alert("Please enter both Student ID and Password.");
    }
  };

  return (
    <section className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <h2 className="text-center mb-4 text-primary fw-bold">Hadi LMS Portal</h2>
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
              className="form-control"
              id="studentId"
              placeholder="Enter your Student ID or Email"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
            Login
          </button>
        </form>

        <p className="text-center text-muted mt-4 mb-0">
          Don’t have an account? <a href="#" className="text-primary text-decoration-none">Register</a>
        </p>
      </div>
    </section>
  );
}
