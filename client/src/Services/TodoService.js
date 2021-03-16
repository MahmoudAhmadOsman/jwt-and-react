export default {
  //Fetch all todos
  getTodos: () => {
    return fetch("/user/todos").then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else
        return {
          message: {
            msgBody: "You are not authorized to create task!",
            msgError: true,
          },
        };
    });
  },

  postTodo: (todo) => {
    return fetch("/user/todo", {
      method: "post",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else
        return {
          message: {
            msgBody: "Oops. You are not authorized to create a task!!",
          },
          msgError: true,
        };
    });
  },
};
