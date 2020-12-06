import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ user, exact, to, component, ...componentProps }) => {
  const Component = component;
  if (!user) {
    return <Redirect to="/auth/login" />;
  }
  return (
    <Route
      exact={exact}
      to={to}
      render={(props) => (
        <Component {...componentProps} {...props} user={user} />
      )}
    />
  );
};

export default ProtectedRoute;
