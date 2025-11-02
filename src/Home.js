import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

const Home = () => {
  const [teamModal, setTeamModal] = useState(null);

  const services = [
    { id: 1, icon: "laptop-code", title: "Web Development", text: "Modern websites using React & Node.js.", price: "$300" },
    { id: 2, icon: "mobile-screen-button", title: "App Development", text: "Cross-platform mobile apps.", price: "$400" },
    { id: 3, icon: "cloud", title: "Cloud Services", text: "Secure deployment & hosting.", price: "$250" },
    { id: 4, icon: "shield-halved", title: "Cybersecurity", text: "Protect your business with ethical hacking.", price: "$350" },
  ];

  const team = [
    { id: 1, name: "Haris Yaseen", role: "Full Stack Developer", img: "https://randomuser.me/api/portraits/men/32.jpg", bio: "Expert in MERN stack and software solutions." },
    { id: 2, name: "Ayesha Khan", role: "UI/UX Designer", img: "https://randomuser.me/api/portraits/women/45.jpg", bio: "Passionate about designing intuitive interfaces." },
    { id: 3, name: "Ahmed Ali", role: "Backend Engineer", img: "https://randomuser.me/api/portraits/men/76.jpg", bio: "Specialist in databases and server-side logic." },
    { id: 4, name: "Sara Malik", role: "Marketing Specialist", img: "https://randomuser.me/api/portraits/women/50.jpg", bio: "Experienced in digital marketing and branding." },
  ];

  return (
    <>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg fixed-top shadow-sm"
        style={{ backgroundColor: "rgba(10, 14, 39, 0.95)" }}
      >
        <div className="container py-2">
          <Link className="navbar-brand fw-bold text-light fs-4" to="/">
            <i className="fas fa-code me-2 text-orange"></i> Hadi LMS
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span
              className="navbar-toggler-icon"
              style={{ filter: "invert(1)" }}
            ></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {["Home", "About", "Courses", "Services", "Team", "Contact"].map(
                (item, i) => (
                  <li className="nav-item" key={i}>
                    <a
                      className="nav-link text-light fw-semibold"
                      href={`#${item.toLowerCase()}`}
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="hero-section d-flex align-items-center text-center text-white"
        style={{
          background: "linear-gradient(135deg, #001F3F, #003366)",
          minHeight: "100vh",
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold mb-4">
            Welcome to <span className="text-warning">Hadi LMS</span>
          </h1>

          <p className="lead mb-5 col-lg-8 mx-auto">
            Learn. Build. Grow. Empowering future tech professionals through
            modern education and real-world projects.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            {/* 🟠 Explore Courses Button */}
            <Link
              to="/courses"
              className="btn btn-lg px-5 py-2 fw-semibold rounded-pill"
              style={{
                backgroundColor: "#ff7a00",
                color: "white",
                border: "none",
                transition: "0.3s",
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#e56a00")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "#ff7a00")
              }
            >
              Explore Courses
            </Link>

            {/* ⚪ LMS Portal Button */}
            <Link
              to="/lmsportal"
              className="btn btn-lg px-5 py-2 fw-semibold rounded-pill"
              style={{
                backgroundColor: "white",
                color: "#003366",
                border: "2px solid #ff7a00",
                transition: "0.3s",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#ff7a00";
                e.target.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "#003366";
              }}
            >
              LMS Portal
            </Link>
          </div>

          {/* Stats */}
          <div className="row stats-row mt-5 justify-content-center text-dark">
            {[
              { number: "120+", label: "Projects Completed" },
              { number: "350+", label: "Students Trained" },
              { number: "50+", label: "Expert Trainers" },
              { number: "25+", label: "Courses Offered" },
            ].map((stat, i) => (
              <div key={i} className="col-6 col-md-3 mb-3">
                <div className="stat-card p-4 shadow-sm h-100 bg-white rounded">
                  <h3 className="fw-bold text-orange mb-2">{stat.number}</h3>
                  <p className="small mb-0">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5 bg-light">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4">
              <span className="badge px-3 py-2 mb-3">Who We Are</span>
              <h2 className="fw-bold mb-3">
                Empowering Tech Professionals Since 2018
              </h2>
              <p className="lead text-muted">
                SAT Software House is a leading IT training institute and
                software development company in Swabi, Pakistan.
              </p>
              <a href="#contact" className="btn btn-orange rounded-pill mt-3">
                Get in Touch
              </a>
            </div>
            <div className="col-lg-6">
              <div className="row g-4">
                {[
                  {
                    icon: "graduation-cap",
                    title: "Quality Education",
                    text: "Industry-based curriculum & expert instructors.",
                  },
                  {
                    icon: "laptop-code",
                    title: "Expert Development",
                    text: "Custom, scalable software solutions.",
                  },
                  {
                    icon: "certificate",
                    title: "Certification",
                    text: "Recognized certifications.",
                  },
                  {
                    icon: "handshake",
                    title: "Career Support",
                    text: "Job placement assistance.",
                  },
                ].map((card, i) => (
                  <div key={i} className="col-6">
                    <div className="about-card p-4 shadow-sm h-100">
                      <i
                        className={`fas fa-${card.icon} fa-2x mb-3 text-orange`}
                      ></i>
                      <h5 className="fw-bold">{card.title}</h5>
                      <p className="text-muted small">{card.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-5 bg-white">
        <div className="container text-center py-5">
          <span className="badge px-3 py-2 mb-3">Our Services</span>
          <h2 className="fw-bold mb-3">What We Offer</h2>
          <p className="lead text-muted mb-5 col-lg-8 mx-auto">
            Explore our wide range of professional services designed to help you
            learn, grow, and build innovative digital solutions.
          </p>
          <div className="row g-4 justify-content-center">
            {services.map((service) => (
              <div key={service.id} className="col-md-6 col-lg-3">
                <Link
                  to={`/service/${service.id}`}
                  className="text-decoration-none"
                >
                  <div className="service-card p-4 shadow-sm h-100">
                    <i
                      className={`fas fa-${service.icon} fa-3x mb-3 text-orange`}
                    ></i>
                    <h5 className="fw-bold">{service.title}</h5>
                    <p className="text-muted small">{service.text}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-5 bg-light">
        <div className="container text-center py-5">
          <span className="badge px-3 py-2 mb-3">Our Team</span>
          <h2 className="fw-bold mb-3">Meet Our Expert Team</h2>
          <p className="lead text-muted mb-5 col-lg-8 mx-auto">
            Our team of professionals is dedicated to providing top-notch
            education and development services.
          </p>
          <div className="row g-4 justify-content-center">
            {team.map((member) => (
              <div key={member.id} className="col-md-6 col-lg-3">
                <div
                  className="team-card p-4 shadow-sm h-100 text-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => setTeamModal(member)}
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="rounded-circle mb-3 team-img"
                  />
                  <h5 className="fw-bold">{member.name}</h5>
                  <p className="text-muted small">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Team Modal */}
          {teamModal && (
            <div className="modal-backdrop">
              <div className="modal-content p-4">
                <img
                  src={teamModal.img}
                  alt={teamModal.name}
                  className="rounded-circle mb-3"
                  style={{ width: "120px" }}
                />
                <h3>{teamModal.name}</h3>
                <p className="text-muted">{teamModal.role}</p>
                <p>{teamModal.bio}</p>
                <button
                  className="btn btn-secondary"
                  onClick={() => setTeamModal(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5 bg-white">
        <div className="container py-5 text-center">
          <span className="badge px-3 py-2 mb-3">Message Us</span>
          <h2 className="fw-bold mb-3">Get In Touch</h2>
          <p className="lead text-muted mb-5 col-lg-8 mx-auto">
            Have questions or want to join our courses? Send us a message — we’d
            love to hear from you!
          </p>
          <form
            className="col-lg-8 mx-auto text-start"
            onSubmit={(e) => {
              e.preventDefault();
              const name = e.target[0].value;
              const email = e.target[1].value;
              const message = e.target[2].value;
              const subject = encodeURIComponent(`Inquiry from ${name}`);
              const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
              );
              window.open(
                `https://mail.google.com/mail/?view=cm&fs=1&to=info@satlms.com&su=${subject}&body=${body}`,
                "_blank"
              );
            }}
          >
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="col-12">
                <textarea
                  className="form-control form-control-lg"
                  rows="4"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <div className="col-12 text-center">
                <button
                  type="submit"
                  className="btn btn-orange btn-lg rounded-pill mt-3"
                >
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="footer py-5"
        style={{ backgroundColor: "rgba(0,0,0,0.95)", color: "white" }}
      >
        <div className="container">
          <div className="row gy-4">
            <div className="col-md-4">
              <h5 className="fw-bold mb-3">Hadi LMS</h5>
              <p className="small">
                Hadi LMS is a modern learning and software development platform
                based in Swabi, Pakistan — empowering individuals and businesses
                through innovation and technology.
              </p>
            </div>
            <div className="col-md-4">
              <h6 className="fw-bold mb-3">Quick Links</h6>
              <ul className="list-unstyled small">
                {[
                  "Home",
                  "About",
                  "Courses",
                  "Services",
                  "Team",
                  "Contact",
                ].map((link, i) => (
                  <li key={i}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-white text-decoration-none d-block mb-1"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-4">
              <h6 className="fw-bold mb-3">Contact Info</h6>
              <ul className="list-unstyled small">
                <li>
                  <i className="fas fa-map-marker-alt me-2"></i>Swabi, Khyber
                  Pakhtunkhwa, Pakistan
                </li>
                <li>
                  <i className="fas fa-envelope me-2"></i>info@satlms.com
                </li>
                <li>
                  <i className="fas fa-phone me-2"></i>+92 312 3456789
                </li>
              </ul>
            </div>
          </div>
          <hr className="my-4 border-light opacity-25" />
          <div className="d-flex justify-content-between align-items-center flex-column flex-md-row">
            <p className="small mb-2 mb-md-0">
              © {new Date().getFullYear()} SAT LMS | All Rights Reserved.
            </p>
            <div className="d-flex gap-3">
              {["facebook", "instagram", "linkedin", "github"].map(
                (icon, i) => (
                  <a href="#" key={i} className="text-white">
                    <i className={`fab fa-${icon} fa-lg`}></i>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
