import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Courses from "./Courses";
import ServiceDetail from "./ServiceDetail";
import LmsPortal from "./LmsPortal";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Calendar from "./pages/Calendar";
import GradeBook from "./pages/GradeBook";
import Assignments from "./pages/Assignments";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/service/:id" element={<ServiceDetail />} />
      <Route path="/lmsportal" element={<LmsPortal />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard Layout */}
      <Route path="/dashboard/*" element={<Dashboard />}>
        <Route path="calendar" element={<Calendar />} /> {/* ✅ nested */}
        <Route path="gradebook" element={<GradeBook />} /> {/* ✅ nested */}
        <Route path="assignments" element={<Assignments />} /> {/* ✅ nested */}
      </Route>
    </Routes>
  );
}

export default App;
