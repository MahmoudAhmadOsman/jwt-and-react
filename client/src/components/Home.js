import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home_page">
      <div class="jumbotron jumbotron-fluid">
        <div className="container text-center">
          <h1 className="text-info">
            React & Jwt Authentication & Authorization
          </h1>
          <div className="row">
            <div className="col-md-12">
              <Link to="#" className="btn btn-outline-info btn-lg mr-3 mt-5">
                Learn More
              </Link>
              <Link to="#" className="btn btn-outline-success btn-lg mt-5">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
