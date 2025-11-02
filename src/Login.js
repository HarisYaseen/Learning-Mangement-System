import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ POST request to backend
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);

      setMessage("✅ Login successful! Redirecting to dashboard...");
      localStorage.setItem("token", res.data.token);

      // redirect after login
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.error("Login error:", err);
      setMessage(err.response?.data?.message || "❌ Invalid credentials!");
    }
  };

  return (
    <section
      className="py-5 bg-light d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card p-4 shadow-lg border-0" style={{ width: "400px" }}>
        <h3 className="text-center mb-4 text-orange fw-bold">Login to Hadi LMS</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control form-control-lg"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control form-control-lg"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-orange w-100 py-2 fw-semibold mt-2">
            Login
          </button>
        </form>

        {message && <p className="text-center mt-3 text-muted small">{message}</p>}

        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <a href="/register" className="text-orange fw-semibold">
            Register here
          </a>
        </p>
      </div>
    </section>
  );
};

export default Login;
