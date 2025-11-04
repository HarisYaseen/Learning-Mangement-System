// src/pages/Assignments.js
import React, { useState } from "react";
import axios from "axios";

function Assignments() {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Software Project Proposal",
      course: "Software Engineering",
      dueDate: "2025-11-10",
      status: "Submitted",
      file: null,
      message: "",
    },
    {
      id: 2,
      title: "Database Design ERD",
      course: "Database Systems",
      dueDate: "2025-11-14",
      status: "Pending",
      file: null,
      message: "",
    },
    {
      id: 3,
      title: "AI Research Paper",
      course: "Artificial Intelligence",
      dueDate: "2025-11-20",
      status: "Not Submitted",
      file: null,
      message: "",
    },
  ]);

  const handleFileChange = (e, id) => {
    const file = e.target.files[0];
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, file } : a))
    );
  };

  const handleUpload = async (id) => {
    const assignment = assignments.find((a) => a.id === id);
    if (!assignment.file) {
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, message: "Please select a file first." } : a
        )
      );
      return;
    }

    const formData = new FormData();
    formData.append("assignment", assignment.file);
    formData.append("title", assignment.title);

    try {
      const res = await axios.post("/api/assignments/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === id
            ? { ...a, message: "Upload successful!", status: "Submitted" }
            : a
        )
      );
    } catch (err) {
      console.error(err);
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, message: "Upload failed. Try again." } : a
        )
      );
    }
  };

  return (
    <div className="p-4">
      <h3 className="fw-bold text-primary mb-3">📘 Assignments</h3>
      <p className="text-muted mb-4">
        Track your upcoming and submitted assignments below.
      </p>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Course</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Upload</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a, index) => (
              <tr key={a.id}>
                <td>{index + 1}</td>
                <td>{a.title}</td>
                <td>{a.course}</td>
                <td>{a.dueDate}</td>
                <td>
                  <span
                    className={`badge ${
                      a.status === "Submitted"
                        ? "bg-success"
                        : a.status === "Pending"
                        ? "bg-warning text-dark"
                        : "bg-danger"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, a.id)}
                    className="form-control mb-1"
                  />
                  <button
                    onClick={() => handleUpload(a.id)}
                    className="btn btn-primary btn-sm"
                  >
                    Upload
                  </button>
                  {a.message && <p className="text-success mt-1">{a.message}</p>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Assignments;
