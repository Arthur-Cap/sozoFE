import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import LoginPage from "../pages/Auth/Login";
import RegisterPage from "../pages/Auth/Register";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
