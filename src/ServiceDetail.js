import React from "react";
import { useParams, Link } from "react-router-dom";

const services = [
  { id: 1, icon: "laptop-code", title: "Web Development", text: "Modern websites using React & Node.js.", price: "$300" },
  { id: 2, icon: "mobile-screen-button", title: "App Development", text: "Cross-platform mobile apps.", price: "$400" },
  { id: 3, icon: "cloud", title: "Cloud Services", text: "Secure deployment & hosting.", price: "$250" },
  { id: 4, icon: "shield-halved", title: "Cybersecurity", text: "Protect your business with ethical hacking.", price: "$350" }
];

const ServiceDetail = () => {
  const { id } = useParams();
  const service = services.find(s => s.id === parseInt(id));

  if (!service) return <div className="text-center py-5"><h2>Service not found</h2></div>;

  return (
    <div className="container py-5">
      <Link to="/" className="btn btn-outline-dark mb-4">← Back to Home</Link>
      <div className="service-detail-card p-5 shadow rounded" style={{backgroundColor:"#fff8f5", borderLeft:"5px solid #ff6b35"}}>
        <i className={`fas fa-${service.icon} fa-3x mb-3 text-orange`}></i>
        <h2 className="fw-bold mb-3">{service.title}</h2>
        <p className="mb-3">{service.text}</p>
        <p className="fw-bold mb-4">Price: {service.price}</p>
        <button className="btn btn-orange btn-lg">Buy Now</button>
      </div>
    </div>
  );
};

export default ServiceDetail;
