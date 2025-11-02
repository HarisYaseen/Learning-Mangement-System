import React, { useState } from "react";

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      price: "$199",
      desc: "Master front-end and back-end web technologies with hands-on projects.",
      icon: "code",
    },
    {
      id: 2,
      title: "App Development",
      price: "$149",
      desc: "Learn how to build Android & iOS apps using Flutter or React Native.",
      icon: "mobile-alt",
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      price: "$129",
      desc: "Explore modern design tools and create stunning user experiences.",
      icon: "palette",
    },
    {
      id: 4,
      title: "Digital Marketing Essentials",
      price: "$99",
      desc: "Learn social media strategy, SEO, and advertising from experts.",
      icon: "bullhorn",
    },
  ];

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setFormData({ ...formData, course: course.title });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `✅ Enrollment Successful!\n\nThank you, ${formData.name}, for enrolling in ${formData.course}.`
    );
    setSelectedCourse(null);
    setFormData({ name: "", email: "", phone: "", course: "" });
  };

  return (
    <section id="courses" className="py-5 bg-light text-center">
      <div className="container">
        <span className="badge px-3 py-2 mb-3 bg-orange text-white">
          Popular Courses
        </span>
        <h2 className="fw-bold mb-3">Our Courses</h2>
        <p className="lead text-muted mb-5 col-lg-8 mx-auto">
          Learn from top professionals and enhance your career skills with our
          industry-standard training.
        </p>

        <div className="row g-4 justify-content-center align-items-stretch">
          {courses.map((course) => (
            <div key={course.id} className="col-sm-6 col-md-4 col-lg-3 d-flex">
              <div className="course-card shadow-sm p-4 bg-white rounded-4 border-top border-5 border-warning d-flex flex-column justify-content-between w-100">
                <div>
                  <i
                    className={`fas fa-${course.icon} fa-3x mb-3 text-orange`}
                  ></i>
                  <h5 className="fw-bold mb-2">{course.title}</h5>
                  <p className="text-muted small">{course.desc}</p>
                </div>
                <div>
                  <h6 className="fw-bold text-orange mb-3">{course.price}</h6>
                  <button
                    className="btn btn-orange w-100"
                    onClick={() => handleEnrollClick(course)}
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enrollment Form Modal */}
      {selectedCourse && (
        <div className="modal-backdrop">
          <div className="modal-content animate-modal">
            <h4 className="text-orange fw-bold mb-3">
              Enroll in {selectedCourse.title}
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="course"
                  className="form-control"
                  value={formData.course}
                  readOnly
                />
              </div>
              <button type="submit" className="btn btn-orange w-100">
                Submit Enrollment
              </button>
              <button
                type="button"
                className="btn btn-secondary w-100 mt-2"
                onClick={() => setSelectedCourse(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
