import React from "react";
import { Route } from "react-router-dom";

const NormalRoute = ({ exact, to, path, component, ...componentProps }) => {
  const Component = component;
  return (
    <Route
      exact={exact}
      to={to}
      path={path}
      render={(props) => <Component {...componentProps} {...props} />}
    />
  );
};

export default NormalRoute;
