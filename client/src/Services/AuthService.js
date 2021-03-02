//1: Servicer Request - Makes fetch requesto to the backend
export default {
  login: (user) => {
    console.log(user);
    //Make fetch request to the backend
    return fetch("/user/login", {
      //options
      //Option 1
      method: "post",
      body: JSON.stringify(user),
      //Option 2
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { isAuthenticated: false, user: { username: "", role: "" } };
    });
  },

  register: (user) => {
    console.log(user);
    //Register endpoint
    return fetch("/user/register", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },

  logout: () => {
    //Logout Endpoint

    return fetch("/user/logout")
      .then((res) => res.json())
      .then((data) => data);
  },
  isAuthenticated: () => {
    return fetch("/user/authenticated").then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else
        return {
          isAuthenticated: false,
          user: {
            username: "",
            role: "",
          },
        };
    });
  },
};
