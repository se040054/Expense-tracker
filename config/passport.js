const passport = require("passport");

app.use(passport.initialize());

const LocalStrategy = require("passport-local");


// passport.use(new LocalStrategy({}(username,password,done)=>{


//  }))

// module.exports = passport;
