import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import Message from "./Message";

const Register = (props) => {
  const [user, setUser] = useState({ username: "", password: "", role: "" });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({ username: "", password: "", role: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      }
    });
  };

  return (
    <section className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h1 className="text-info">Register</h1>
            <small className="text-muted mb-3">
              Please register by providing username & password.
            </small>
            <hr />
            {message ? <Message message={message} /> : null}
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="username" className="font-weight-bold">
                  User Name
                </label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={onChange}
                  className="form-control form-control-lg"
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
                  value={user.password}
                  onChange={onChange}
                  className="form-control form-control-lg"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="role" className="font-weight-bold">
                  User Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={user.role}
                  onChange={onChange}
                  className="form-control form-control-lg"
                  placeholder="Enter role the user's role admin or user"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-outline-info btn-lg font-weight-bold"
              >
                Register
              </button>
              <span className="ml-3">
                <Link to="/login">Already have an account?</Link>
              </span>
            </form>
            {/* {message ? <Message message={message} /> : null} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
