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

//Check if the connection variable //3
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(9000, () => {
  console.log("express server started");
});

//Show/handle the server error in better way
process.on("unhandledRejection", (err, promise) => {
  console.log(`Type of Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
