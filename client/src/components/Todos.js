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
      } else if (message.msgBody === "OOs. You not Authorized!") {
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
      <div className="row">
        <div className="col-md-8">
          {todos.map((todo) => {
            return (
              <div>
                {todos.length < 0 ? (
                  <div className="alert alert-danger text-center mt-3">
                    <span>No data. Please create new todos.</span>
                  </div>
                ) : (
                  <div className="card mb-3">
                    <TodoItem key={todo._id} todo={todo} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="col-md-4">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <h3 className="font-weight-bold text-info">Create New Todo</h3>
              <input
                type="text"
                name="todo"
                value={todo.name}
                onChange={onChange}
                className="form-control form-control-lg mb-3"
                placeholder="Create a new todo"
              />
              <button
                type="submit"
                className="btn btn-lg btn-outline-info btn-lg font-weight-bold"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Todos;
