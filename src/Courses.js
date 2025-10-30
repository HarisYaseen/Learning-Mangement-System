import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const Courses = () => {
  const coursesData = [
    { title: "Web Development", description: "Learn HTML, CSS, JS, React & Node.", duration: "3 Months" },
    { title: "Mobile App Development", description: "Build cross-platform apps with Flutter & React Native.", duration: "3 Months" },
    { title: "Cybersecurity", description: "Learn ethical hacking, penetration testing, network security.", duration: "2 Months" },
    { title: "Cloud Services", description: "Deploy apps on AWS, Firebase, and other clouds.", duration: "2 Months" },
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-5 text-orange">Our Courses</h2>
      <div className="row g-4">
        {coursesData.map((course, i) => (
          <div key={i} className="col-md-6 col-lg-4">
            <div className="card h-100 course-card shadow-sm p-3">
              <div className="card-body">
                <h5 className="card-title text-orange fw-bold">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p className="small text-muted">Duration: {course.duration}</p>
                <button className="btn btn-orange">Enroll Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-5">
        <Link to="/" className="btn btn-outline-dark rounded-pill">Back to Home</Link>
      </div>
    </div>
  );
};

export default Courses;
