// src/routes/index.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/Auth/Login";
import RegisterPage from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard";
import CameraAcess from "../pages/CameraAcess";
import View3dObject from "../pages/View3dObject";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import MainLayoot from "../layout/MainLayout";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {/* Protected Routes with layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayoot />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="camera" element={<CameraAcess />} />
          <Route path="view-3d/:id" element={<View3dObject />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
