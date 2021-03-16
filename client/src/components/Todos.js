import React, { useState, useContext, useEffect } from "react";
import TodoItem from "./TodoItem";
import TodoService from "../Services/TodoService";
import Message from "./Message";
import { AuthContext } from "../Context/AuthContext";

const Todos = (props) => {
  //Use UsetState Hook
  const [todo, setTodo] = useState({ name: "" });
  //Todos array
  const [todos, setTodos] = useState([]);
  //Use message Hook
  const [message, setMessage] = useState(null);
  //Use authentication Hook
  const authContext = useContext(AuthContext);
  //Create todo Service component where you can fetch & create todos

  //UseEffect Hook equivalent to componentDidMount()
  useEffect(() => {
    TodoService.getTodos().then((data) => {
      setTodos(data.todos);
    });
  }, []);

  //When form is submitted
  const onSubmit = (e) => {
    e.preventDefault();
    TodoService.postTodo(todo).then((data) => {
      const { message } = data;
      resetForm();
      if (!message.msgError) {
        TodoService.getTodos().then((getData) => {
          setTodos(getData.todos);
          setMessage(message);
        });
      } else if (message.msgBody === "OOps. You not Authorized!") {
        setMessage(message);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
      }
    });
  };

  const onChange = (e) => {
    setTodo({ name: e.target.value });
  };

  //Set the form to empty
  const resetForm = () => {
    setTodo({ name: "" });
  };

  return (
    <section className="container">
      {message ? <Message message={message} /> : null}
      <h1 className="text-success">All Tasks</h1>
      <div className="row">
        <div className="col-md-6">
          <hr />

          {todos.length > 0 ? (
            <div>
              {todos.map((todo) => {
                return (
                  <div>
                    <TodoItem key={todo._id} todo={todo} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="alert alert-danger text-center mt-3">
              <span>NO DATA IS FOUND!</span>
            </div>
          )}
        </div>

        <div className="col-md-6">
          <h3 className="font-weight-bold text-primary">Create New Task</h3>

          <div className="todos_form">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="todo"
                  value={todo.name}
                  onChange={onChange}
                  className="form-control form-control-lg mb-3"
                  placeholder="Create a new task"
                />
                <button
                  type="submit"
                  className="btn btn-lg btn-outline-primary btn-lg font-weight-bold"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Todos;
