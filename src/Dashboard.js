// src/Dashboard.js
import React from "react";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "User" };

  return (
    <section className="py-5 text-center bg-light" style={{ minHeight: "100vh" }}>
      <div className="container">
        <h1 className="fw-bold text-primary mb-3">Welcome to Hadi LMS</h1>
        <h4 className="text-muted">Hello, {user.name} 👋</h4>
        <p className="mt-3">
          This is your personalized dashboard where you can access your courses and progress.
        </p>

        <button
          className="btn btn-danger mt-4"
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </section>
  );
};

export default Dashboard;
