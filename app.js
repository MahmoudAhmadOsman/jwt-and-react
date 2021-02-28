const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
app.use(cookieParser());
app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/mongodb2020",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to database successfully.");
  }
);

// const userRouter = require("./routes/User");
// app.use("/user", userRouter);

const User = require("./models/User");

// const userInput = {
//   username: "mahmoudosman",
//   password: "12345678910",
//   role: "admin",
// };

// const user = new User(userInput);

// user.save((err, document) => {
//   if (err) console.log(err);
//   console.log(document);
// });

//Check if the connection variable //3
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// app.listen(5050, () => {
//   console.log("express server started");
// });
const port = process.env.PORT || 5050;
const server = app.listen(port, () =>
  console.log("Serve started at http://localhost:5050")
);

//Show/handle the server error in better way
process.on("unhandledRejection", (err, promise) => {
  console.log(`Type of Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
