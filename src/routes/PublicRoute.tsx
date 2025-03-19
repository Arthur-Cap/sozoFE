import React from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
}

const isAuthenticated = () => {
  return localStorage.getItem("authToken") !== null;
};

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default PublicRoute;
