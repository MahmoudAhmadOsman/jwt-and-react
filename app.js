const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// ** MIDDLEWARE ** //
const whitelist = [
  "http://localhost:3000",
  "http://localhost:8080",
  "https://shrouded-journey-38552.herokuapp.com",
];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable");
      callback(null, true);
    } else {
      console.log("Origin rejected");
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(helmet());
// --> Add this
app.use(cors(corsOptions));

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

// Data parsing
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

const userRouter = require("./routes/User");
app.use("/user", userRouter);

const User = require("./models/User");

//Check if the connection variable
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log("Server started at http://localhost:", `${port}`)
);

//Show/handle the server error in better way
process.on("unhandledRejection", (err, promise) => {
  console.log(`Type of Error is : ${err}`);
  server.close(() => process.exit(1));
});
