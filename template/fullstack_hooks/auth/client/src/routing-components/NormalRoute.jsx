import React from "react";
import { Route, Routes } from "react-router-dom";

// this kind of component is a `wrapper` around the React router dom Route where we immediately pass every single prop down. Instead of writing things with the render
const NormalRoute = ({ exact, path, component, ...componentProps }) => {
  const Component = component;
  return (
    <Routes>
      <Route
        exact={exact}
        path={path}
        element={<Component {...componentProps} {...props} />}
      />
    </Routes>
  );
};

export default NormalRoute;
