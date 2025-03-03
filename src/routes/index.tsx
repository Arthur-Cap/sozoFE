import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/Auth/Login";
import RegisterPage from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard";
import CameraAcess from "../pages/CameraAcess";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/camera" element={<CameraAcess />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
