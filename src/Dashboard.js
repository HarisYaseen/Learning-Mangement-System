// src/Dashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="d-flex">
      {/* ================= Sidebar ================= */}
      <div
        className="sidebar text-white p-3"
        style={{
          width: "250px",
          backgroundColor: "#001f3f",
          minHeight: "100vh",
        }}
      >
        <h4 className="fw-bold mb-4 text-center text-warning">Hadi LMS</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a href="#overview" className="nav-link text-white">
              <i className="fas fa-home me-2"></i> Overview
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#courses" className="nav-link text-white">
              <i className="fas fa-book me-2"></i> Courses
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#assignments" className="nav-link text-white">
              <i className="fas fa-tasks me-2"></i> Assignments
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#grades" className="nav-link text-white">
              <i className="fas fa-chart-line me-2"></i> Grades
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#profile" className="nav-link text-white">
              <i className="fas fa-user me-2"></i> Profile
            </a>
          </li>
        </ul>
      </div>

      {/* ================= Main Content Area ================= */}
      <div className="flex-grow-1">
        {/* ===== Top Navbar ===== */}
        <nav
          className="navbar navbar-expand-lg"
          style={{
            backgroundColor: "#001f3f",
            color: "white",
            padding: "10px 20px",
          }}
        >
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0 text-light">Student Dashboard</h5>

            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {userData?.name || "User"}
              </button>

              {showDropdown && (
                <ul
                  className="dropdown-menu dropdown-menu-end show"
                  style={{
                    position: "absolute",
                    right: 0,
                    marginTop: "10px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <li className="dropdown-item fw-semibold text-center">
                    {userData?.name}
                  </li>
                  <li className="dropdown-item text-muted small text-center">
                    {userData?.email}
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="dropdown-item small">
                    Enrollment ID: <strong>STD123</strong>
                  </li>
                  <li className="dropdown-item small">
                    Course: <strong>Software Engineering</strong>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>

        {/* ===== Dashboard Content ===== */}
        <div className="container mt-4">
          <h3>Welcome, {userData?.name || "Student"} 👋</h3>
          <p className="text-muted">Here’s your personalized dashboard overview.</p>

          {/* ===== Empty Course Section (for now) ===== */}
          <section id="courses" className="mt-5">
            <h4 className="mb-3">Your Courses</h4>
            <p>No courses enrolled yet. Start learning soon!</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
