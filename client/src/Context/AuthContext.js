import React, { createContext, useState, useEffect } from "react";
import AuthService from "../Services/AuthService";
import Loading from "../components/Loading";
// Create Context
//AuthContext: gives you Providers & Consumer
export const AuthContext = createContext();

//Deconstruct props as {children} or component that you wan to wrap the Provider
export default ({ children }) => {
  const [user, setUser] = useState(null); //Use Hook function

  const [isAuthenticated, setIsAuthenticated] = useState(false); //isAuthenticated custom Hook

  const [isLoading, setIsLoading] = useState(false); //isLoaded custom Hook

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      setUser(data.user); // Set the user: to the response data that is comming from the backend
      setIsAuthenticated(data.isAuthenticated);
      setIsLoading(true);
    });
  }, []);

  return (
    <div>
      {!isLoading ? (
        <Loading />
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};
