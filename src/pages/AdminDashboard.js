import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return navigate("/login");
    const user = JSON.parse(storedUser);
    if (user.role !== "admin") {
      alert("Access denied! Admins only.");
      return navigate("/login");
    }

    const fetchEnrollments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/enrollment");
        setEnrollments(res.data);
      } catch (err) {
        console.error(err);
        setMessage("Failed to load enrollments.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [navigate]);

  // Handle mark approved or reject
  const handleAction = async (id, action) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/enrollment/${action}/${id}`);
      setMessage(res.data.message);
      const refreshed = await axios.get("http://localhost:5000/api/enrollment");
      setEnrollments(refreshed.data);
      setTimeout(() => setMessage(""), 5000);
    } catch (err) {
      console.error(err);
      setMessage(`Failed to ${action} enrollment.`);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  // Fetch temp password and open Gmail
  const handleApproveEmail = async (enroll) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/enrollment/get-temp-password/${enroll._id}`);
      const tempPassword = res.data.tempPassword;

      const subject = encodeURIComponent(`Enrollment Approved for ${enroll.firstName}`);
      const body = encodeURIComponent(
        `Hello ${enroll.firstName},\n\n` +
        `Your enrollment for "${enroll.course}" has been approved.\n\n` +
        `Email: ${enroll.email}\n` +
        `Password: ${tempPassword}\n\n` +
        `Best regards,\nAdmin`
      );

      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${enroll.email}&su=${subject}&body=${body}`,
        "_blank"
      );
    } catch (err) {
      console.error("Failed to fetch temp password:", err);
      alert("Failed to fetch temp password.");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading enrollments...</p>;

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center mb-4 text-primary">Admin Panel – Enrollments</h2>

      {message && <div className="alert alert-info text-center">{message}</div>}

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Education</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.length ? (
              enrollments.map((enroll) => (
                <tr key={enroll._id}>
                  <td>{enroll.firstName} {enroll.lastName}</td>
                  <td>{enroll.email}</td>
                  <td>{enroll.course}</td>
                  <td>{enroll.education}</td>
                  <td>
                    <span className={`badge ${
                      enroll.status === "approved" ? "bg-success" :
                      enroll.status === "rejected" ? "bg-danger" :
                      "bg-warning text-dark"
                    }`}>
                      {enroll.status}
                    </span>
                  </td>
                  <td>
                    {enroll.status === "pending" ? (
                      <>
                        {/* Open Gmail with temp password */}
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleApproveEmail(enroll)}
                        >
                          Approve
                        </button>

                        {/* Mark as approved in backend */}
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => handleAction(enroll._id, "mark-approved")}
                        >
                          Mark as Approved
                        </button>

                        {/* Reject enrollment */}
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleAction(enroll._id, "reject")}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <button className="btn btn-secondary btn-sm" disabled>
                        {enroll.status === "approved" ? "Approved" : "Rejected"}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No enrollments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
