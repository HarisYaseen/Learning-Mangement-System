import React, { useState } from "react";

function Enrollment() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    education: "",
    course: "",
    motivation: "",
    experience: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dob: "",
          education: "",
          course: "",
          motivation: "",
          experience: "",
        });
      } else {
        alert("❌ Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("⚠️ Server error. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #fff 0%, #f9f9f9 100%)",
      }}
    >
      <h2 className="text-center fw-bold mb-3">📘 Course Enrollment</h2>
      <p className="text-center text-muted mb-4">
        Fill out the form below to apply for your desired course.
      </p>

      {/* ===== Enrollment Form ===== */}
      <div
        className="card shadow-sm border-0 mx-auto"
        style={{ maxWidth: "700px", borderRadius: "10px" }}
      >
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            {/* Personal Info */}
            <h5 className="fw-bold mb-3">Personal Information</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  placeholder="First Name"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Contact Info */}
            <h5 className="fw-bold mt-4 mb-3">Contact Information</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Additional Info */}
            <h5 className="fw-bold mt-4 mb-3">Additional Information</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small text-muted">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">Highest Education Level</label>
                <select
                  className="form-select"
                  name="education"
                  required
                  value={formData.education}
                  onChange={handleChange}
                >
                  <option value="">Select education level</option>
                  <option>Matric / O-Level</option>
                  <option>Intermediate / A-Level</option>
                  <option>Bachelor's Degree</option>
                  <option>Master's Degree</option>
                  <option>PhD</option>
                </select>
              </div>
            </div>

            {/* Course Selection */}
            <h5 className="fw-bold mt-4 mb-3">Course Selection</h5>
            <div className="mb-3">
              <select
                className="form-select"
                name="course"
                required
                value={formData.course}
                onChange={handleChange}
              >
                <option value="">Select a course</option>
                <option>CS201 - Introduction to Programming</option>
                <option>CS304 - Object Oriented Programming</option>
                <option>CS403 - Database Management Systems</option>
                <option>CS404 - Artificial Intelligence</option>
              </select>
            </div>

            {/* Motivation */}
            <h5 className="fw-bold mt-4 mb-3">Tell Us About Yourself</h5>
            <div className="mb-3">
              <textarea
                className="form-control"
                name="motivation"
                placeholder="Why do you want to take this course?"
                rows="3"
                required
                value={formData.motivation}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-4">
              <textarea
                className="form-control"
                name="experience"
                placeholder="Previous experience (optional)"
                rows="2"
                value={formData.experience}
                onChange={handleChange}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-100 text-white fw-semibold"
              style={{ backgroundColor: "#001f3f" }}
            >
              {loading ? "Submitting..." : "Submit Enrollment Application"}
            </button>
          </form>
        </div>
      </div>

      {/* ✅ Popup Confirmation */}
      {submitted && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4 text-center">
              <h4 className="text-success fw-bold mb-2">🎉 Application Submitted!</h4>
              <p className="text-muted">
                Your enrollment application has been successfully submitted.
                <br />
                The admin will respond within <strong>24 hours</strong>.
                <br />
                You’ll receive your ID and password via email.
              </p>
              <button
                className="btn text-white mt-3"
                style={{ backgroundColor: "#001f3f" }}
                onClick={() => setSubmitted(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Enrollment;
