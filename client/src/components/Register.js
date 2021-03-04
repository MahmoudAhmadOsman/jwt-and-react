import React from "react";

const Register = () => {
  return (
    <section className="register">
      <div className="container">
        <h1 className="text-info">Register</h1> <hr />
        <div className="row">
          <div className="col-md-8 mx-auto">
            <form action="">
              <div className="form-group">
                <label htmlFor="username" className="font-weight-bold">
                  User Name
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="form-control form-control-lg"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="font-weight-bold">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email address"
                  className="form-control form-control-lg"
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
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-info btn-lg font-weight-bold"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Register;
