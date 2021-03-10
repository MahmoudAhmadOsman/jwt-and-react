import React, { createContext, useState, useEffect } from "react";
import AuthService from "../Services/AuthService";
import Loading from "../components/Loading";
// Create Context
//AuthContext: gives us Providers & Consumer
export const AuthContext = createContext();

//Deconstruct props as {children} or component that you wan to wrap the Provider
export default ({ children }) => {
  const [user, setUser] = useState(null); //Use Hook

  const [isAuthenticated, setIsAuthenticated] = useState(false); //isAuthenticated Hook

  const [isLoading, setIsLoading] = useState(false); //isLoaded Hook

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      setUser(data.user); // Set the user to the backend response data
      setIsAuthenticated(data.isAuthenticated);
      setIsLoading(true);
    });
  }, []);

  return (
    <div>
      {!isLoading ? (
        //   <h1>Loading...</h1>
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
