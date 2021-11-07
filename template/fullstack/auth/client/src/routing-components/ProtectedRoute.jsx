import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import * as PATHS from "../utils/paths";

// the protected route component must take a user in order to check if the user is authenticated or not. If not moves the user to the login page
const ProtectedRoute = ({
  user,
  exact,
  to,
  path,
  component,
  ...componentProps
}) => {
  const Component = component;
  if (!user) {
    return <Navigate to={PATHS.LOGINPAGE} />;
  }
  return (
    <Routes>
      <Route
        exact={exact}
        path={path || to}
        element={<Component {...componentProps} {...props} user={user} />}
      />
    </Routes>
  );
};

export default ProtectedRoute;
