import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Password change modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Toast
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    setUserData(user);

    if (!user._id) {
      setError("User ID missing from local storage");
      return;
    }

    fetchUserProfile(user._id); // ✅ Load profile image & name
    fetchEnrolledCourses(user._id);
  }, [navigate]);

  // ==========================
  // Fetch latest user profile
  // ==========================
  const fetchUserProfile = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/auth/user/${userId}`);
      if (res.data) {
        setUserData(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  // ==========================
  // Fetch Enrolled Courses
  // ==========================
  const fetchEnrolledCourses = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/enrollments/student/${userId}`
      );
      setCourses(res.data || []);
    } catch (err) {
      console.error("❌ Error fetching courses:", err);
      setError("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Upload profile image
  // ==========================
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/profile/update/${userData._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const updatedUser = res.data.user;
      setUserData(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setToast({
        show: true,
        message: "Profile image updated successfully!",
        type: "success",
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      setToast({ show: true, message: "Failed to update profile image", type: "danger" });
    }
  };

  // ==========================
  // Change password
  // ==========================
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      setToast({ show: true, message: "All fields required", type: "danger" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setToast({ show: true, message: "Passwords do not match", type: "danger" });
      return;
    }

    try {
      const res = await axios.put("http://localhost:5000/api/auth/change-password", {
        email: userData.email,
        oldPassword,
        newPassword,
      });

      setToast({ show: true, message: res.data.message, type: "success" });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordModal(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setToast({
        show: true,
        message: err.response?.data?.message || "Failed to change password",
        type: "danger",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1" style={{ marginLeft: "250px", backgroundColor: "#f8f9fa" }}>
        {/* Navbar */}
        <nav
          className="navbar navbar-expand-lg shadow-sm"
          style={{ backgroundColor: "#001f3f", color: "white", padding: "10px 20px" }}
        >
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0 text-light">Student Dashboard</h5>

            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle d-flex align-items-center"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img
                  src={
                    userData?.image
                      ? userData.image.startsWith("http")
                        ? userData.image
                        : `http://localhost:5000/uploads/${userData.image}`
                      : "https://via.placeholder.com/40"
                  }
                  alt="Profile"
                  className="rounded-circle me-2"
                  style={{ width: "30px", height: "30px", objectFit: "cover" }}
                />
                {userData?.name || "User"}
              </button>

              {showDropdown && (
                <ul
                  className="dropdown-menu dropdown-menu-end show p-2"
                  style={{ position: "absolute", right: 0, marginTop: "10px" }}
                >
                  <li className="dropdown-item text-center">
                    <img
                      src={
                        userData?.image
                          ? userData.image.startsWith("http")
                            ? userData.image
                            : `http://localhost:5000/uploads/${userData.image}`
                          : "https://via.placeholder.com/80"
                      }
                      alt="Profile"
                      className="rounded-circle mb-2"
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                    <p className="fw-semibold mb-0">{userData?.name}</p>
                    <p className="text-muted small mb-2">{userData?.email}</p>
                  </li>
                  <li><hr className="dropdown-divider" /></li>

                  <li className="dropdown-item text-center mb-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      id="profileImageInput"
                      style={{ display: "none" }}
                    />
                    <label htmlFor="profileImageInput" className="btn btn-sm btn-primary w-100">
                      Change Profile Image
                    </label>
                  </li>

                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setShowPasswordModal(true);
                        setShowDropdown(false);
                      }}
                    >
                      Change Password
                    </button>
                  </li>
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

        {/* Main content */}
        <div className="p-4">
          <h4 className="mb-3">My Courses</h4>
          {loading ? (
            <p>Loading courses...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : courses.length === 0 ? (
            <p>No approved courses yet.</p>
          ) : (
            <div className="row">
              {courses.map((course, i) => (
                <div key={i} className="col-md-4 mb-3">
                  <div className="card shadow-sm border-0">
                    <div className="card-body">
                      <h5 className="card-title">{course.course}</h5>
                      <span className="badge bg-success">{course.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Outlet />
        </div>

        {/* Toast */}
        {toast.show && (
          <div
            className={`toast align-items-center text-bg-${toast.type} border-0 position-fixed top-0 end-0 m-3 show`}
          >
            <div className="d-flex">
              <div className="toast-body">{toast.message}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setToast({ ...toast, show: false })}
              ></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
