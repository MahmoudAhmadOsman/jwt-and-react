import React, { useState, useContext } from "react";
import AuthService from "../Services/AuthService";

import { AuthContext } from "../Context/AuthContext"; //Custon Global State
import { Link } from "react-router-dom";
import Message from "./Message";

//Takes 1 arg of props
const Login = (props) => {
  //1. Set states

  //Set username and password
  const [user, setUser] = useState({ username: "", password: "" });

  //Set message
  const [message, setMessage] = useState(null);

  //Set or bring the Auth Context
  const authContext = useContext(AuthContext);

  //handleOnChange function
  const handleOnChange = (e) => {
    e.preventDefault();
    //Set the user now
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    console.log(user);
  };

  const handleOnSubmit = (e) => {
    e.prevenDefault();
    console.log("Login form is submitted!");

    AuthService.login(user).then((data) => {
      console.log("The submitted data: ", data);
      const { isAuthenticated, user, message } = data; //Pull out user, message & isAuthenticated
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push("/todos"); //Take the user to todos page
      } else setMessage(message);
    });
  };

  return (
    <section className="login">
      <div className="container">
        <h1 className="text-info">Login</h1> <hr />
        <div className="row">
          <div className="col-md-8">
            <form onSubmit={handleOnSubmit}>
              <div className="form-group">
                <label htmlFor="username" className="font-weight-bold">
                  User Name
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="form-control form-control-lg"
                  required
                  onChange={handleOnChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="font-weight-bold">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="form-control form-control-lg"
                  required
                  onChange={handleOnChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-info btn-lg font-weight-bold"
              >
                Log In
              </button>
              <span className="ml-3">
                <Link to="/register">Don't have an account?</Link>
              </span>
            </form>
            {/* Display Message here */}
            {message ? <Message message={message} /> : null}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
