import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // ✅ Check if user is admin before loading page
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.role !== "admin") {
      alert("Access denied! Admins only.");
      navigate("/login");
      return;
    }

    // ✅ Fetch enrollments after verifying admin
    const fetchEnrollments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/enrollments");
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

  // ✅ Approve or reject student enrollment
  const handleAction = async (id, action) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/${action}/${id}`);
      setMessage(`Enrollment ${action}ed successfully!`);

      // Refresh list
      const res = await axios.get("http://localhost:5000/api/admin/enrollments");
      setEnrollments(res.data);
    } catch (err) {
      console.error(err);
      setMessage(`Failed to ${action} enrollment.`);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading enrollments...</p>;

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center mb-4 text-primary">Admin Panel – Enrollments</h2>

      {message && (
        <div className="alert alert-info text-center" role="alert">
          {message}
        </div>
      )}

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
            {enrollments.length > 0 ? (
              enrollments.map((enroll) => (
                <tr key={enroll._id}>
                  <td>{enroll.firstName} {enroll.lastName}</td>
                  <td>{enroll.email}</td>
                  <td>{enroll.course}</td>
                  <td>{enroll.education}</td>
                  <td>
                    <span
                      className={`badge ${
                        enroll.status === "approved"
                          ? "bg-success"
                          : enroll.status === "rejected"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {enroll.status}
                    </span>
                  </td>
                  <td>
                    {enroll.status === "pending" ? (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleAction(enroll._id, "approve")}
                        >
                          Approve
                        </button>
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
