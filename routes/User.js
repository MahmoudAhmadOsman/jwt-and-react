const express = require("express");
//const router = express.Router();
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Todo = require("../models/Todo");

//Sign in Token Function
const signToken = (userID) => {
  return JWT.sign(
    //iss = issuer - who issued this token
    {
      iss: "jwt_cookies",
      sub: userID, // sub - subject - who is this for
    },
    "jwt_cookies",
    {
      expiresIn: "10h", // Expires in 2 hours
    }
  );
};

//User Router - for creating or registering new User
userRouter.post("/register", (req, res) => {
  const { username, password, role } = req.body; // Get username password and role from the request body
  User.findOne({ username }, (err, user) => {
    if (err)
      res.status(500).json({
        message: {
          msgBody: "An error has occured. Cannot find the user!",
          msgError: true,
        },
      });
    if (user)
      //Check, if the user already exists or not
      res.status(400).json({
        message: {
          msgBody: "This username already exists!",
          msgError: true,
        },
      });
    //Create new User
    else {
      const newUser = new User({ username, password, role });
      newUser.save((err) => {
        if (err)
          res.status(500).json({
            message: {
              msgBody: "All fields are required!",
              msgError: true,
            },
          });
        else
          res.status(201).json({
            message: {
              msgBody: "Success: A new account has been created!",
              msgError: false,
            },
          });
      });
    }
  });
});

//Login Route
userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = signToken(_id);

      //Protect from csf - httpOnly, sameSite
      res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: true,
      });

      res.status(200).json({
        isAuthenticated: true,
        user: { username, role },
      });
    }
  }
);

//Logout Route
userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token"); //Remove the cookie(s)
    res.json({
      user: {
        username: "",
        role: "",
      },
      success: true,
    }); //set the username and the role to an empty string
  }
);

//Todo Route
userRouter.post(
  "/todo",
  passport.authenticate("jwt", { session: false }), // Bring the Passport Middleware
  (req, res) => {
    const todo = new Todo(req.body); // create an instace of UserModel
    todo.save((err) => {
      if (err)
        res.status(500).json({
          message: {
            msgBody: "Opps. An error has occured!. Cannot create to do!",
            msgError: true,
          },
        });
      else {
        req.user.todos.push(todo);
        req.user.save((err) => {
          if (err)
            res.status(500).json({
              message: {
                msgBody: "An error has occured",
                msgError: true,
              },
            });
          else
            res.status(200).json({
              message: {
                msgBody: "Success: new todo has been created!",
                msgError: false,
              },
            });
        });
      }
    });
  }
);

//Todos Route - Get all to dos
userRouter.get(
  "/todos",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Find by id
    User.findById({ _id: req.user._id })
      .populate("todos") //Populate with todos items
      .exec((err, document) => {
        if (err)
          res.status(500).json({
            message: {
              msgBody: "An error has occured",
              msgError: true,
            },
          });
        else {
          res.status(200).json({
            todos: document.todos,
            authenticated: true,
          });
        }
      });
  }
);

//Admin Route
userRouter.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin") {
      res.status(200).json({
        message: {
          msgBody: "Welcome. You are an admin!",
          msgError: false,
        },
      });
    } else
      res.status(403).json({
        message: {
          msgBody: "OOps, You're not authorized!",
          msgError: true,
        },
      });
  }
);

//Keep the logged in user even after closing the browser
userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({
      isAuthenticated: true,
      user: { username, role },
    });
  }
);

module.exports = userRouter;
