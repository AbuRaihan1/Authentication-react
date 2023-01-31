import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/UserContext";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loader } = useContext(AuthContext);
  if (loader) {
    return (
      <div className="justify-center items-center">
        <div className="h-40 w-40 border-4 border-dashed rounded-full animate-spin dark:border-gray-400"></div>
      </div>
    );
  }
  if (user && user.uid) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoutes;
