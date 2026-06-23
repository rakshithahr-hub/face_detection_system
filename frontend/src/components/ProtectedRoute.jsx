import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

const ProtectedRoute = ({ children }) => {
  const authenticated = isAuthenticated();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;