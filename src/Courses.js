import React from "react";
import { useNavigate } from "react-router-dom";

function Courses() {
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: "CS201 - Introduction to Programming",
      instructor: "Dr. Naveed A. Malik",
      credits: 3,
      department: "Computer Science / Information Technology",
      color: "#7b68ee",
    },
    {
      id: 2,
      title: "CS304 - Object Oriented Programming",
      instructor: "Dr. Sara Khan",
      credits: 3,
      department: "Software Engineering",
      color: "#ff8c00",
    },
    {
      id: 3,
      title: "CS403 - Database Management Systems",
      instructor: "Prof. Kamran Ahmad",
      credits: 3,
      department: "Information Systems",
      color: "#20b2aa",
    },
    {
      id: 4,
      title: "CS404 - Artificial Intelligence",
      instructor: "Dr. Adeel Rafiq",
      credits: 3,
      department: "AI / Data Science",
      color: "#6495ed",
    },
  ];

  const handleEnroll = () => {
    navigate("/enrollment");
  };

  return (
    <div
      className="container py-5"
      style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}
    >
      <h2 className="fw-bold mb-4 text-center">🎓 Available Courses</h2>
      <p className="text-muted text-center mb-5">
        Explore our wide range of courses and enroll in your preferred one.
      </p>

      <div className="row g-4">
        {courses.map((course) => (
          <div key={course.id} className="col-md-6 col-lg-4">
            <div
              className="card shadow-sm border-0 h-100"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
            >
              {/* ===== Course Header ===== */}
              <div
                style={{
                  backgroundColor: course.color,
                  color: "white",
                  padding: "15px",
                }}
              >
                <h5 className="mb-1 fw-bold">{course.title}</h5>
                <small>{course.department}</small>
              </div>

              {/* ===== Course Details ===== */}
              <div className="card-body">
                <p className="mb-2">
                  <strong>Instructor:</strong> {course.instructor}
                </p>
                <p className="mb-3">
                  <strong>Credit Hours:</strong> {course.credits}
                </p>

                <button
                  onClick={handleEnroll}
                  className="btn w-100 fw-semibold"
                  style={{
                    backgroundColor: "#001f3f",
                    color: "#fff",
                    borderRadius: "6px",
                  }}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
