import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

//Desctructure
const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { isAuthenticated, user } = useContext(AuthContext); //Pull out user from auth
  return (
    <Route
      {...rest} //Spead operator
      render={(props) => {
        if (!isAuthenticated)
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );

        if (!roles.includes(user.role))
          return (
            <Redirect
              to={{ pathname: "/restricted", state: { from: props.location } }}
            />
          );
        return <Component {...props} />;
      }}
    />
  );
};
//Go to App.js & use this private route component
export default PrivateRoute;
