import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/Auth/Login";
import RegisterPage from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard";
import CameraAcess from "../pages/CameraAcess";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import View3dObject from "../pages/View3dObject";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
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

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/camera"
          element={
            <ProtectedRoute>
              <CameraAcess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-3d/:id"
          element={
            <ProtectedRoute>
              <View3dObject />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
