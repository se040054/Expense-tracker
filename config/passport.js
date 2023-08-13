const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require('../models')
const User=db.User

passport.use(new LocalStrategy( async (username,password,done)=>{
  const user =await User.findOne({
    attributes:['id','name','username','password'],
    where:{username},
    raw:true
  }).catch((error)=>{
    return done(error)
  })
  if (!user){
    return done(null,false)
  }else if (user.password!==password){
    return done(null,false);
  }else{
    return done(null,user)
  }

}))

passport.serializeUser((user,done)=>{
  const {id,name,username} = user
  return done(null,{id,name,username})
})

passport.deserializeUser((user,done)=>{
  const {id,name,username} =user
  return done(null,{id,username,name})
})

module.exports = passport;
