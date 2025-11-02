import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "Web Development",
    icon: "code",
    text: "Learn how to create responsive and dynamic websites.",
  },
  {
    id: 2,
    title: "Mobile App Development",
    icon: "mobile-alt",
    text: "Build Android and iOS apps using modern frameworks.",
  },
  {
    id: 3,
    title: "UI/UX Design",
    icon: "palette",
    text: "Master the art of creating visually stunning designs.",
  },
  {
    id: 4,
    title: "Digital Marketing",
    icon: "bullhorn",
    text: "Boost your brand's online presence and reach customers effectively.",
  },
];

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === parseInt(id));

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: service?.title || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Enrollment Successful!\n\nThank you, ${formData.name}, for enrolling in ${formData.course}.`);
    setShowForm(false);
    setFormData({ name: "", email: "", phone: "", course: service?.title || "" });
  };

  if (!service) {
    return <h2 className="text-center py-5">Service Not Found</h2>;
  }

  return (
    <section className="py-5 bg-light text-center">
      <div className="container">
        <div className="service-detail-card">
          <i className={`fas fa-${service.icon} fa-3x mb-3 text-orange`}></i>
          <h2 className="fw-bold">{service.title}</h2>
          <p className="lead mb-4">{service.text}</p>
          <button className="btn btn-orange px-4" onClick={() => setShowForm(true)}>
            Enroll Now
          </button>
          <button className="btn btn-secondary px-4 ms-3" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>

      {/* Modal for Enrollment Form */}
      {showForm && (
        <div className="modal-backdrop">
          <div className="modal-content animate-modal">
            <h4 className="text-orange fw-bold mb-3">Student Enrollment Form</h4>
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
                onClick={() => setShowForm(false)}
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
