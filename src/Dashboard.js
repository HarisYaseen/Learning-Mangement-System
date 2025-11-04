// src/Dashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom"; // 👈 Added Outlet
import Sidebar from "./Sidebar";

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
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
      <Sidebar />

      <div
        className="flex-grow-1"
        style={{
          marginLeft: "250px",
          minHeight: "100vh",
          backgroundColor: "#f9fafb",
        }}
      >
        {/* ===== Top Navbar ===== */}
        <nav
          className="navbar navbar-expand-lg shadow-sm"
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

        {/* ===== Where nested routes (like Calendar) render ===== */}
        <div className="p-4">
          <Outlet /> {/* 👈 Calendar loads here */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
