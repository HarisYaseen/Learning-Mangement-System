import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Courses from "./Courses";
import Enrollment from "./pages/Enrollment";
import ServiceDetail from "./ServiceDetail";
import LmsPortal from "./LmsPortal";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Calendar from "./pages/Calendar";
import GradeBook from "./pages/GradeBook";
import Assignments from "./pages/Assignments";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>
      {/* ====== Public Routes ====== */}
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/service/:id" element={<ServiceDetail />} />
      <Route path="/lmsportal" element={<LmsPortal />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/enrollment" element={<Enrollment />} />

      {/* ====== Admin Dashboard ====== */}
      <Route path="/admin" element={<AdminDashboard />} />

      {/* ====== Student Dashboard with Sidebar ====== */}
      <Route path="/dashboard/*" element={<Dashboard />}>
        <Route path="calendar" element={<Calendar />} />
        <Route path="gradebook" element={<GradeBook />} />
        <Route path="assignments" element={<Assignments />} />
      </Route>
    </Routes>
  );
}

export default App;
