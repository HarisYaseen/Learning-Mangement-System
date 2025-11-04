// src/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaBook,
  FaClipboardList,
  FaChartLine,
  FaEnvelope,
  FaUserGraduate,
  FaCog,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div
      className="sidebar d-flex flex-column p-3 text-white"
      style={{
        width: "250px",
        minHeight: "100vh",
        backgroundColor: "#001f3f",
        position: "fixed",
        left: 0,
        top: 0,
        overflowY: "auto",
        transition: "width 0.3s ease",
      }}
    >
      {/* ===== Brand ===== */}
      <h4
        className="fw-bold text-center mb-4"
        style={{ color: "#ffcc00", letterSpacing: "1px" }}
      >
        Hadi LMS
      </h4>

      {/* ===== Navigation Links ===== */}
      <ul className="nav flex-column">
        <SidebarItem to="/dashboard" icon={<FaHome />} label="Dashboard" />
        <SidebarItem to="/dashboard/calendar" icon={<FaCalendarAlt />} label="To-Do Calendar" />
        <SidebarItem to="/dashboard/gradebook" icon={<FaBook />} label="Grade Book" />
        <SidebarItem to="/dashboard/assignments" icon={<FaClipboardList />} label="Assignments" />
        <SidebarItem to="/dashboard/progress" icon={<FaChartLine />} label="Progress" />
        <SidebarItem to="/dashboard/messages" icon={<FaEnvelope />} label="Messages" />
        <SidebarItem to="/dashboard/scheme" icon={<FaUserGraduate />} label="Study Scheme" />
        <SidebarItem to="/dashboard/settings" icon={<FaCog />} label="Settings" />
      </ul>

      {/* ===== Footer ===== */}
      <div
        className="mt-auto text-center small"
        style={{ color: "rgba(255, 255, 255, 0.6)" }}
      >
        <p className="mt-4 mb-0">© {new Date().getFullYear()} Hadi LMS</p>
      </div>
    </div>
  );
};

/* ✅ Sidebar Item Component */
const SidebarItem = ({ to, icon, label }) => (
  <li className="nav-item mb-2">
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `nav-link d-flex align-items-center px-3 py-2 rounded ${
          isActive ? "active-link" : "inactive-link"
        }`
      }
      style={({ isActive }) => ({
        color: isActive ? "#ffcc00" : "rgba(255,255,255,0.9)",
        backgroundColor: isActive ? "rgba(255,255,255,0.1)" : "transparent",
        textDecoration: "none",
        transition: "all 0.3s ease",
      })}
    >
      <span className="me-2 fs-5">{icon}</span>
      <span>{label}</span>
    </NavLink>
  </li>
);

export default Sidebar;
