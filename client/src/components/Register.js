import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import Message from "./Message";
import "./Register.scss";

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

  //Rested the state of the user
  const resetForm = () => {
    setUser({
      username: "",
      password: "",
      role: "",
    });
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
        }, 3000);
      }
    });
  };

  return (
    <section className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="register_form">
              {" "}
              {message ? <Message message={message} /> : null} <br />
              <h1 className="text-info">Register</h1>
              <small className="text-muted mb-3">
                Please register by providing username & password.
              </small>
              <hr />
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label
                    htmlFor="username"
                    className="font-weight-bold text-lowercase"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={onChange}
                    className="form-control form-control-lg text-lowercase"
                    placeholder="Enter your username"
                    minLength="5"
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
                    className="form-control form-control-lg text-lowercase"
                    placeholder="Enter your password"
                    minLength="8"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role" className="font-weight-bold ">
                    User Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={user.role}
                    onChange={onChange}
                    className="form-control form-control-lg text-lowercase"
                    placeholder="Enter your role"
                    minLength="4"
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
                  Already have an account? &nbsp;
                  <Link to="/login">Login.</Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
