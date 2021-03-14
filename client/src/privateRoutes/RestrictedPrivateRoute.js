//RestrictedPrivateRoute

import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

//if user is authenticated
const RestrictedPrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated)
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );

        return <Component {...props} />;
      }}
    />
  );
};

export default RestrictedPrivateRoute;
