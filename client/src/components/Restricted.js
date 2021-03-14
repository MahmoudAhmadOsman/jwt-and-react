import React from "react";

const Restricted = () => {
  return (
    <section className="access_restricted">
      <div className="container text-center mt-4">
        <div className="row">
          <div className="col-md-3 card">
            <i className="fa fa-warning fa-5x text-warning"></i>
            <h1 className="text-danger">WARNING!</h1>
          </div>
          <div className="col-md-8 card">
            <h2 className="text-danger">
              You don't have an access to the page that you are trying to
              access!
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Restricted;
