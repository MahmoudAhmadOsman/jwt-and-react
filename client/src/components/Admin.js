import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Admin = (props) => {
  //const [user, setUser] = useState(null); //Use Hook function
  console.log(props);
  return (
    <section className="admin_paage">
      <div className="container">
        <h1 className="text-danger">Admin</h1> <hr />
        <div className="row">
          <div className="col-md-12">
            <p>
              <b>Weleome.</b> You are an adminstrator!
            </p>
            <Link to="/todos" className="btn btn-outline-success btn-lg">
              Create a todo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
