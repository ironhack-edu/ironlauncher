import React from "react";
import { Route } from "react-router-dom";

// this kind of component is a `wrapper` around the React router dom Route where we immediately pass every single prop down. Instead of writing things with the render
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
