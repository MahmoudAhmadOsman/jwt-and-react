import React from "react";
import { Link } from "react-router-dom";

const TodoItem = (props) => {
  const { todo } = props;
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h4 class="list-group-item">
            <Link to="#" className="text-capitalize">
              <span className="fa fa-check">
                &nbsp; <b>{todo.name}</b>
              </span>
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
