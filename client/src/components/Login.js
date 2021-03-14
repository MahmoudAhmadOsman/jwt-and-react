import React, { useState, useContext } from "react";
import AuthService from "../Services/AuthService";
import Message from "./Message";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import "./Login.scss";

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(user).then((data) => {
      console.log(data);
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push("/todos");
      } else setMessage(message);
    });
  };

  return (
    <section className="login">
      <div className="container">
        {message ? <Message message={message} /> : null}
        <div className="row">
          <div className="col-md-12">
            <div className="login_form">
              <h1 className="text-info">Login</h1>
              <small className="text-muted mb-3">
                Please login, using your username & password.
              </small>
              <hr />
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="username" className="font-weight-bold">
                    User Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    onChange={onChange}
                    className="form-control form-control-lg text-lowercase"
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="font-weight-bold">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={onChange}
                    className="form-control form-control-lg text-lowercase"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-lg btn-outline-info font-weight-bold"
                >
                  Login
                </button>
                <span className="ml-3">
                  Don't have an account?&nbsp;
                  <Link to="/register">Regiter.</Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
