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

//Check if the connection variable
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// app.listen(5050, () => {
//   console.log("express server started");
// });
const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log("Serve started at http://localhost:", `${port}`)
);

//Show/handle the server error in better way
process.on("unhandledRejection", (err, promise) => {
  console.log(`Type of Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
