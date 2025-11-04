// src/pages/GradeBook.jsx
import React from "react";

const GradeBook = () => {
  const grades = [
    { course: "Software Project Management", grade: "A", credits: 3, gpa: 4.0 },
    { course: "Database Systems", grade: "B+", credits: 3, gpa: 3.5 },
    { course: "Web Engineering", grade: "A-", credits: 3, gpa: 3.7 },
    { course: "Human Computer Interaction", grade: "B", credits: 2, gpa: 3.0 },
  ];

  const totalGPA =
    grades.reduce((sum, g) => sum + g.gpa * g.credits, 0) /
    grades.reduce((sum, g) => sum + g.credits, 0);

  return (
    <div className="p-4">
      <h3 className="fw-bold text-primary mb-3">📘 Grade Book</h3>
      <p className="text-muted mb-4">
        Here you can view your academic performance and course-wise grades.
      </p>

      <div className="card shadow-sm border-0 p-3">
        <table className="table table-hover align-middle">
          <thead style={{ backgroundColor: "#001f3f", color: "white" }}>
            <tr>
              <th>Course</th>
              <th>Grade</th>
              <th>Credits</th>
              <th>GPA</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g, index) => (
              <tr key={index}>
                <td>{g.course}</td>
                <td className="fw-semibold">{g.grade}</td>
                <td>{g.credits}</td>
                <td>{g.gpa.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-3 text-end">
          <h6 className="fw-bold text-primary">
            Total GPA: {totalGPA.toFixed(2)}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default GradeBook;
