import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Courses from "./Courses";
import ServiceDetail from "./ServiceDetail";
import LmsPortal from "./LmsPortal";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/service/:id" element={<ServiceDetail />} />
      <Route path="/lmsportal" element={<LmsPortal />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
  );
}

export default App;
