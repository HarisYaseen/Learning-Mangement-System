// src/Dashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    setUserData(user);

    if (!user._id) return;

    // Fetch courses enrolled by this user
    fetchEnrolledCourses(user._id);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchEnrolledCourses = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/enrollment/student/${userId}`
      );

      // Backend already returns only approved courses
      setCourses(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(
        "Error fetching enrolled courses:",
        error.response?.data || error.message
      );
      setCourses([]);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div
        className="flex-grow-1"
        style={{ marginLeft: "250px", minHeight: "100vh", backgroundColor: "#f9fafb" }}
      >
        {/* Top Navbar */}
        <nav
          className="navbar navbar-expand-lg shadow-sm"
          style={{ backgroundColor: "#001f3f", color: "white", padding: "10px 20px" }}
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
                  style={{ position: "absolute", right: 0, marginTop: "10px" }}
                >
                  <li className="dropdown-item fw-semibold text-center">{userData?.name}</li>
                  <li className="dropdown-item text-muted small text-center">{userData?.email}</li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>

        {/* Courses Section */}
        <div className="p-4">
          <h4 className="mb-3">My Courses</h4>
          {courses.length === 0 ? (
            <p>You are not enrolled in any courses yet.</p>
          ) : (
            <div className="row">
              {courses.map((course, index) => (
                <div key={course.id || index} className="col-md-4 mb-3">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{course.course}</h5>
                      <p className="card-text">Status: {course.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
