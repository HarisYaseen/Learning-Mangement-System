// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Courses from "./Courses";
import ServiceDetail from "./ServiceDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/service/:id" element={<ServiceDetail />} />
    </Routes>
  );
}

export default App;
