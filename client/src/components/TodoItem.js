import React from "react";
import { Link } from "react-router-dom";

const TodoItem = (props) => {
  const { todo } = props;
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 mt-3">
          <h3 class="list-group-item">
            <Link to="#" className="text-capitalize">
              {todo.name}
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
