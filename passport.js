const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("./models/User");

//Custom cookie
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"]; //Cookie name
  }
  return token;
};

// authorization - 2
passport.use(
  new JwtStrategy(
    //Options
    {
      jwtFromRequest: cookieExtractor, //set cookie on the clientside, custom function
      secretOrKey: "MahmoudOsman",
    },
    (payload, done) => {
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
      });
    }
  )
);

// Use the passport - 1
passport.use(
  new LocalStrategy((username, password, done) => {
    //Find the user in the database
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);
      // if user doesn't exist
      if (!user) return done(null, false);
      // check if password is correct
      user.comparePassword(password, done);
    });
  })
);
